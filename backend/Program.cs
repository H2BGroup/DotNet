using backend.Data;
using backend.RabbitMq;
using backend.Services;
using backend.WebSocket;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddSingleton<MongoDbService>();
builder.Services.AddTransient<ISensorService, SensorService>();
builder.Services.AddTransient<IMeasureService, MeasureService>();
builder.Services.AddSingleton<IRabbitMQConsumer, RabbitMQConsumer>();
builder.Services.AddCors(options => {
    options.AddDefaultPolicy(policy => {
        policy.AllowAnyOrigin();
        policy.AllowAnyHeader();
        policy.AllowAnyMethod();
    });
});
builder.Services.AddSignalR();
builder.Services.AddSingleton<IWebSocketNotifier, WebSocketNotifier>();

var app = builder.Build();

var rabbitMQConsumer = app.Services.GetRequiredService<IRabbitMQConsumer>();

rabbitMQConsumer.ConsumeMessage();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors();

app.UseAuthorization();

app.MapControllers();

app.MapHub<NotificationHub>("/notifications");

app.Run();
