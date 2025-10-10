using MediatR;
using Ranking.Web.API.Domain.Entities;

namespace Ranking.Web.API.Application.Queries.Customers
{
    public class GetCustomerByIdQuery : IRequest<Customer>
    {
        public Guid Id { get; }

        public GetCustomerByIdQuery(Guid id)
        {
            Id = id;
        }
    }

}
