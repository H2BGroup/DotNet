using backend.Data;
using backend.Entities;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;

namespace backend.Controllers;

[ApiController]
[Route("/api/[controller]")]
public class MeasureController : ControllerBase
{
    private readonly IMongoCollection<Measure>? _measures;

    public MeasureController(MongoDbService mongoDbService)
    {
        _measures = mongoDbService.Database?.GetCollection<Measure>("measures");
    }

    [HttpGet]
    public async Task<IEnumerable<Measure>> FindAll()
    {
        return await _measures.Find(FilterDefinition<Measure>.Empty).ToListAsync();
    }

    [HttpGet]
    [Route("{id}")]
    public async Task<ActionResult<Measure?>> FindOne(string id)
    {
        var filter = Builders<Measure>.Filter.Eq(x => x.Id, id);
        var measure = _measures.Find(filter).FirstOrDefault();
        return measure is not null ? Ok(measure) : NotFound();
    }

    [HttpPut]
    public async Task<ActionResult> Create(Measure measure)
    {
        await _measures.InsertOneAsync(measure);
        return CreatedAtAction(nameof(FindOne), new {id = measure.Id}, measure);
    }
}