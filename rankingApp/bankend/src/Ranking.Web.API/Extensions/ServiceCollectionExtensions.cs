using Ranking.Web.API.Extensions.IoC;

public static class ServiceCollectionExtensions
{
    public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration configuration)
    {
        services
            .AddDatabase()
            .AddRepositories()
            .AddMessaging()
            .AddMediatRServices()
            .AddRefitClients(configuration)
            .AddValidationServices();

        return services;
    }
}