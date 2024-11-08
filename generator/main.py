import random
import time
from sensor_names import *
from sensor_ids import *

def createMessage(sensorId, sensorName, value):
    return f"{{\"sensor_id\": \"{sensorId}\", \"sensor_name\": \"{sensorName}\", \"value\": \"{value}\"}}\n"


with open("generator/GeneratedData.txt", "w", encoding="utf8") as datafile:
    while True:
        # temperature data
        engine_temperature = round(random.uniform(80, 110), 1)
        message = createMessage(ENGINE_TEMP_ID, ENGINE_TEMP_NAME, engine_temperature)
        datafile.write(message)

        cabin_temperature = round(random.uniform(10, 30), 1)
        message = createMessage(CABIN_TEMP_ID, CABIN_TEMP_NAME, cabin_temperature)
        datafile.write(message)

        outside_temperature = round(random.uniform(-20, 40), 1)
        message = createMessage(OUTSIDE_TEMP_ID, OUTSIDE_TEMP_NAME, outside_temperature)
        datafile.write(message)

        battery_temperature = round(random.uniform(5, 35), 1)
        message = createMessage(BATTERY_TEMP_ID, BATTERY_TEMP_NAME, battery_temperature)
        datafile.write(message)

        # barometer data
        rl_pressure = random.randint(150, 350)
        message = createMessage(REAR_LEFT_TIRE_ID, REAR_LEFT_TIRE_NAME, rl_pressure)
        datafile.write(message)

        rr_pressure = random.randint(150, 350)
        message = createMessage(REAR_RIGHT_TIRE_ID, REAR_RIGHT_TIRE_NAME, rr_pressure)
        datafile.write(message)

        fl_pressure = random.randint(150, 350)
        message = createMessage(FRONT_LEFT_TIRE_ID, FRONT_LEFT_TIRE_NAME, fl_pressure)
        datafile.write(message)

        fr_pressure = random.randint(150, 350)
        message = createMessage(FRONT_RIGHT_TIRE_ID, FRONT_RIGHT_TIRE_NAME, fr_pressure)
        datafile.write(message)

        # potentiometer data
        gas_pedal = random.randint(0, 100)
        message = createMessage(GAS_PEDAL_POSITION_ID, GAS_PEDAL_POSITION_NAME, gas_pedal)
        datafile.write(message)

        wheel_angle = random.randint(0, 100)
        message = createMessage(STERRING_WHEEL_ANGLE_ID, STERRING_WHEEL_ANGLE_NAME, wheel_angle)
        datafile.write(message)

        electric_battery = random.randint(0, 100)
        message = createMessage(ELECTRIC_VEHICLE_BATTERY_ID, ELECTRIC_VEHICLE_BATTERY_NAME, electric_battery)
        datafile.write(message)

        radio_volume = random.randint(0, 100)
        message = createMessage(RADIO_VOLUME_ID, RADIO_VOLUME_NAME, radio_volume)    
        datafile.write(message)

        # parking distance data
        rl_dist = random.randint(0, 100)
        message = createMessage(REAR_LEFT_DIST_ID, REAR_LEFT_DIST_NAME, rl_dist) 
        datafile.write(message)

        rr_dist = random.randint(0, 100)
        message = createMessage(REAR_RIGHT_DIST_ID, REAR_RIGHT_DIST_NAME, rr_dist) 
        datafile.write(message)

        rc_dist = random.randint(0, 100)
        message = createMessage(REAR_CENTER_DIST_ID, REAR_CENTER_DIST_NAME, rc_dist) 
        datafile.write(message)

        fc_dist = random.randint(0, 100)
        message = createMessage(FRONT_CENTER_DIST_ID, FRONT_CENTER_DIST_NAME, fc_dist) 
        datafile.write(message)
        
        print("Sensor values sent")
        time.sleep(5)