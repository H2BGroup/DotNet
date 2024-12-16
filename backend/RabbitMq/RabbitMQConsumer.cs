using backend.blockchain;
using backend.Entities;
using backend.Services;
using backend.WebSocket;
using MongoDB.Bson;
using Org.BouncyCastle.Asn1.Cms;
using RabbitMQ.Client;
using RabbitMQ.Client.Events;
using System.Text;
using System.Text.Json;


namespace backend.RabbitMq
{
    public class RabbitMQConsumer:IRabbitMQConsumer
    {
        private IConnection? _conntection;
        private IModel? _channel;
        private readonly IMeasureService _measureService;
        private readonly IWebSocketNotifier _notifier;
        private readonly IBlockchainService _blockchainService;
        private readonly ISensorService _sensorService;

        public RabbitMQConsumer(IMeasureService measureService, IConfiguration configuration, IWebSocketNotifier notifier, IBlockchainService blockchainService, ISensorService sensorService)
        {
            _measureService = measureService;
            string? connectionString = configuration.GetConnectionString("RabbitMQConnection");
            if(connectionString is not null)
                InitializeConntection(connectionString);
            _notifier = notifier;
            _blockchainService = blockchainService;
            _sensorService = sensorService;
        }

        private void InitializeConntection(string connectionString)
        {
            ConnectionFactory factory = new();

            factory.Uri = new Uri(connectionString);

            _conntection = factory.CreateConnection();
            _channel = _conntection.CreateModel();
            _channel.BasicQos(0, 1, true);

            _channel.QueueDeclare("messages", durable: true, exclusive: false, autoDelete: false);

        }

        public void ConsumeMessage()
        {
            var consumer = new EventingBasicConsumer(_channel);
            consumer.Received += async (model, ea) =>
            {
                var body = ea.Body.ToArray();
                var message = Encoding.UTF8.GetString(body);
                Console.WriteLine($" [x] Received {message}");

                Measure? measure = JsonSerializer.Deserialize<Measure>(message);

                if (measure != null)
                {
                    Console.WriteLine(measure.ToString());
                    _measureService.Create(measure);
                    if(measure.sensor_id != null && measure.value != null){
                        var notification = new NotificationMessage{
                            sensor_id = measure.sensor_id,
                            last_measure = measure.value.Value,
                            average = _measureService.GetSensorAverage(measure.sensor_id)
                        };
                        Console.WriteLine(notification.ToJson());
                        await _notifier.NotifyAllAsync(notification);
                        Sensor sensor = _sensorService.FindOne(measure.sensor_id);
                        _blockchainService.TransferTokens(sensor.wallet, 1);
                        Thread.Sleep(1000);
                    }
                }
                _channel.BasicAck(ea.DeliveryTag, false);
            };

            _channel.BasicConsume("messages", autoAck: false, consumer: consumer);
        }
    }

}
