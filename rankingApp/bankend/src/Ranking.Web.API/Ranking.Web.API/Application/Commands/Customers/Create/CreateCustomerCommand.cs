using MediatR;

namespace Ranking.Web.API.Application.Commands.Customers.Create
{
    public sealed class CreateCustomerCommand : IRequest<Guid>
    {
        public string Name { get; set; }
        public string Email { get; set; }
    }
}
