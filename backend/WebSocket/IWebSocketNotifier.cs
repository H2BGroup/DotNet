namespace backend.WebSocket;

public interface IWebSocketNotifier
{
    Task NotifyAllAsync<T>(T message);
}