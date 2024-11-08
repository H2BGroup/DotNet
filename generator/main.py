import random
import time
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

def createMessage(sensorId, value):
    current_time = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    return f"{{\"sensor_id\": \"{sensorId}\", \"value\": {value}, \"timestamp\": \"{current_time}\"}}\n"


with open("generator/GeneratedData.txt", "w", encoding="utf8") as datafile:
    while True:
        # temperature data
        engine_temperature = round(random.uniform(ENGINE_TEMP_BOTTOM_LIMIT, ENGINE_TEMP_TOP_LIMIT), TEMPERATURE_ROUNDING)
        message = createMessage(ENGINE_TEMP_ID, engine_temperature)
        datafile.write(message)

        cabin_temperature = round(random.uniform(CABIN_TEMP_BOTTOM_LIMIT, CABIN_TEMP_TOP_LIMIT), TEMPERATURE_ROUNDING)
        message = createMessage(CABIN_TEMP_ID, cabin_temperature)
        datafile.write(message)

        outside_temperature = round(random.uniform(OUTSIDE_TEMP_BOTTOM_LIMIT, OUTSIDE_TEMP_TOP_LIMIT), TEMPERATURE_ROUNDING)
        message = createMessage(OUTSIDE_TEMP_ID, outside_temperature)
        datafile.write(message)

        intake_air_temperature = round(random.uniform(INTAKE_AIR_TEMP_BOTTOM_LIMIT, INTAKE_AIR_TEMP_TOP_LIMIT), TEMPERATURE_ROUNDING)
        message = createMessage(INTAKE_AIR_ID, intake_air_temperature)
        datafile.write(message)

        # barometer data
        rl_pressure = random.randint(PRESSURE_BOTTOM_LIMIT, PRESSURE_TOP_LIMIT)
        message = createMessage(REAR_LEFT_TIRE_ID, rl_pressure)
        datafile.write(message)

        rr_pressure = random.randint(PRESSURE_BOTTOM_LIMIT, PRESSURE_TOP_LIMIT)
        message = createMessage(REAR_RIGHT_TIRE_ID, rr_pressure)
        datafile.write(message)

        fl_pressure = random.randint(PRESSURE_BOTTOM_LIMIT, PRESSURE_TOP_LIMIT)
        message = createMessage(FRONT_LEFT_TIRE_ID, fl_pressure)
        datafile.write(message)

        fr_pressure = random.randint(PRESSURE_BOTTOM_LIMIT, PRESSURE_TOP_LIMIT)
        message = createMessage(FRONT_RIGHT_TIRE_ID, fr_pressure)
        datafile.write(message)

        # potentiometer data
        gas_pedal = random.randint(PERCENT_BOTTOM_LIMIT, PERCENT_TOP_LIMIT)
        message = createMessage(GAS_PEDAL_POSITION_ID, gas_pedal)
        datafile.write(message)

        wheel_angle = random.randint(PERCENT_BOTTOM_LIMIT, PERCENT_TOP_LIMIT)
        message = createMessage(STERRING_WHEEL_ANGLE_ID, wheel_angle)
        datafile.write(message)

        electric_battery = random.randint(PERCENT_BOTTOM_LIMIT, PERCENT_TOP_LIMIT)
        message = createMessage(ELECTRIC_VEHICLE_BATTERY_ID, electric_battery)
        datafile.write(message)

        radio_volume = random.randint(PERCENT_BOTTOM_LIMIT, PERCENT_TOP_LIMIT)
        message = createMessage(RADIO_VOLUME_ID, radio_volume)    
        datafile.write(message)

        # parking distance data
        rl_dist = random.randint(PARKING_BOTTOM_LIMIT, PARKING_TOP_LIMIT)
        message = createMessage(REAR_LEFT_DIST_ID, rl_dist) 
        datafile.write(message)

        rr_dist = random.randint(PARKING_BOTTOM_LIMIT, PARKING_TOP_LIMIT)
        message = createMessage(REAR_RIGHT_DIST_ID, rr_dist) 
        datafile.write(message)

        rc_dist = random.randint(PARKING_BOTTOM_LIMIT, PARKING_TOP_LIMIT)
        message = createMessage(REAR_CENTER_DIST_ID, rc_dist) 
        datafile.write(message)

        fc_dist = random.randint(PARKING_BOTTOM_LIMIT, PARKING_TOP_LIMIT)
        message = createMessage(FRONT_CENTER_DIST_ID, fc_dist) 
        datafile.write(message)
        
        print("Sensor values sent")
        time.sleep(5)