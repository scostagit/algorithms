﻿using Ranking.Web.API.Domain.Entities;

namespace Ranking.Web.API.Domain.Interfaces
{
    public interface IProductRepository
    {
        Task<IEnumerable<Product>> GetAllAsync();
        Task<Product> GetByIdAsync(Guid id);
        Task<Product> AddAsync(Product product);
        Task<Product> UpdateAsync(Product product);
        Task<bool> DeleteAsync(Guid id);
    }
}
                             