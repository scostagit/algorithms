using MediatR;
using Microsoft.AspNetCore.Mvc;
using Ranking.Web.API.Application.Commands.Sales;
using Ranking.Web.API.Application.Queries.Sales;

namespace Ranking.Web.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SalesController : ControllerBase
    {
        private readonly IMediator _mediator;

        public SalesController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpPost]
        public async Task<IActionResult> CreateSale([FromBody] AddSaleCommand command)
        {
            var saleId = await _mediator.Send(command);
            return CreatedAtAction(nameof(GetSalesByCustomer), new { customerId = command.CustomerId }, new { SaleId = saleId });
        }

        [HttpGet("customer/{customerId}")]
        public async Task<IActionResult> GetSalesByCustomer(Guid customerId)
        {
            var result = await _mediator.Send(new GetSalesByCustomerIdQuery(customerId));
            return Ok(result);
        }

        [HttpGet("product/{productId}")]
        public async Task<IActionResult> GetSalesByProduct(Guid productId)
        {
            var result = await _mediator.Send(new GetSalesByProductIdQuery(productId));
            return Ok(result);
        }
    }
}
