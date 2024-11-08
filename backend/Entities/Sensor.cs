using System.Text.Json.Serialization;
using MongoDB.Bson.Serialization.Attributes;

namespace backend.Entities;

public enum SensorType{
    THERMOMETER,
    BAROMETER,
    POTENTIOMETER,
    PARKING
}

public class Sensor
{
    [BsonId]
    public string? Id {get; set;}

    [JsonConverter(typeof(JsonStringEnumConverter))]
    public SensorType? type {get; set;}
    public string? name {get; set;}
    public string? unit {get; set;}
}