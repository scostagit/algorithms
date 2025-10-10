using MediatR;
using Microsoft.AspNetCore.Mvc;
using Ranking.Web.API.Application.Commands.Customers.Create;

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
    }
}
