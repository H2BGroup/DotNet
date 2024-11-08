using RabbitMQ.Client.Events;
using System.Threading.Channels;

namespace backend.RabbitMq
{
    public interface IRabbitMQConsumer
    {
        public void ConsumeMessage<T>(T message);

    }
}
