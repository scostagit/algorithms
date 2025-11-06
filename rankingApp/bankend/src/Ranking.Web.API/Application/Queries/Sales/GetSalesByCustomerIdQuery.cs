using Dapper;
using MediatR;
using Ranking.Web.API.Domain.Entities;
using Ranking.Web.API.DTOs;
using Ranking.Web.API.Extensions.Mappings;
using System.Data;
using System.Data.SqlClient;

namespace Ranking.Web.API.Application.Queries.Sales
{
    /*
     Defines a MediatR query.

        - It takes a CustomerId as input and expects a list of SaleDto as output.

        - Using record gives us immutable data automatically.
     */
    public record GetSalesByCustomerIdQuery(Guid CustomerId) : IRequest<List<SaleDto>>;

    public class GetSalesByCustomerIdQueryHandler : IRequestHandler<GetSalesByCustomerIdQuery, List<SaleDto>>
    {
        private readonly string _connectionString;

        public GetSalesByCustomerIdQueryHandler(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("DefaultConnection");
        }

        private IDbConnection Connection => new SqlConnection(_connectionString);

        public async Task<List<SaleDto>> Handle(GetSalesByCustomerIdQuery request, CancellationToken cancellationToken)
        {
            using var db = Connection;

            var sql = @"
                SELECT 
                    s.Id AS SaleId, s.CustomerId, s.SaleDate,

                    c.Id AS CustomerId, c.Name AS CustomerName, c.Email AS CustomerEmail,

                    i.Id AS ItemId, i.ProductId, i.Quantity, i.UnitPrice,

                    p.Id AS ProductId, p.Name AS ProductName, p.Price AS ProductPrice

                FROM Sales s
                INNER JOIN Customers c ON s.CustomerId = c.Id
                INNER JOIN SaleItems i ON i.SaleId = s.Id
                INNER JOIN Products p ON i.ProductId = p.Id
                WHERE s.CustomerId = @CustomerId
                ORDER BY s.SaleDate DESC;
            ";

            var saleDictionary = new Dictionary<Guid, Sale>();

            var result = await db.QueryAsync<Sale, Customer, SaleItem, Product, Sale>(
                sql,
                (sale, customer, item, product) =>
                {
                    // Ensure we get the same sale object reused
                    // Checks if this Sale has already been added to the dictionary(because each Sale may appear in multiple rows due to multiple items).
                    if (!saleDictionary.TryGetValue(sale.Id, out var saleEntry))
                    {
                        /* 
                        
                        Use reflection since the domain model has private setters and a private list

                        Creates a new Sale instance using reflection, because the constructor is private.

                        nonPublic: true allows creating objects with private constructors.
                        */

                        saleEntry = (Sale)Activator.CreateInstance(
                            typeof(Sale),
                            nonPublic: true
                        )!;

                        /*
                            Populate Sale properties using reflection, since they have private setters.

                            Sets CustomerId, SaleDate, and Custome
                         */

                        typeof(Sale)
                            .GetProperty(nameof(Sale.CustomerId))!
                            .SetValue(saleEntry, sale.CustomerId);

                        typeof(Sale)
                            .GetProperty(nameof(Sale.SaleDate))!
                            .SetValue(saleEntry, sale.SaleDate);

                        typeof(Sale)
                            .GetProperty(nameof(Sale.Customer))!
                            .SetValue(saleEntry, customer);

                        saleDictionary.Add(saleEntry.Id, saleEntry);
                    }

                    // Map Product inside SaleItem
                    typeof(SaleItem)
                        .GetProperty(nameof(SaleItem.Product))!
                        .SetValue(item, product);

                    // Add the item into the private _items field
                    var itemsField = typeof(Sale)
                        .GetField("_items", System.Reflection.BindingFlags.NonPublic | System.Reflection.BindingFlags.Instance); //Sets the Product of the SaleItem using reflection. due the private constructor

                    var itemsList = (List<SaleItem>)itemsField!.GetValue(saleEntry)!;
                    itemsList.Add(item);

                    return saleEntry;
                },
                new { request.CustomerId },
                splitOn: "CustomerId,ItemId,ProductId"
            );

            var sales = saleDictionary.Values.ToList();

            return sales.Select(s => s.ToDto()).ToList();
        }
    }
}



/*
using MediatR;
using Microsoft.EntityFrameworkCore;
using Ranking.Web.API.DTOs;
using Ranking.Web.API.Extensions.Mappings;
using Ranking.Web.API.Infrastructure.Data;

namespace Ranking.Web.API.Application.Queries.Sales
{
    public record GetSalesByCustomerIdQuery(Guid CustomerId) : IRequest<List<SaleDto>>;

    public class GetSalesByCustomerIdQueryHandler : IRequestHandler<GetSalesByCustomerIdQuery, List<SaleDto>>
    {
        private readonly AppDbContext _context;

        public GetSalesByCustomerIdQueryHandler(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<SaleDto>> Handle(GetSalesByCustomerIdQuery request, CancellationToken cancellationToken)
        {
            var sales = await _context.Sales
                .Include(s => s.Customer)
                .Include(s => s.Items)
                .ThenInclude(i => i.Product)
                .Where(s => s.CustomerId == request.CustomerId)
                .OrderByDescending(s => s.SaleDate)
                .ToListAsync(cancellationToken);

            return sales.Select(s => s.ToDto()).ToList();
        }
    }
}
*/