using backend.Data;
using backend.Entities;
using MongoDB.Driver;

namespace backend.Services;

public class SensorService : ISensorService
{
    private readonly IMongoCollection<Sensor>? _sensors;

    public SensorService(MongoDbService mongoDbService)
    {
        _sensors = mongoDbService.Database?.GetCollection<Sensor>("sensors");
    }

    public IEnumerable<Sensor> FindAll()
    {
        return _sensors.Find(FilterDefinition<Sensor>.Empty).ToList();
    }

    public Sensor? FindOne(string id)
    {
        var filter = Builders<Sensor>.Filter.Eq(x => x.Id, id);
        var sensor = _sensors.Find(filter).FirstOrDefault();
        return sensor;
    }

    public void Create(Sensor sensor)
    {
        if(_sensors is not null)
        {
            _sensors.InsertOne(sensor);
        }
        return;
    }

    public void Delete(string id)
    {
        var filter = Builders<Sensor>.Filter.Eq(x => x.Id, id);
        if(_sensors is not null)
        {
            _sensors.DeleteOne(filter);
        }
        return;
    }

    public IEnumerable<Sensor> findAllByType(SensorType type){
        var filter = Builders<Sensor>.Filter.Eq(x => x.type, type);
        return _sensors.Find(filter).ToList();
    }
}