using MediatR;
using Ranking.Web.API.Domain.Entities;
using Ranking.Web.API.Domain.Interfaces;

namespace Ranking.Web.API.Application.Queries.Customers
{
    public class GetCustomerByIdQueryHandler : IRequestHandler<GetCustomerByIdQuery, Customer>
    {
        private readonly ICustomerRepository _repository;

        public GetCustomerByIdQueryHandler(ICustomerRepository repository)
        {
            _repository = repository;
        }

        public async Task<Customer> Handle(GetCustomerByIdQuery request, CancellationToken cancellationToken)
        {
            var customer = await _repository.GetByIdAsync(request.Id);
            //if (customer == null)
            //{
            //    throw new KeyNotFoundException($"Customer with ID {request.Id} not found.");
            //}

            return customer;
        }
    }
}
