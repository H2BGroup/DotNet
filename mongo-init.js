db = db.getSiblingDB('admin');

db.auth("root", "example");

db = db.getSiblingDB('dotnet');

db.createUser(
    {
        user: "user",
        pwd: "password",
        roles: [
            {
                role: "readWrite",
                db: "dotnet"
            }
        ]
    }
);

db.createCollection('sensors');
db.createCollection('measures');

// Initialize sensors

THERMOMETER=0;
BAROMETER=1;
POTENTIOMETER=2;
PARKING=3;

db.sensors.insert({_id: "t1", type: THERMOMETER, name: "Engine temp", unit: "Celsius"})
db.sensors.insert({_id: "t2", type: THERMOMETER, name: "Cabin temp", unit: "Celsius"})
db.sensors.insert({_id: "t3", type: THERMOMETER, name: "Outside temp", unit: "Celsius"})
db.sensors.insert({_id: "t4", type: THERMOMETER, name: "Battery temp", unit: "Celsius"})

db.sensors.insert({_id: "b1", type: BAROMETER, name: "Rear left tire pressure", unit: "mBar"})
db.sensors.insert({_id: "b2", type: BAROMETER, name: "Rear right tire pressure", unit: "mBar"})
db.sensors.insert({_id: "b3", type: BAROMETER, name: "Front left pressure", unit: "mBar"})
db.sensors.insert({_id: "b4", type: BAROMETER, name: "Front right tire pressure", unit: "mBar"})

db.sensors.insert({_id: "p1", type: POTENTIOMETER, name: "Gas pedal position", unit: "%"})
db.sensors.insert({_id: "p2", type: POTENTIOMETER, name: "Steering wheel angle", unit: "%"})
db.sensors.insert({_id: "p3", type: POTENTIOMETER, name: "Vehicle battery", unit: "%"})
db.sensors.insert({_id: "p4", type: POTENTIOMETER, name: "Radio volume", unit: "%"})

db.sensors.insert({_id: "d1", type: PARKING, name: "Rear left distance", unit: "cm"})
db.sensors.insert({_id: "d2", type: PARKING, name: "Rear right distance", unit: "cm"})
db.sensors.insert({_id: "d3", type: PARKING, name: "Rear center distance", unit: "cm"})
db.sensors.insert({_id: "d4", type: PARKING, name: "Front center distance", unit: "cm"})