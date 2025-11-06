using Ranking.Web.API.Infrastructure.Apis;
using Ranking.Web.API.Policies;
using Refit;

namespace Ranking.Web.API.Extensions.IoC
{

    public static class RefitServiceExtensions
    {
        public static IServiceCollection AddRefitClients(this IServiceCollection services, IConfiguration configuration)
        {
            //builder.Services.Configure<ApiSettings>(builder.Configuration.GetSection("ApiSettings"));
            // var apiSettings = builder.Configuration.GetSection("ApiSettings").Get<ApiSettings>();

            var baseUrl = configuration["ApiSettings:BaseUrl"]!;//!Use the null-forgiving operator (!): It tells the compiler to ignore the warning

            services.AddRefitClient<IRestfulApi>()
                .ConfigureHttpClient(c => c.BaseAddress = new Uri(baseUrl))
                .AddPolicyHandler(PollyPolicies.GetRetryPolicy())
                .AddPolicyHandler(PollyPolicies.GetCircuitBreakerPolicy());

            return services;
        }
    }
}
