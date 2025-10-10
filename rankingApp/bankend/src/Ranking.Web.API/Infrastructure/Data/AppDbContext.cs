using Microsoft.EntityFrameworkCore;
using Ranking.Web.API.Domain.Entities;

namespace Ranking.Web.API.Infrastructure.Data
{
    public class AppDbContext : DbContext
    {
        public DbSet<Product> Products { get; set; }

        public DbSet<Customer> Customers { get; set; }

        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
    }
}
