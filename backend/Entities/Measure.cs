using MongoDB.Bson.Serialization.Attributes;

namespace backend.Entities;

public class Measure
{
    [BsonId]
    [BsonRepresentation(MongoDB.Bson.BsonType.ObjectId)]
    public string? Id {get; set;}
    public string? sensorId {get; set;}
    public double? value {get; set;}
    public DateTime? timestamp {get; set;}
}