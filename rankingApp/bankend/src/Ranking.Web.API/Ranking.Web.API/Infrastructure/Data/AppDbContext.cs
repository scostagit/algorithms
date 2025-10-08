using Microsoft.EntityFrameworkCore;
using Ranking.Web.API.Domain.Entities.Domain.Entities;

namespace Ranking.Web.API.Infrastructure.Data
{
    public class AppDbContext : DbContext
    {
        public DbSet<Product> Products { get; set; }

        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
    }
}
