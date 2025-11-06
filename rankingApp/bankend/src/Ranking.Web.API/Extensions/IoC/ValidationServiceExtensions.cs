using FluentValidation.AspNetCore;
using MediatR;

namespace Ranking.Web.API.Extensions.IoC
{
    public static class ValidationServiceExtensions
    {
        public static IServiceCollection AddValidationServices(this IServiceCollection services)
        {
            services.AddFluentValidationAutoValidation();
            services.AddTransient(typeof(IPipelineBehavior<,>), typeof(ValidationBehavior<,>));

            var assemblies = AppDomain.CurrentDomain.GetAssemblies()
                .Where(a => a.FullName!.StartsWith("Ranking."))
                .ToList();

            foreach (var assembly in assemblies)
            {
                services.AddValidatorsFromAssembly(assembly);
            }

            return services;
        }
    }
}
