using Ranking.Web.API.Application.Commands.Customers;

namespace Ranking.Web.API.Extensions.IoC
{
    public static class MediatRServiceExtensions
    {
        public static IServiceCollection AddMediatRServices(this IServiceCollection services)
        {
            services.AddMediatR(cfg =>
                cfg.RegisterServicesFromAssemblyContaining<CreateCustomerCommandHandler>());

            return services;
        }
    }
}
