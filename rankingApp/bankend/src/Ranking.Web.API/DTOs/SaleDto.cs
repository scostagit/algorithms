
namespace Ranking.Web.API.DTOs
{
    public class SaleDto
    {
        public Guid Id { get; set; }
        public Guid CustomerId { get; set; }
        public string CustomerName { get; set; }
        public DateTime SaleDate { get; set; }
        public decimal TotalAmount { get; set; }
        public List<SaleItemDto> Items { get; set; } = new();
    }
}
