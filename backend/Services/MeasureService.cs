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

    public IEnumerable<Measure> FindAll(List<string> sensorIds, DateTime? startDate, DateTime? endDate, string? sortField, string? sortOrder)
    {
        var filter = Builders<Measure>.Filter.Empty;
        if (sensorIds.Count > 0)
        {
            filter = filter & Builders<Measure>.Filter.In(x => x.sensor_id, sensorIds);
        }

        if (startDate.HasValue)
        {
            filter = filter & Builders<Measure>.Filter.Gt(x => x.timestamp, startDate);
        }
        if (endDate.HasValue)
        {
            filter = filter & Builders<Measure>.Filter.Lt(x => x.timestamp, endDate);
        }

        if (sortField != null)
        {
            if (sortOrder == "asc")
            {
                SortDefinition<Measure> sort = Builders<Measure>.Sort.Ascending(sortField);
                return _measures.Find(filter).Sort(sort).ToList();
            }
            else if (sortOrder == "desc")
            {
                SortDefinition<Measure> sort = Builders<Measure>.Sort.Descending(sortField);
                return _measures.Find(filter).Sort(sort).ToList();
            }
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
        if (_measures is not null)
        {
            _measures.InsertOne(measure);
        }
        return;
    }

    public void Delete(string id)
    {
        var filter = Builders<Measure>.Filter.Eq(x => x.Id, id);
        if (_measures is not null)
        {
            _measures.DeleteOne(filter);
        }
        return;
    }
}