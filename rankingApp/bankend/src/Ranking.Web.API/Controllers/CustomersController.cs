using MediatR;
using Microsoft.AspNetCore.Mvc;
using Ranking.Web.API.Application.Commands.Customers;
using Ranking.Web.API.Application.Queries.Customers;

namespace Ranking.Web.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CustomersController : ControllerBase
    {
        private readonly IMediator _mediator;

        public CustomersController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpPost]
        public async Task<IActionResult> Create(CreateCustomerCommand command)
        {
            var customerId = await _mediator.Send(command);
            return Ok(new { Id = customerId });
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var customers = await _mediator.Send(new GetAllCustomersQuery());
            return Ok(customers);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(Guid id)
        {
            var customer = await _mediator.Send(new GetCustomerByIdQuery(id));

            if (customer == null)
                return NotFound(new { message = $"Customer with ID `{id}` not found." });

            return Ok(customer);
        }
    }
}
