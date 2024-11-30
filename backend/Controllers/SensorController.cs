using backend.Data;
using backend.Entities;
using backend.Services;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;

namespace backend.Controllers;

[ApiController]
[Route("/api/[controller]")]
public class SensorController : ControllerBase
{
    private readonly ISensorService _sensorService;

    public SensorController(ISensorService sensorService)
    {
        _sensorService = sensorService;
    }

    [HttpGet]
    public IEnumerable<Sensor> FindAll()
    {
        return _sensorService.FindAll();
    }

    [HttpGet]
    [Route("{id}")]
    public ActionResult<Sensor?> FindOne(string id)
    {
        var sensor = _sensorService.FindOne(id);
        return sensor is not null ? Ok(sensor) : NotFound();
    }

    [HttpPut]
    public ActionResult Create(Sensor sensor)
    {
        _sensorService.Create(sensor);
        return CreatedAtAction(nameof(FindOne), new {id = sensor.Id}, sensor);
    }
}