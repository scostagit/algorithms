using Ranking.Web.API.Domain.Entities;

namespace Ranking.Web.API.Domain.Interfaces
{
    public interface ICustomerRepository
    {
        Task<IEnumerable<Customer>> GetAllAsync();
        Task<Customer> GetByIdAsync(Guid id);
        Task<Customer> AddAsync(Customer product);
    }
}
