using backend.Data;
using backend.Entities;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;

namespace backend.Controllers;

[ApiController]
[Route("/api/[controller]")]
public class SensorController : ControllerBase
{
    private readonly IMongoCollection<Sensor>? _sensors;

    public SensorController(MongoDbService mongoDbService)
    {
        _sensors = mongoDbService.Database?.GetCollection<Sensor>("sensors");
    }

    [HttpGet]
    public async Task<IEnumerable<Sensor>> FindAll()
    {
        return await _sensors.Find(FilterDefinition<Sensor>.Empty).ToListAsync();
    }

    [HttpGet]
    [Route("{id}")]
    public async Task<ActionResult<Sensor?>> FindOne(string id)
    {
        var filter = Builders<Sensor>.Filter.Eq(x => x.Id, id);
        var sensor = _sensors.Find(filter).FirstOrDefault();
        return sensor is not null ? Ok(sensor) : NotFound();
    }

    [HttpPut]
    public async Task<ActionResult> Create(Sensor sensor)
    {
        await _sensors.InsertOneAsync(sensor);
        return CreatedAtAction(nameof(FindOne), new {id = sensor.Id}, sensor);
    }
}