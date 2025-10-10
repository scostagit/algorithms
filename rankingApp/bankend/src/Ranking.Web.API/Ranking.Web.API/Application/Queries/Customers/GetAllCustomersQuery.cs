using MediatR;
using Ranking.Web.API.Domain.Entities;

namespace Ranking.Web.API.Application.Queries.Customers
{
    public class GetAllCustomersQuery : IRequest<IEnumerable<Customer>>
    {
    }
}
