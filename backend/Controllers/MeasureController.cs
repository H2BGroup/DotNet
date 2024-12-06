using backend.Data;
using backend.Entities;
using backend.Services;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using System.Text;
using System.Text.Json;

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

    [HttpGet("export")]
    public IActionResult ExportToFile([FromQuery(Name = "sensor_id")] List<string> sensorIds, [FromQuery(Name = "sensor_type")] List<SensorType> sensorTypes, [FromQuery(Name = "start_date")] DateTime? startDate, [FromQuery(Name = "end_date")] DateTime? endDate, string fileType)
    {
        foreach (var sensorType in sensorTypes)
        {
            IEnumerable<Sensor> sensors = _sensorService.findAllByType(sensorType);
            foreach (var s in sensors)
            {
                if (s.Id is not null)
                    sensorIds.Add(s.Id);
            }
        }
        var measures = _measureService.FindAll(sensorIds, startDate, endDate);

        if(fileType == "CSV")
        {
            var stringBuilder = new StringBuilder();
            stringBuilder.AppendLine("Id,SensorId,Value,Timestamp");

            foreach (var measure in measures)
            {
                stringBuilder.AppendLine($"{measure.Id},{measure.sensor_id},{measure.value},{measure.timestamp}");
            }

            var csvContent = stringBuilder.ToString();
            var bytes = Encoding.UTF8.GetBytes(csvContent);
            var fileName = $"measures_{DateTime.UtcNow:yyyyMMddHHmmss}.csv";

            return File(bytes, "text/csv", fileName);
        }
        else if(fileType == "JSON")
        {
            var jsonOptions = new JsonSerializerOptions
            {
                WriteIndented = true
            };
            var jsonContent = JsonSerializer.Serialize(measures, jsonOptions);

            var bytes = System.Text.Encoding.UTF8.GetBytes(jsonContent);
            var fileName = $"measures_{DateTime.UtcNow:yyyyMMddHHmmss}.json";

            return File(bytes, "application/json", fileName);
        }

        return null;
    }
}