

\# 🧠 What is Dapper?



\*\*Dapper\*\* is a lightweight, high-performance \*\*micro-ORM (Object Relational Mapper)\*\* developed by Stack Overflow.

It helps you map database rows to C# objects \*\*without the heavy overhead\*\* of a full ORM like Entity Framework.



✅ \*\*Key benefits:\*\*



\* Super fast (close to raw ADO.NET performance)

\* Simple API

\* Easy to integrate into any project

\* Works with \*\*SQL Server\*\*, \*\*MySQL\*\*, \*\*PostgreSQL\*\*, and more.



---



\##⚙️ Installing Dapper



You can install it via \*\*NuGet\*\*:



```bash

dotnet add package Dapper

```



Or, from \*\*Visual Studio Package Manager Console\*\*:



```bash

Install-Package Dapper

```



---



\## 🧩 Example: Using Dapper in a .NET Core Web API



We’ll build a small API that manages \*\*“Products”\*\* stored in a SQL Server database.



---



\### 1. Project Setup



Create a new Web API project:



```bash

dotnet new webapi -n DapperDemoAPI

cd DapperDemoAPI

```



---



\### 2. Create the Database and Table



Run this SQL script in your SQL Server:



```sql

CREATE DATABASE DapperDemo;

GO



USE DapperDemo;

GO



CREATE TABLE Products (

&nbsp;   Id INT IDENTITY(1,1) PRIMARY KEY,

&nbsp;   Name NVARCHAR(100),

&nbsp;   Price DECIMAL(10,2)

);

```



---



\### 3. Configure the Connection String



In `appsettings.json`, add your connection string:



```json

{

&nbsp; "ConnectionStrings": {

&nbsp;   "DefaultConnection": "Server=localhost;Database=DapperDemo;Trusted\_Connection=True;TrustServerCertificate=True;"

&nbsp; }

}

```



---



\### 4. Create a Model



`Models/Product.cs`:



```csharp

namespace DapperDemoAPI.Models

{

&nbsp;   public class Product

&nbsp;   {

&nbsp;       public int Id { get; set; }

&nbsp;       public string Name { get; set; } = string.Empty;

&nbsp;       public decimal Price { get; set; }

&nbsp;   }

}

```



---



\### 5. Create a Repository Using Dapper



`Repositories/ProductRepository.cs`:



```csharp

using Dapper;

using System.Data;

using System.Data.SqlClient;

using DapperDemoAPI.Models;



namespace DapperDemoAPI.Repositories

{

&nbsp;   public class ProductRepository

&nbsp;   {

&nbsp;       private readonly string \_connectionString;



&nbsp;       public ProductRepository(IConfiguration configuration)

&nbsp;       {

&nbsp;           \_connectionString = configuration.GetConnectionString("DefaultConnection");

&nbsp;       }



&nbsp;       private IDbConnection Connection => new SqlConnection(\_connectionString);



&nbsp;       public async Task<IEnumerable<Product>> GetAllAsync()

&nbsp;       {

&nbsp;           using var db = Connection;

&nbsp;           var sql = "SELECT \* FROM Products";

&nbsp;           return await db.QueryAsync<Product>(sql);

&nbsp;       }



&nbsp;       public async Task<Product?> GetByIdAsync(int id)

&nbsp;       {

&nbsp;           using var db = Connection;

&nbsp;           var sql = "SELECT \* FROM Products WHERE Id = @Id";

&nbsp;           return await db.QueryFirstOrDefaultAsync<Product>(sql, new { Id = id });

&nbsp;       }



&nbsp;       public async Task<int> CreateAsync(Product product)

&nbsp;       {

&nbsp;           using var db = Connection;

&nbsp;           var sql = "INSERT INTO Products (Name, Price) VALUES (@Name, @Price)";

&nbsp;           return await db.ExecuteAsync(sql, product);

&nbsp;       }



&nbsp;       public async Task<int> UpdateAsync(Product product)

&nbsp;       {

&nbsp;           using var db = Connection;

&nbsp;           var sql = "UPDATE Products SET Name = @Name, Price = @Price WHERE Id = @Id";

&nbsp;           return await db.ExecuteAsync(sql, product);

&nbsp;       }



&nbsp;       public async Task<int> DeleteAsync(int id)

&nbsp;       {

&nbsp;           using var db = Connection;

&nbsp;           var sql = "DELETE FROM Products WHERE Id = @Id";

&nbsp;           return await db.ExecuteAsync(sql, new { Id = id });

&nbsp;       }

&nbsp;   }

}

```



---



\### 6. Create the Controller



`Controllers/ProductController.cs`:



```csharp

using Microsoft.AspNetCore.Mvc;

using DapperDemoAPI.Models;

using DapperDemoAPI.Repositories;



namespace DapperDemoAPI.Controllers

{

&nbsp;   \[Route("api/\[controller]")]

&nbsp;   \[ApiController]

&nbsp;   public class ProductController : ControllerBase

&nbsp;   {

&nbsp;       private readonly ProductRepository \_repo;



&nbsp;       public ProductController(ProductRepository repo)

&nbsp;       {

&nbsp;           \_repo = repo;

&nbsp;       }



&nbsp;       \[HttpGet]

&nbsp;       public async Task<IActionResult> GetAll()

&nbsp;       {

&nbsp;           var products = await \_repo.GetAllAsync();

&nbsp;           return Ok(products);

&nbsp;       }



&nbsp;       \[HttpGet("{id}")]

&nbsp;       public async Task<IActionResult> GetById(int id)

&nbsp;       {

&nbsp;           var product = await \_repo.GetByIdAsync(id);

&nbsp;           if (product == null) return NotFound();

&nbsp;           return Ok(product);

&nbsp;       }



&nbsp;       \[HttpPost]

&nbsp;       public async Task<IActionResult> Create(Product product)

&nbsp;       {

&nbsp;           await \_repo.CreateAsync(product);

&nbsp;           return Ok("Product created");

&nbsp;       }



&nbsp;       \[HttpPut("{id}")]

&nbsp;       public async Task<IActionResult> Update(int id, Product product)

&nbsp;       {

&nbsp;           product.Id = id;

&nbsp;           await \_repo.UpdateAsync(product);

&nbsp;           return Ok("Product updated");

&nbsp;       }



&nbsp;       \[HttpDelete("{id}")]

&nbsp;       public async Task<IActionResult> Delete(int id)

&nbsp;       {

&nbsp;           await \_repo.DeleteAsync(id);

&nbsp;           return Ok("Product deleted");

&nbsp;       }

&nbsp;   }

}

```



---



\### 7. Register the Repository in `Program.cs`



```csharp

var builder = WebApplication.CreateBuilder(args);



builder.Services.AddControllers();

builder.Services.AddScoped<ProductRepository>();



var app = builder.Build();



app.MapControllers();

app.Run();

```



---



\## 🧪 Test the API



Run the app:



```bash

dotnet run

```



Then test the endpoints (using \*\*Postman\*\*, \*\*cURL\*\*, or \*\*Swagger UI\*\*):



| Method | Endpoint            | Description        |

| ------ | ------------------- | ------------------ |

| GET    | `/api/product`      | Get all products   |

| GET    | `/api/product/{id}` | Get one product    |

| POST   | `/api/product`      | Create new product |

| PUT    | `/api/product/{id}` | Update a product   |

| DELETE | `/api/product/{id}` | Delete a product   |



---



\## 🚀 Summary



\* \*\*Dapper\*\* is a great choice when you need \*\*speed and simplicity\*\*.

\* It’s best suited for projects where you want more control over SQL.

\* Integrating it into a .NET Core Web API is straightforward and lightweight.





