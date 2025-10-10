using Ranking.Web.API.Domain.Entities.Base;

namespace Ranking.Web.API.Domain.Entities
{
    public class Customer : Entity
    {       
        public string Name { get; private set; }
        public string Email { get; private set; }

        private Customer() { }
        public Customer(string name, string email)
        {
            Name = name;
            Email = email;
        }
    }
}
