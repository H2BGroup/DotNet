import random
import time
import threading
import pika
from datetime import datetime
from sensor_ids import *

PRESSURE_BOTTOM_LIMIT = 1500
PRESSURE_TOP_LIMIT = 3000

PERCENT_BOTTOM_LIMIT = 0
PERCENT_TOP_LIMIT = 100

PARKING_BOTTOM_LIMIT = 10
PARKING_TOP_LIMIT = 150

ENGINE_TEMP_BOTTOM_LIMIT = 80
ENGINE_TEMP_TOP_LIMIT = 110

CABIN_TEMP_BOTTOM_LIMIT = 10
CABIN_TEMP_TOP_LIMIT = 30

OUTSIDE_TEMP_BOTTOM_LIMIT = -20
OUTSIDE_TEMP_TOP_LIMIT = 40

INTAKE_AIR_TEMP_BOTTOM_LIMIT = 10
INTAKE_AIR_TEMP_TOP_LIMIT = 40

TEMPERATURE_ROUNDING = 1

RABBITMQ_HOST = "localhost"
RABBITMQ_USER = "guest"
RABBITMQ_PASSWORD = "guest"
QUEUE_NAME = "messages"

stop_event = threading.Event()


def createMessage(sensorId, value):
    current_time = datetime.now().strftime("%Y-%m-%dT%H:%M:%SZ")
    return f"{{\"sensor_id\": \"{sensorId}\", \"value\": {value}, \"timestamp\": \"{current_time}\"}}\n"


def gradual_value_generator(initial_value, min_limit, max_limit, step_size=1.0):
    """
    Generates values that gradually grow or fall.
    """
    value = initial_value
    while True:
        if random.random() > 0.5:  
            value += random.uniform(0, step_size)
        else:
            value -= random.uniform(0, step_size)
        value = max(min(value, max_limit), min_limit)  
        yield round(value, TEMPERATURE_ROUNDING if isinstance(value, float) else 0)


def send_sensor_data(sensor_id, value_generator, delay_range=(10, 20)):
    connection = pika.BlockingConnection(
        pika.ConnectionParameters(host=RABBITMQ_HOST, credentials=pika.PlainCredentials(RABBITMQ_USER, RABBITMQ_PASSWORD))
    )
    channel = connection.channel()
    channel.queue_declare(queue=QUEUE_NAME, durable=True, exclusive=False, auto_delete=False)

    try:
        for value in value_generator:
            if stop_event.is_set():
                break
            message = createMessage(sensor_id, value)
            channel.basic_publish(exchange='', routing_key=QUEUE_NAME, body=message)
            print(f"Sent: {message.strip()}")
            time.sleep(random.uniform(*delay_range))
    except KeyboardInterrupt:
        print(f"Stopping sensor {sensor_id}")
    finally:
        connection.close()


sensor_config = [
    (ENGINE_TEMP_ID, gradual_value_generator(95, ENGINE_TEMP_BOTTOM_LIMIT, ENGINE_TEMP_TOP_LIMIT, 0.5)),
    (CABIN_TEMP_ID, gradual_value_generator(20, CABIN_TEMP_BOTTOM_LIMIT, CABIN_TEMP_TOP_LIMIT, 0.3)),
    (OUTSIDE_TEMP_ID, gradual_value_generator(15, OUTSIDE_TEMP_BOTTOM_LIMIT, OUTSIDE_TEMP_TOP_LIMIT, 0.7)),
    (INTAKE_AIR_ID, gradual_value_generator(25, INTAKE_AIR_TEMP_BOTTOM_LIMIT, INTAKE_AIR_TEMP_TOP_LIMIT, 0.5)),
    (REAR_LEFT_TIRE_ID, gradual_value_generator(2000, PRESSURE_BOTTOM_LIMIT, PRESSURE_TOP_LIMIT, 10)),
    (REAR_RIGHT_TIRE_ID, gradual_value_generator(2000, PRESSURE_BOTTOM_LIMIT, PRESSURE_TOP_LIMIT, 10)),
    (FRONT_LEFT_TIRE_ID, gradual_value_generator(2000, PRESSURE_BOTTOM_LIMIT, PRESSURE_TOP_LIMIT, 10)),
    (FRONT_RIGHT_TIRE_ID, gradual_value_generator(2000, PRESSURE_BOTTOM_LIMIT, PRESSURE_TOP_LIMIT, 10)),
    (GAS_PEDAL_POSITION_ID, gradual_value_generator(50, PERCENT_BOTTOM_LIMIT, PERCENT_TOP_LIMIT, 5)),
    (STERRING_WHEEL_ANGLE_ID, gradual_value_generator(45, PERCENT_BOTTOM_LIMIT, PERCENT_TOP_LIMIT, 5)),
    (ELECTRIC_VEHICLE_BATTERY_ID, gradual_value_generator(80, PERCENT_BOTTOM_LIMIT, PERCENT_TOP_LIMIT, 1)),
    (RADIO_VOLUME_ID, gradual_value_generator(20, PERCENT_BOTTOM_LIMIT, PERCENT_TOP_LIMIT, 3)),
    (REAR_LEFT_DIST_ID, gradual_value_generator(100, PARKING_BOTTOM_LIMIT, PARKING_TOP_LIMIT, 2)),
    (REAR_RIGHT_DIST_ID, gradual_value_generator(100, PARKING_BOTTOM_LIMIT, PARKING_TOP_LIMIT, 2)),
    (REAR_CENTER_DIST_ID, gradual_value_generator(100, PARKING_BOTTOM_LIMIT, PARKING_TOP_LIMIT, 2)),
    (FRONT_CENTER_DIST_ID, gradual_value_generator(100, PARKING_BOTTOM_LIMIT, PARKING_TOP_LIMIT, 2)),
]

threads = []
for sensor_id, value_generator in sensor_config:
    thread = threading.Thread(target=send_sensor_data, args=(sensor_id, value_generator))
    threads.append(thread)
    thread.start()

try:
    while True:
        time.sleep(0.1)
except KeyboardInterrupt:
    print("Stopping all sensors...")
    stop_event.set()

for thread in threads:
    thread.join()

print("Program stopped.")
