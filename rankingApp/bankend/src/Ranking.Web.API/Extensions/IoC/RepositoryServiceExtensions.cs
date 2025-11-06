using Ranking.Web.API.Application.Services;
using Ranking.Web.API.Domain.Interfaces;
using Ranking.Web.API.Infrastructure.Data.Repositories;

namespace Ranking.Web.API.Extensions.IoC
{
    public static class RepositoryServiceExtensions
    {
        public static IServiceCollection AddRepositories(this IServiceCollection services)
        {
            services.AddScoped<IProductRepository, ProductRepository>();
            services.AddScoped<ICustomerRepository, CustomerRepository>();
            services.AddScoped<ProductService>();

            return services;
        }
    }
}
