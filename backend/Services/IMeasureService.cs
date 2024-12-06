using backend.Entities;

namespace backend.Services;

public interface IMeasureService
{
    public IEnumerable<Measure> FindAll(List<string> sensorIds, DateTime? startDate, DateTime? endDate);
    public Measure? FindOne(string id);
    public void Create(Measure measure);
    public void Delete(string id);
}