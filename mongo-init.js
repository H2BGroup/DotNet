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

db.sensors.insert({_id: "t1", type: THERMOMETER, name: "Engine temp", unit: "Celsius", wallet:"0x0B8610D6a299eD35e90afb3A8F63397851FcBD28"})
db.sensors.insert({_id: "t2", type: THERMOMETER, name: "Cabin temp", unit: "Celsius", wallet:"0x69d07F2B5237863E547551ecB653A48E5e1Ce8fc"})
db.sensors.insert({_id: "t3", type: THERMOMETER, name: "Outside temp", unit: "Celsius", wallet:"0xa23C8596F634Ee1A7bf4Ebd846a5c2a30C2fb069"})
db.sensors.insert({_id: "t4", type: THERMOMETER, name: "Battery temp", unit: "Celsius", wallet:"0xD9c96058F533E9ad31193a5DB207649070E284CC"})

db.sensors.insert({_id: "b1", type: BAROMETER, name: "Rear left tire pressure", unit: "mBar", wallet:"0x2484f4c3381a34f16B699436ebe60Fd45F3FC61D"})
db.sensors.insert({_id: "b2", type: BAROMETER, name: "Rear right tire pressure", unit: "mBar", wallet:"0x8e347681095BF42270bd8A3e031883B5973Ee5D6"})
db.sensors.insert({_id: "b3", type: BAROMETER, name: "Front left pressure", unit: "mBar", wallet:"0x31EADa963E69FdD821e1D4f84A0dF5eDdaf2226E"})
db.sensors.insert({_id: "b4", type: BAROMETER, name: "Front right tire pressure", unit: "mBar", wallet:"0x418D9b2d9A5dA2e38830C10dAe6c2911D5a38e3b"})

db.sensors.insert({_id: "p1", type: POTENTIOMETER, name: "Gas pedal position", unit: "%", wallet:"0x8D62f675EB21937259444dde9Cf9C73aCa940748"})
db.sensors.insert({_id: "p2", type: POTENTIOMETER, name: "Steering wheel angle", unit: "%", wallet:"0x8869133E90403d03AB548Df63021797EbDfE7244"})
db.sensors.insert({_id: "p3", type: POTENTIOMETER, name: "Vehicle battery", unit: "%", wallet:"0xd1161af69f87B5f6A923cb8AdBbC98305DaC0Fb3"})
db.sensors.insert({_id: "p4", type: POTENTIOMETER, name: "Radio volume", unit: "%", wallet:"0x282C43F593Df12d1FAA4051481348FaA8E4aD3bA"})

db.sensors.insert({_id: "d1", type: PARKING, name: "Rear left distance", unit: "cm", wallet:"0x055A73BCB1c9eBb45ef23Ce6ba9Fce0A33666fba"})
db.sensors.insert({_id: "d2", type: PARKING, name: "Rear right distance", unit: "cm", wallet:"0xB196B18CF13dD22fC06C93ee064C5c29b66e728a"})
db.sensors.insert({_id: "d3", type: PARKING, name: "Rear center distance", unit: "cm", wallet:"0xb66383bA1d1d477fD3C235977605E0CFF002D3bf"})
db.sensors.insert({_id: "d4", type: PARKING, name: "Front center distance", unit: "cm", wallet:"0x5C477e8A2e10C5d439AE84274199B478ED420543"})