using backend.Entities;
using backend.Services;
using MongoDB.Bson.IO;
using RabbitMQ.Client;
using RabbitMQ.Client.Events;
using System.Text;
using System.Text.Json;


namespace backend.RabbitMq
{
    public class RabbitMQConsumer:IRabbitMQConsumer
    {
        private IConnection _conntection;
        private IModel _channel;
        private readonly IMeasureService _measureService;

        public RabbitMQConsumer()
        {
            InitializeConntection();
        }

        private void InitializeConntection()
        {
            ConnectionFactory factory = new();

            factory.Uri = new Uri("amqp://guest:guest@localhost:5672");

            _conntection = factory.CreateConnection();
            _channel = _conntection.CreateModel();

            _channel.QueueDeclare("messages");

        }

        public void ConsumeMessage()
        {
            var consumer = new EventingBasicConsumer(_channel);
            consumer.Received += (model, ea) =>
            {
                var body = ea.Body.ToArray();
                var message = Encoding.UTF8.GetString(body);
                Console.WriteLine($" [x] Received {message}");

                var measure = JsonSerializer.Deserialize<Measure>(message);

                if (measure != null)
                {
                    _measureService.Create(measure);
                }
            };

            _channel.BasicConsume("messages", autoAck: true, consumer: consumer);
        }
    }

}
