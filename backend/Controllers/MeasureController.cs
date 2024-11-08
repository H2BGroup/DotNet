using backend.Data;
using backend.Entities;
using backend.Services;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;

namespace backend.Controllers;

[ApiController]
[Route("/api/[controller]")]
public class MeasureController : ControllerBase
{
    private readonly IMeasureService _measureService;

    public MeasureController(IMeasureService measureService)
    {
        _measureService = measureService;
    }

    [HttpGet]
    public async Task<IEnumerable<Measure>> FindAll()
    {
        return _measureService.FindAll();
    }

    [HttpGet]
    [Route("{id}")]
    public async Task<ActionResult<Measure?>> FindOne(string id)
    {
        var measure = _measureService.FindOne(id);
        return measure is not null ? Ok(measure) : NotFound();
    }

    [HttpPut]
    public async Task<ActionResult> Create(Measure measure)
    {
        _measureService.Create(measure);
        return CreatedAtAction(nameof(FindOne), new {id = measure.Id}, measure);
    }
}