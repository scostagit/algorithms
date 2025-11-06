
using MediatR;
using Microsoft.EntityFrameworkCore;
using Ranking.Web.API.Domain.Entities;
using Ranking.Web.API.Infrastructure.Data;

namespace Ranking.Web.API.Application.Commands.Sales
{
    public class AddSaleCommandHandler : IRequestHandler<AddSaleCommand, Guid>
    {
        private readonly AppDbContext _context;

        public AddSaleCommandHandler(AppDbContext context)
        {
            _context = context;
        }

        public async Task<Guid> Handle(AddSaleCommand request, CancellationToken cancellationToken)
        {
            var customer = await _context.Customers
                .FirstOrDefaultAsync(c => c.Id == request.CustomerId, cancellationToken);

            if (customer == null)
                throw new KeyNotFoundException($"Customer with ID {request.CustomerId} not found.");

            var sale = new Sale(customer);

            foreach (var item in request.Items)
            {
                var product = await _context.Products
                    .FirstOrDefaultAsync(p => p.Id == item.ProductId, cancellationToken);

                if (product == null)
                    throw new KeyNotFoundException($"Product with ID {item.ProductId} not found.");

                sale.AddItem(product, item.Quantity);
            }

            _context.Sales.Add(sale);
            await _context.SaveChangesAsync(cancellationToken);

            return sale.Id;
        }
    }
}
