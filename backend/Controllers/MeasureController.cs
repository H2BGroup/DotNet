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
    public IEnumerable<Measure> FindAll([FromQuery(Name ="sensor_id")]List<string> sensorIds, [FromQuery(Name ="sensor_type")]List<SensorType> sensorTypes, [FromQuery(Name = "start_date")] DateTime? startDate, [FromQuery(Name = "end_date")] DateTime? endDate)
    {
        foreach(var sensorType in sensorTypes)
        {
            IEnumerable<Sensor> sensors = _sensorService.findAllByType(sensorType);
            foreach(var s in sensors)
            {
                if(s.Id is not null)
                    sensorIds.Add(s.Id);
            }
        }
        return _measureService.FindAll(sensorIds, startDate, endDate);
    }

    [HttpGet]
    [Route("{id}")]
    public ActionResult<Measure?> FindOne(string id)
    {
        var measure = _measureService.FindOne(id);
        return measure is not null ? Ok(measure) : NotFound();
    }

    [HttpPut]
    public ActionResult Create(Measure measure)
    {
        _measureService.Create(measure);
        return CreatedAtAction(nameof(FindOne), new {id = measure.Id}, measure);
    }
}