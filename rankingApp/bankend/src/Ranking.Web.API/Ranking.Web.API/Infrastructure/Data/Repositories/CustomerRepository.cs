using Ranking.Web.API.Domain.Entities;
using Ranking.Web.API.Domain.Interfaces;

namespace Ranking.Web.API.Infrastructure.Data.Repositories
{
    public class CustomerRepository : ICustomerRepository
    {
        // In-memory for simplicity
        private static readonly List<Customer> _customers = new();

        public Task AddAsync(Customer customer)
        {
            _customers.Add(customer);
            return Task.CompletedTask;
        }

        public Task<Customer> GetByIdAsync(Guid id)
        {
            return Task.FromResult(_customers.FirstOrDefault(c => c.Id == id));
        }
    }
}
