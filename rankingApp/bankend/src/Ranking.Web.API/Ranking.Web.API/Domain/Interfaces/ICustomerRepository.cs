using Ranking.Web.API.Domain.Entities;

namespace Ranking.Web.API.Domain.Interfaces
{
    public interface ICustomerRepository
    {
        Task AddAsync(Customer customer);
        Task<Customer> GetByIdAsync(Guid id);
    }
}
