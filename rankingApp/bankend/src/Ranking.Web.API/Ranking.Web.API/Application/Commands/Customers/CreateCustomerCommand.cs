using MediatR;

namespace Ranking.Web.API.Application.Commands.Customers
{
    public sealed class CreateCustomerCommand : IRequest<Guid>
    {
        public string Name { get; set; }
        public string Email { get; set; }
    }
}
