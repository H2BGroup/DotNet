﻿using backend.Entities;
using backend.Services;
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

        public RabbitMQConsumer(IMeasureService measureService, IConfiguration configuration)
        {
            _measureService = measureService;
            InitializeConntection(configuration.GetConnectionString("RabbitMQConnection"));
        }

        private void InitializeConntection(string connectionString)
        {
            ConnectionFactory factory = new();

            factory.Uri = new Uri(connectionString);

            _conntection = factory.CreateConnection();
            _channel = _conntection.CreateModel();

            _channel.QueueDeclare("messages", durable: true, exclusive: false, autoDelete: false);

        }

        public void ConsumeMessage()
        {
            var consumer = new EventingBasicConsumer(_channel);
            consumer.Received += (model, ea) =>
            {
                var body = ea.Body.ToArray();
                var message = Encoding.UTF8.GetString(body);
                Console.WriteLine($" [x] Received {message}");

                Measure measure = JsonSerializer.Deserialize<Measure>(message);
                Console.WriteLine(measure.ToString());

                if (measure != null)
                {
                    _measureService.Create(measure);
                }
            };

            _channel.BasicConsume("messages", autoAck: true, consumer: consumer);
        }
    }

}
