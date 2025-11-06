
using MediatR;

namespace Ranking.Web.API.Application.Commands.Sales
{
    public record AddSaleItemDto(Guid ProductId, int Quantity);

    public record AddSaleCommand(Guid CustomerId, List<AddSaleItemDto> Items) : IRequest<Guid>;    
}
