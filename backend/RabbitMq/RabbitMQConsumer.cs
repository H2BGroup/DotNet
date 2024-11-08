using RabbitMQ.Client;
using RabbitMQ.Client.Events;
using System.Text;


namespace backend.RabbitMq
{
    public class RabbitMQConsumer:IRabbitMQConsumer
    {
        private IConnection _conntection;
        private IModel _channel;

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

        public void ConsumeMessage<T>(T message)
        {
            var consumer = new AsyncEventingBasicConsumer(_channel);
            consumer.Received += (model, ea) =>
            {
                var body = ea.Body.ToArray();
                var message = Encoding.UTF8.GetString(body);
                Console.WriteLine($" [x] Received {message}");
                return Task.CompletedTask;
            };

            _channel.BasicConsume("messages", autoAck: true, consumer: consumer);
        }
    }

}
