using Microsoft.AspNetCore.SignalR;

namespace backend.WebSocket;

public class WebSocketNotifier : IWebSocketNotifier
{
    private readonly IHubContext<NotificationHub> _hubContext;

    public WebSocketNotifier(IHubContext<NotificationHub> hubContext)
    {
        _hubContext = hubContext;
    }

    public async Task NotifyAllAsync(NotificationMessage message)
    {
        await _hubContext.Clients.All.SendAsync("ReceiveMessage", message);
    }
}