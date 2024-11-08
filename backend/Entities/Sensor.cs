using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace backend.Entities;

public class Sensor
{
    [BsonId]
    public string? Id {get; set;}
    public string? name {get; set;}
    public string? unit {get; set;}
}