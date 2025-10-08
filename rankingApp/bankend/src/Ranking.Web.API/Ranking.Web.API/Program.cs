using Microsoft.EntityFrameworkCore;
using Ranking.Web.API.Application.Services;
using Ranking.Web.API.Domain.Entities.Domain.Entities;
using Ranking.Web.API.Domain.Interfaces;
using Ranking.Web.API.Infrastructure.Data;
using Ranking.Web.API.Infrastructure.Data.Repositories;

var builder = WebApplication.CreateBuilder(args);
// Register DbContext with InMemory DB
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseInMemoryDatabase("TestDb"));

// Register Repository and Service
builder.Services.AddScoped<IProductRepository, ProductRepository>();
builder.Services.AddScoped<ProductService>();

// Add services to the container.
builder.Services.AddControllers();
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

var app = builder.Build();

// Seed database on startup
using (var scope = app.Services.CreateScope())
{
    var context = scope.ServiceProvider.GetRequiredService<AppDbContext>();

    if (!context.Products.Any())
    {
        context.Products.AddRange(
            new Product { Name = "Product A", Price = 10 },
            new Product { Name = "Product B", Price = 20 }
        );

        context.SaveChanges();
    }
}

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseAuthorization();

app.MapControllers();

app.Run();
