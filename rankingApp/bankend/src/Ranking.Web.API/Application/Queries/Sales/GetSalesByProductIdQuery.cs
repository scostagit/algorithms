using MediatR;
using Microsoft.EntityFrameworkCore;
using Ranking.Web.API.DTOs;
using Ranking.Web.API.Extensions.Mappings;
using Ranking.Web.API.Infrastructure.Data;

namespace Ranking.Web.API.Application.Queries.Sales
{
    public record GetSalesByProductIdQuery(Guid ProductId) : IRequest<List<SaleDto>>;

    public class GetSalesByProductIdQueryHandler : IRequestHandler<GetSalesByProductIdQuery, List<SaleDto>>
    {
        private readonly AppDbContext _context;

        public GetSalesByProductIdQueryHandler(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<SaleDto>> Handle(GetSalesByProductIdQuery request, CancellationToken cancellationToken)
        {
            var sales = await _context.Sales
                .Include(s => s.Customer)
                .Include(s => s.Items)
                .ThenInclude(i => i.Product)
                .Where(s => s.Items.Any(i => i.ProductId == request.ProductId))
                .OrderByDescending(s => s.SaleDate)
                .ToListAsync(cancellationToken);

            return sales.Select(s => s.ToDto()).ToList();
        }
    }
}
