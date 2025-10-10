using Ranking.Web.API.Domain.Entities.Base;

namespace Ranking.Web.API.Domain.Entities
{
    public sealed class Product : Entity
    {     
        public string Name { get; set; }
        public decimal Price { get; set; }
    }

}
