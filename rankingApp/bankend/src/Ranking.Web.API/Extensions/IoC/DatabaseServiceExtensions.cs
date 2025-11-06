using Microsoft.EntityFrameworkCore;
using Ranking.Web.API.Infrastructure.Data;

namespace Ranking.Web.API.Extensions.IoC
{
    public static class DatabaseServiceExtensions
    {
        public static IServiceCollection AddDatabase(this IServiceCollection services)
        {
            services.AddDbContext<AppDbContext>(options =>
                options.UseInMemoryDatabase("TestDb"));

            return services;
        }
    }
}
