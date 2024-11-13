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
    private readonly ISensorService _sensorService;

    public MeasureController(IMeasureService measureService, ISensorService sensorService)
    {
        _measureService = measureService;
        _sensorService = sensorService;
    }

    [HttpGet]
    public async Task<IEnumerable<Measure>> FindAll([FromQuery(Name ="sensor_id")]List<string> sensorIds, [FromQuery(Name ="sensor_type")]SensorType? sensorType)
    {
        if(sensorType is not null)
        {
            IEnumerable<Sensor> sensors = _sensorService.findAllByType(sensorType.Value);
            foreach(var s in sensors)
            {
                if(s.Id is not null)
                    sensorIds.Add(s.Id);
            }
        }
        return _measureService.FindAll(sensorIds);
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