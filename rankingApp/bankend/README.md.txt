To create a full CRUD (Create, Read, Update, Delete) tutorial using **C#**, **Entity Framework**, **mocked DbContext**, **LINQ**, and following the **Domain-Driven Design (DDD)** pattern, we'll structure the solution using typical DDD layers:

### 📦 Project Structure (DDD Style)

```
/Domain
  - Entities
  - Interfaces
/Application
  - Services
/Infrastructure
  - Data
    - DbContext
    - Repositories
  - Mocks
/API
  - Controllers
```

We’ll implement three domain models:

* `Product`
* `Customer`
* `Sale`

I'll now outline the entire flow with one example (`Product`). You can replicate this for `Customer` and `Sale`.

---

## 🔷 1. Domain Layer

### `Entities/Product.cs`

```csharp
namespace Domain.Entities
{
    public class Product
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public string Name { get; set; }
        public decimal Price { get; set; }
    }
}
```

### `Interfaces/IProductRepository.cs`

```csharp
using Domain.Entities;

namespace Domain.Interfaces
{
    public interface IProductRepository
    {
        Task<IEnumerable<Product>> GetAllAsync();
        Task<Product> GetByIdAsync(Guid id);
        Task<Product> AddAsync(Product product);
        Task<Product> UpdateAsync(Product product);
        Task<bool> DeleteAsync(Guid id);
    }
}
```

---

## 🔶 2. Infrastructure Layer

### `Data/AppDbContext.cs`

```csharp
using Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data
{
    public class AppDbContext : DbContext
    {
        public DbSet<Product> Products { get; set; }

        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
    }
}
```

### `Repositories/ProductRepository.cs`

```csharp
using Domain.Entities;
using Domain.Interfaces;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories
{
    public class ProductRepository : IProductRepository
    {
        private readonly AppDbContext _context;

        public ProductRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<Product> AddAsync(Product product)
        {
            _context.Products.Add(product);
            await _context.SaveChangesAsync();
            return product;
        }

        public async Task<bool> DeleteAsync(Guid id)
        {
            var product = await _context.Products.FindAsync(id);
            if (product == null) return false;

            _context.Products.Remove(product);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<IEnumerable<Product>> GetAllAsync()
        {
            return await _context.Products.ToListAsync();
        }

        public async Task<Product> GetByIdAsync(Guid id)
        {
            return await _context.Products.FindAsync(id);
        }

        public async Task<Product> UpdateAsync(Product product)
        {
            _context.Products.Update(product);
            await _context.SaveChangesAsync();
            return product;
        }
    }
}
```

---

## 🧠 3. Application Layer

### `Services/ProductService.cs`

```csharp
using Domain.Entities;
using Domain.Interfaces;

namespace Application.Services
{
    public class ProductService
    {
        private readonly IProductRepository _repository;

        public ProductService(IProductRepository repository)
        {
            _repository = repository;
        }

        public Task<IEnumerable<Product>> GetAll() => _repository.GetAllAsync();
        public Task<Product> GetById(Guid id) => _repository.GetByIdAsync(id);
        public Task<Product> Create(Product product) => _repository.AddAsync(product);
        public Task<Product> Update(Product product) => _repository.UpdateAsync(product);
        public Task<bool> Delete(Guid id) => _repository.DeleteAsync(id);
    }
}
```

---

## 🌐 4. API Layer

### `Controllers/ProductController.cs`

```csharp
using Application.Services;
using Domain.Entities;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductController : ControllerBase
    {
        private readonly ProductService _service;

        public ProductController(ProductService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            return Ok(await _service.GetAll());
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(Guid id)
        {
            var product = await _service.GetById(id);
            return product == null ? NotFound() : Ok(product);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] Product product)
        {
            var created = await _service.Create(product);
            return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(Guid id, [FromBody] Product product)
        {
            if (id != product.Id) return BadRequest("ID mismatch");

            var updated = await _service.Update(product);
            return Ok(updated);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var success = await _service.Delete(id);
            return success ? NoContent() : NotFound();
        }
    }
}
```

---

## 🧪 5. Mock DbContext for Testing

### `Mocks/MockDbContext.cs`

```csharp
using Domain.Entities;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

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
```

---

## 🧩 Replicating for `Customer` and `Sale`

Just follow the same structure:

* Create corresponding `Entity`, `IRepository`, `Repository`, `Service`, and `Controller`.

---


