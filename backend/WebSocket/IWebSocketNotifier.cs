namespace backend.WebSocket;

public interface IWebSocketNotifier
{
    Task NotifyAllAsync(NotificationMessage message);
}