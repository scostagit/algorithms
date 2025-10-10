using Microsoft.EntityFrameworkCore;
using Ranking.Web.API.Domain.Entities;
using Ranking.Web.API.Domain.Interfaces;

namespace Ranking.Web.API.Infrastructure.Data.Repositories
{
    public class CustomerRepository : ICustomerRepository
    {

        private readonly AppDbContext _context;

        public CustomerRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<Customer> AddAsync(Customer customer)
        {  
            _context.Customers.Add(customer);
            await _context.SaveChangesAsync();
            return customer;
        }

        public Task<Customer> GetByIdAsync(Guid id)
        {
            return Task.FromResult(_context.Customers.FirstOrDefault(c => c.Id == id));
        }

        public async Task<IEnumerable<Customer>> GetAllAsync()
        {
            return await _context.Customers.ToListAsync();
        }
    }
}
