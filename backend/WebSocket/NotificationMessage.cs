namespace backend.WebSocket;

public class NotificationMessage
{
    public string? sensor_id { get; set; }
    public double? last_measure { get; set; }
    public double? average { get; set; }
}