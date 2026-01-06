Below is a **clean, DDD-style .NET Web API** for a **Bookstore**, using **pure C#**, **no Entity Framework**, **in-memory persistence**, **DTO mapping**, **all HTTP verbs**, **broad HTTP status code usage**, **clean architecture**, plus **unit & integration testing guidance**.

I’ll give you:

1. **Architecture & project structure (DDD + Clean Architecture)**
2. **Domain layer (Entities, Value Objects, Aggregates)**
3. **Application layer (Use Cases, DTOs, Interfaces)**
4. **Infrastructure layer (In-Memory persistence)**
5. **API layer (Controllers + HTTP status codes)**
6. **Unit testing project**
7. **Integration testing explanation**

---

## 1. Architecture Overview (DDD + Clean Architecture)

```
BookStore.sln
│
├── BookStore.Domain
│   ├── Entities
│   ├── ValueObjects
│   ├── Aggregates
│   ├── Interfaces
│
├── BookStore.Application
│   ├── DTOs
│   ├── Interfaces
│   ├── UseCases
│   ├── Mappers
│
├── BookStore.Infrastructure
│   ├── Persistence
│   ├── Repositories
│
├── BookStore.API
│   ├── Controllers
│   ├── Program.cs
│
├── BookStore.Tests.Unit
│
└── BookStore.Tests.Integration
```

### Dependency Rule

```
API → Application → Domain
Infrastructure → Application → Domain
```

No layer depends **inward incorrectly**.

---

## 2. Domain Layer (Pure Business Logic)

### Entity (Aggregate Root)

```csharp
namespace BookStore.Domain.Entities;

public sealed class Book
{
    public Guid Id { get; }
    public string Title { get; private set; }
    public string Author { get; private set; }
    public decimal Price { get; private set; }
    public int Stock { get; private set; }

    public Book(Guid id, string title, string author, decimal price, int stock)
    {
        Id = id;
        ChangeTitle(title);
        ChangeAuthor(author);
        ChangePrice(price);
        ChangeStock(stock);
    }

    public void ChangeTitle(string title)
    {
        if (string.IsNullOrWhiteSpace(title))
            throw new ArgumentException("Title is required");
        Title = title;
    }

    public void ChangeAuthor(string author)
    {
        if (string.IsNullOrWhiteSpace(author))
            throw new ArgumentException("Author is required");
        Author = author;
    }

    public void ChangePrice(decimal price)
    {
        if (price < 0)
            throw new ArgumentException("Price cannot be negative");
        Price = price;
    }

    public void ChangeStock(int stock)
    {
        if (stock < 0)
            throw new ArgumentException("Stock cannot be negative");
        Stock = stock;
    }
}
```

---

## 3. Application Layer (Use Cases + DTOs)

### DTOs

```csharp
namespace BookStore.Application.DTOs;

public record BookDto(
    Guid Id,
    string Title,
    string Author,
    decimal Price,
    int Stock
);

public record CreateBookDto(
    string Title,
    string Author,
    decimal Price,
    int Stock
);
```

---

### Repository Contract (DDD)

```csharp
namespace BookStore.Application.Interfaces;

using BookStore.Domain.Entities;

public interface IBookRepository
{
    IEnumerable<Book> GetAll();
    Book? GetById(Guid id);
    void Add(Book book);
    void Update(Book book);
    void Remove(Guid id);
    bool Exists(Guid id);
}
```

---

### Use Case (Application Service)

```csharp
namespace BookStore.Application.UseCases;

using BookStore.Application.DTOs;
using BookStore.Application.Interfaces;
using BookStore.Domain.Entities;

public sealed class BookService
{
    private readonly IBookRepository _repository;

    public BookService(IBookRepository repository)
    {
        _repository = repository;
    }

    public IEnumerable<BookDto> GetAll()
        => _repository.GetAll().Select(Map);

    public BookDto GetById(Guid id)
    {
        var book = _repository.GetById(id)
            ?? throw new KeyNotFoundException();
        return Map(book);
    }

    public BookDto Create(CreateBookDto dto)
    {
        var book = new Book(
            Guid.NewGuid(),
            dto.Title,
            dto.Author,
            dto.Price,
            dto.Stock
        );

        _repository.Add(book);
        return Map(book);
    }

    public void Update(Guid id, CreateBookDto dto)
    {
        var book = _repository.GetById(id)
            ?? throw new KeyNotFoundException();

        book.ChangeTitle(dto.Title);
        book.ChangeAuthor(dto.Author);
        book.ChangePrice(dto.Price);
        book.ChangeStock(dto.Stock);

        _repository.Update(book);
    }

    public void Delete(Guid id)
    {
        if (!_repository.Exists(id))
            throw new KeyNotFoundException();

        _repository.Remove(id);
    }

    private static BookDto Map(Book book) =>
        new(book.Id, book.Title, book.Author, book.Price, book.Stock);
}
```

---

## 4. Infrastructure Layer (In-Memory Persistence)

### Best In-Memory Structure

Use **ConcurrentDictionary<Guid, Book>**

* Thread-safe
* Fast lookup
* Perfect for APIs

```csharp
namespace BookStore.Infrastructure.Persistence;

using BookStore.Application.Interfaces;
using BookStore.Domain.Entities;
using System.Collections.Concurrent;

public sealed class InMemoryBookRepository : IBookRepository
{
    private readonly ConcurrentDictionary<Guid, Book> _books = new();

    public IEnumerable<Book> GetAll() => _books.Values;

    public Book? GetById(Guid id)
        => _books.TryGetValue(id, out var book) ? book : null;

    public void Add(Book book)
        => _books[book.Id] = book;

    public void Update(Book book)
        => _books[book.Id] = book;

    public void Remove(Guid id)
        => _books.TryRemove(id, out _);

    public bool Exists(Guid id)
        => _books.ContainsKey(id);
}
```

---

## 5. API Layer (HTTP Verbs + Status Codes)

### Controller

```csharp
using BookStore.Application.DTOs;
using BookStore.Application.UseCases;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/books")]
public class BooksController : ControllerBase
{
    private readonly BookService _service;

    public BooksController(BookService service)
    {
        _service = service;
    }

    // GET → 200, 204
    [HttpGet]
    public IActionResult GetAll()
    {
        var books = _service.GetAll();
        if (!books.Any())
            return NoContent(); // 204
        return Ok(books); // 200
    }

    // GET/{id} → 200, 404
    [HttpGet("{id}")]
    public IActionResult Get(Guid id)
    {
        try
        {
            return Ok(_service.GetById(id));
        }
        catch (KeyNotFoundException)
        {
            return NotFound(); // 404
        }
    }

    // POST → 201, 400
    [HttpPost]
    public IActionResult Create(CreateBookDto dto)
    {
        var book = _service.Create(dto);
        return CreatedAtAction(nameof(Get), new { id = book.Id }, book); // 201
    }

    // PUT → 204, 404
    [HttpPut("{id}")]
    public IActionResult Update(Guid id, CreateBookDto dto)
    {
        try
        {
            _service.Update(id, dto);
            return NoContent(); // 204
        }
        catch (KeyNotFoundException)
        {
            return NotFound(); // 404
        }
    }

    // PATCH → 200
    [HttpPatch("{id}/price")]
    public IActionResult UpdatePrice(Guid id, [FromBody] decimal price)
    {
        var book = _service.GetById(id);
        _service.Update(id, new CreateBookDto(
            book.Title, book.Author, price, book.Stock));
        return Ok(); // 200
    }

    // DELETE → 204, 404
    [HttpDelete("{id}")]
    public IActionResult Delete(Guid id)
    {
        try
        {
            _service.Delete(id);
            return NoContent(); // 204
        }
        catch (KeyNotFoundException)
        {
            return NotFound(); // 404
        }
    }

    // OPTIONS → 200
    [HttpOptions]
    public IActionResult Options()
    {
        Response.Headers.Add("Allow", "GET,POST,PUT,PATCH,DELETE,OPTIONS,HEAD");
        return Ok();
    }

    // HEAD → 200
    [HttpHead]
    public IActionResult Head() => Ok();
}
```

### Common Status Codes Used

| Code | Meaning               |
| ---- | --------------------- |
| 200  | OK                    |
| 201  | Created               |
| 204  | No Content            |
| 400  | Bad Request           |
| 404  | Not Found             |
| 405  | Method Not Allowed    |
| 500  | Internal Server Error |

---

## 6. Unit Testing Project

### Unit Test Example (xUnit)

```csharp
using BookStore.Application.UseCases;
using BookStore.Infrastructure.Persistence;
using Xunit;

public class BookServiceTests
{
    [Fact]
    public void CreateBook_ShouldReturnBook()
    {
        var repo = new InMemoryBookRepository();
        var service = new BookService(repo);

        var book = service.Create(new(
            "DDD Book", "Eric Evans", 50, 10));

        Assert.NotNull(book);
        Assert.Equal("DDD Book", book.Title);
    }
}
```

### What You Unit Test

* Domain rules
* Use cases
* Validation
* Mapping logic

---

## 7. Integration Testing (How You Do It)

### Integration Test Setup

Use **WebApplicationFactory**:

```csharp
using Microsoft.AspNetCore.Mvc.Testing;
using System.Net;
using Xunit;

public class BooksApiTests :
    IClassFixture<WebApplicationFactory<Program>>
{
    private readonly HttpClient _client;

    public BooksApiTests(WebApplicationFactory<Program> factory)
    {
        _client = factory.CreateClient();
    }

    [Fact]
    public async Task GetBooks_Returns200()
    {
        var response = await _client.GetAsync("/api/books");
        Assert.True(
            response.StatusCode == HttpStatusCode.OK ||
            response.StatusCode == HttpStatusCode.NoContent
        );
    }
}
```

### Integration Tests Validate

* HTTP pipeline
* Controllers
* Serialization
* Dependency Injection
* Real in-memory persistence

---

## Key Benefits of This Architecture

✔ No ORM
✔ Fully testable
✔ Clean separation of concerns
✔ Pure DDD
✔ Production-ready structure
✔ Easy to swap persistence later

---

If you want, I can:

* Add **CQRS**
* Add **Domain Events**
* Add **Validation pipeline**
* Add **Swagger**
* Convert to **Minimal APIs**

```
Create a web API application that implements all HTTP verbs with all HTTPS status codes for a bookstore using the DDD design pattern, mapping all entities to DTO classes, creating a separation of layers such as the application layer, entity layer, and all the layers mentioned in DDD. This application should persist data in memory using the best data structure. I don't want to use Entity Framework, but I want to create a clean architecture using Architectural C#, focusing on clean code and using .NET C# technology. Also, include a unit testing project and explain how I would perform integration testing.
```