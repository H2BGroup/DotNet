using backend.Entities;

namespace backend.Services;

public interface ISensorService
{
    public IEnumerable<Sensor> FindAll();
    public Sensor? FindOne(string id);
    public void Create(Sensor sensor);
    public void Delete(string id);
    public IEnumerable<Sensor> findAllByType(SensorType type);
}