using Microsoft.EntityFrameworkCore;
using Ranking.Web.API.Domain.Entities.Domain.Entities;
using Ranking.Web.API.Infrastructure.Data;

namespace Ranking.Web.API.Infrastructure.Mocks
{

    public static class MockDbContext
    {
        public static AppDbContext GetDbContext()
        {
            var options = new DbContextOptionsBuilder<AppDbContext>()
                .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
                .Options;

            var dbContext = new AppDbContext(options);

            dbContext.Products.AddRange(new List<Product>
            {
                new Product { Name = "Product A", Price = 100 },
                new Product { Name = "Product B", Price = 200 },
            });

            dbContext.SaveChanges();

            return dbContext;
        }
    }

}
