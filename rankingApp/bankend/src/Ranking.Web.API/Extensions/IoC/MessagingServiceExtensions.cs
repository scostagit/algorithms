using Ranking.Web.API.Domain.Interfaces;
using Ranking.Web.API.Infrastructure.MessageBus;

namespace Ranking.Web.API.Extensions.IoC
{
    public static class MessagingServiceExtensions
    {
        public static IServiceCollection AddMessaging(this IServiceCollection services)
        {
            services.AddSingleton<IMessageBus, RabbitMQMessageBus>();
            services.AddHostedService<CustomerCreatedConsumer>();

            return services;
        }
    }
}
