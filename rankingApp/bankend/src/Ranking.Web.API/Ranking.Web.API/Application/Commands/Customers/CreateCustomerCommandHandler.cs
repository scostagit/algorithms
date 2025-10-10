using MediatR;
using Ranking.Web.API.Domain.Entities;
using Ranking.Web.API.Domain.Interfaces;

namespace Ranking.Web.API.Application.Commands.Customers
{
    public sealed class CreateCustomerCommandHandler : IRequestHandler<CreateCustomerCommand, Guid>
    {
        private readonly ICustomerRepository _repository;
        private readonly IMessageBus _messageBus;

        public CreateCustomerCommandHandler(ICustomerRepository repository, IMessageBus messageBus)
        {
            _repository = repository;
            _messageBus = messageBus;
        }

        public async Task<Guid> Handle(CreateCustomerCommand request, CancellationToken cancellationToken)
        {
            var customer = new Customer(request.Name, request.Email);
            await _repository.AddAsync(customer);

            // Send message to RabbitMQ
            //await _messageBus.PublishAsync(customer, "customer_created");

            return customer.Id;
        }
    }
}



