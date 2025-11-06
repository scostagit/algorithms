using Ranking.Web.API.Infrastructure.Data;

var builder = WebApplication.CreateBuilder(args);

// Add all services via extension method
builder.Services.AddApplicationServices(builder.Configuration);

// Add Controllers
builder.Services.AddControllers();

var app = builder.Build();

// Seed database
DatabaseSeeder.SeedDatabase(app.Services);

// Configure pipeline
if (app.Environment.IsDevelopment())
{
    // app.MapOpenApi();
}

app.UseAuthorization();
app.MapControllers();
app.MapGet("/", () => "API is running...");

app.Run();
