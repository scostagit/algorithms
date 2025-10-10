using MediatR;
using Newtonsoft.Json;
using RabbitMQ.Client;
using RabbitMQ.Client.Events;
using Ranking.Web.API.Application.Commands.Customers.Create;
using System.Text;

namespace Ranking.Web.API.Infrastructure
{
    public class CustomerCreatedConsumer : BackgroundService
    {
        private readonly IServiceScopeFactory _scopeFactory;

        public CustomerCreatedConsumer(IServiceScopeFactory scopeFactory)
        {
            _scopeFactory = scopeFactory;
        }

        protected override Task ExecuteAsync(CancellationToken stoppingToken)
        {
            //var factory = new ConnectionFactory() { HostName = "localhost" };
           /* var factory = new ConnectionFactory() { HostName = "localhost" };
            var connection = factory.CreateConnectionAsync().Result;
            var channel = connection.CreateChannelAsync().Result;*/

            /*channel.QueueDeclareAsync("customer_created", false, false, false, null);


            var consumer = new AsyncEventingBasicConsumer(channel);
            consumer.ReceivedAsync += async (model, ea) =>
            {
                using var scope = _scopeFactory.CreateScope();
                var mediator = scope.ServiceProvider.GetRequiredService<IMediator>();

                var body = ea.Body.ToArray();
                var json = Encoding.UTF8.GetString(body);

                var customerDto = JsonConvert.DeserializeObject<CreateCustomerCommand>(json);

                await mediator.Send(customerDto);
            };
        
            channel.BasicConsumeAsync(queue: "customer_created", autoAck: true, consumer: consumer);*/

            return Task.CompletedTask;
        }
    }
}
