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
db.createCollection('data');