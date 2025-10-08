using Ranking.Web.API.Domain.Entities.Domain.Entities;
using Ranking.Web.API.Domain.Interfaces;

namespace Ranking.Web.API.Application.Services
{
    public sealed class ProductService
    {
        private readonly IProductRepository _repository;

        public ProductService(IProductRepository repository)
        {
            _repository = repository;
        }

        public Task<IEnumerable<Product>> GetAll() => _repository.GetAllAsync();
        public Task<Product> GetById(Guid id) => _repository.GetByIdAsync(id);
        public Task<Product> Create(Product product) => _repository.AddAsync(product);
        public Task<Product> Update(Product product) => _repository.UpdateAsync(product);
        public Task<bool> Delete(Guid id) => _repository.DeleteAsync(id);
    }
}
