using backend.Data;
using backend.Entities;
using MongoDB.Driver;

namespace backend.Services;

public class MeasureService : IMeasureService
{
    private readonly IMongoCollection<Measure>? _measures;

    public MeasureService(MongoDbService mongoDbService)
    {
        _measures = mongoDbService.Database?.GetCollection<Measure>("measures");
    }

    public IEnumerable<Measure> FindAll(string? sensorId)
    {
        var filter = Builders<Measure>.Filter.Empty;
        if(sensorId is not null)
        {
            filter = filter & Builders<Measure>.Filter.Eq(x => x.sensor_id, sensorId);
        }
        return _measures.Find(filter).ToList();
    }

    public Measure? FindOne(string id)
    {
        var filter = Builders<Measure>.Filter.Eq(x => x.Id, id);
        var measure = _measures.Find(filter).FirstOrDefault();
        return measure;
    }

    public void Create(Measure measure)
    {
        _measures.InsertOne(measure);
        return;
    }

    public void Delete(string id)
    {
        var filter = Builders<Measure>.Filter.Eq(x => x.Id, id);
        _measures.DeleteOne(filter);
        return;
    }
}