using Ranking.Web.API.Domain.Entities;
using Ranking.Web.API.DTOs;

namespace Ranking.Web.API.Extensions.Mappings
{
    public static class SaleMappingExtensions
    {
        public static SaleDto ToDto(this Sale sale)
        {
            return new SaleDto
            {
                Id = sale.Id,
                CustomerId = sale.CustomerId,
                CustomerName = sale.Customer?.Name ?? string.Empty,
                SaleDate = sale.SaleDate,
                TotalAmount = sale.TotalAmount,
                Items = sale.Items.Select(i => i.ToDto()).ToList()
            };
        }

        public static SaleItemDto ToDto(this SaleItem item)
        {
            return new SaleItemDto
            {
                ProductId = item.ProductId,
                ProductName = item.Product?.Name ?? string.Empty,
                UnitPrice = item.UnitPrice,
                Quantity = item.Quantity,
                Total = item.Total
            };
        }
    }
}
