namespace Ranking.Web.API.Domain.Entities
{
    namespace Domain.Entities
    {
        public sealed class Product
        {
            public Guid Id { get; set; } = Guid.NewGuid();
            public string Name { get; set; }
            public decimal Price { get; set; }
        }
    }

}
