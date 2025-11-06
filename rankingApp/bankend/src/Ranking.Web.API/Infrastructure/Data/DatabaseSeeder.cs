using Ranking.Web.API.Domain.Entities;

namespace Ranking.Web.API.Infrastructure.Data
{
    public static class DatabaseSeeder
    {
        public static void Seed(AppDbContext context)
        {
            if (!context.Products.Any())
            {
                context.Products.AddRange(
                    new Product { Name = "Product A", Price = 10 },
                    new Product { Name = "Product B", Price = 20 }
                );

                context.SaveChanges();
            }
        }

        // Optional: a method to handle seeding via IServiceProvider
        public static void SeedDatabase(IServiceProvider services)
        {
            using var scope = services.CreateScope();
            var context = scope.ServiceProvider.GetRequiredService<AppDbContext>();
            Seed(context);
        }
    }
}
