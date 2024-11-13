import random
import time
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
QUEUE_NAME = "messages"

def createMessage(sensorId, value):
    current_time = datetime.now().strftime("%Y-%m-%dT%H:%M:%SZ")
    return f"{{\"sensor_id\": \"{sensorId}\", \"value\": {value}, \"timestamp\": \"{current_time}\"}}\n"


connection = pika.BlockingConnection(pika.ConnectionParameters(host=RABBITMQ_HOST))
channel = connection.channel()

channel.queue_declare(queue=QUEUE_NAME)

try:
    while True:
        # temperature data
        engine_temperature = round(random.uniform(ENGINE_TEMP_BOTTOM_LIMIT, ENGINE_TEMP_TOP_LIMIT), TEMPERATURE_ROUNDING)
        message = createMessage(ENGINE_TEMP_ID, engine_temperature)
        channel.basic_publish(exchange='', routing_key=QUEUE_NAME, body=message)

        cabin_temperature = round(random.uniform(CABIN_TEMP_BOTTOM_LIMIT, CABIN_TEMP_TOP_LIMIT), TEMPERATURE_ROUNDING)
        message = createMessage(CABIN_TEMP_ID, cabin_temperature)
        channel.basic_publish(exchange='', routing_key=QUEUE_NAME, body=message)

        outside_temperature = round(random.uniform(OUTSIDE_TEMP_BOTTOM_LIMIT, OUTSIDE_TEMP_TOP_LIMIT), TEMPERATURE_ROUNDING)
        message = createMessage(OUTSIDE_TEMP_ID, outside_temperature)
        channel.basic_publish(exchange='', routing_key=QUEUE_NAME, body=message)

        intake_air_temperature = round(random.uniform(INTAKE_AIR_TEMP_BOTTOM_LIMIT, INTAKE_AIR_TEMP_TOP_LIMIT), TEMPERATURE_ROUNDING)
        message = createMessage(INTAKE_AIR_ID, intake_air_temperature)
        channel.basic_publish(exchange='', routing_key=QUEUE_NAME, body=message)

        # barometer data
        rl_pressure = random.randint(PRESSURE_BOTTOM_LIMIT, PRESSURE_TOP_LIMIT)
        message = createMessage(REAR_LEFT_TIRE_ID, rl_pressure)
        channel.basic_publish(exchange='', routing_key=QUEUE_NAME, body=message)

        rr_pressure = random.randint(PRESSURE_BOTTOM_LIMIT, PRESSURE_TOP_LIMIT)
        message = createMessage(REAR_RIGHT_TIRE_ID, rr_pressure)
        channel.basic_publish(exchange='', routing_key=QUEUE_NAME, body=message)

        fl_pressure = random.randint(PRESSURE_BOTTOM_LIMIT, PRESSURE_TOP_LIMIT)
        message = createMessage(FRONT_LEFT_TIRE_ID, fl_pressure)
        channel.basic_publish(exchange='', routing_key=QUEUE_NAME, body=message)

        fr_pressure = random.randint(PRESSURE_BOTTOM_LIMIT, PRESSURE_TOP_LIMIT)
        message = createMessage(FRONT_RIGHT_TIRE_ID, fr_pressure)
        channel.basic_publish(exchange='', routing_key=QUEUE_NAME, body=message)

        # potentiometer data
        gas_pedal = random.randint(PERCENT_BOTTOM_LIMIT, PERCENT_TOP_LIMIT)
        message = createMessage(GAS_PEDAL_POSITION_ID, gas_pedal)
        channel.basic_publish(exchange='', routing_key=QUEUE_NAME, body=message)

        wheel_angle = random.randint(PERCENT_BOTTOM_LIMIT, PERCENT_TOP_LIMIT)
        message = createMessage(STERRING_WHEEL_ANGLE_ID, wheel_angle)
        channel.basic_publish(exchange='', routing_key=QUEUE_NAME, body=message)

        electric_battery = random.randint(PERCENT_BOTTOM_LIMIT, PERCENT_TOP_LIMIT)
        message = createMessage(ELECTRIC_VEHICLE_BATTERY_ID, electric_battery)
        channel.basic_publish(exchange='', routing_key=QUEUE_NAME, body=message)

        radio_volume = random.randint(PERCENT_BOTTOM_LIMIT, PERCENT_TOP_LIMIT)
        message = createMessage(RADIO_VOLUME_ID, radio_volume)    
        channel.basic_publish(exchange='', routing_key=QUEUE_NAME, body=message)

        # parking distance data
        rl_dist = random.randint(PARKING_BOTTOM_LIMIT, PARKING_TOP_LIMIT)
        message = createMessage(REAR_LEFT_DIST_ID, rl_dist) 
        channel.basic_publish(exchange='', routing_key=QUEUE_NAME, body=message)

        rr_dist = random.randint(PARKING_BOTTOM_LIMIT, PARKING_TOP_LIMIT)
        message = createMessage(REAR_RIGHT_DIST_ID, rr_dist) 
        channel.basic_publish(exchange='', routing_key=QUEUE_NAME, body=message)

        rc_dist = random.randint(PARKING_BOTTOM_LIMIT, PARKING_TOP_LIMIT)
        message = createMessage(REAR_CENTER_DIST_ID, rc_dist) 
        channel.basic_publish(exchange='', routing_key=QUEUE_NAME, body=message)

        fc_dist = random.randint(PARKING_BOTTOM_LIMIT, PARKING_TOP_LIMIT)
        message = createMessage(FRONT_CENTER_DIST_ID, fc_dist) 
        channel.basic_publish(exchange='', routing_key=QUEUE_NAME, body=message)
        
        print("Sensor values sent")
        time.sleep(5)

except KeyboardInterrupt:
    print("Sensor values sending was interrupted")

finally:
    connection.close()