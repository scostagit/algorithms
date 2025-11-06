using Ranking.Web.API.Domain.Entities.Base;

namespace Ranking.Web.API.Domain.Entities
{
    public sealed class Sale : Entity
    {
        // Relations
        public Guid CustomerId { get; private set; }
        public Customer Customer { get; private set; }

        private readonly List<SaleItem> _items = new();
        public IReadOnlyCollection<SaleItem> Items => _items.AsReadOnly();

        public DateTime SaleDate { get; private set; }
        public decimal TotalAmount => _items.Sum(i => i.Total);

        private Sale() { } // For EF or serialization

        public Sale(Customer customer)
        {
            Customer = customer ?? throw new ArgumentNullException(nameof(customer));
            CustomerId = customer.Id;
            SaleDate = DateTime.UtcNow;
        }

        public void AddItem(Product product, int quantity)
        {
            if (product == null) throw new ArgumentNullException(nameof(product));
            if (quantity <= 0) throw new ArgumentOutOfRangeException(nameof(quantity), "Quantity must be greater than zero.");

            var existingItem = _items.FirstOrDefault(i => i.ProductId == product.Id);
            if (existingItem != null)
            {
                existingItem.IncreaseQuantity(quantity);
            }
            else
            {
                _items.Add(new SaleItem(product, quantity));
            }
        }
    }

    public sealed class SaleItem : Entity
    {
        public Guid ProductId { get; private set; }
        public Product Product { get; private set; }

        public int Quantity { get; private set; }
        public decimal UnitPrice { get; private set; }
        public decimal Total => UnitPrice * Quantity;

        private SaleItem() { }

        public SaleItem(Product product, int quantity)
        {
            Product = product ?? throw new ArgumentNullException(nameof(product));
            ProductId = product.Id;
            Quantity = quantity > 0 ? quantity : throw new ArgumentOutOfRangeException(nameof(quantity));
            UnitPrice = product.Price;
        }

        public void IncreaseQuantity(int amount)
        {
            if (amount <= 0) throw new ArgumentOutOfRangeException(nameof(amount));
            Quantity += amount;
        }
    }
}
