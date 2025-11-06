using Microsoft.AspNetCore.Mvc;
using Ranking.Web.API.Infrastructure.Apis;

namespace Ranking.Web.API.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    public class HelloController : ControllerBase
    {
        private readonly IRestfulApi _client;

        public HelloController(IRestfulApi client)
        {
            _client = client;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var result = await _client.GetAllAsync();
            return Ok(result);
        }

        [HttpGet("{name}")]
        public async Task<IActionResult> GetByName(string name)
        {
            var result = await _client.GetByNameAsync(name);
            return Ok(result);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] object data)
        {
            var result = await _client.CreateAsync(data);
            return Ok(result);
        }

        [HttpPut("{name}")]
        public async Task<IActionResult> Update(string name, [FromBody] object data)
        {
            var result = await _client.UpdateAsync(name, data);
            return Ok(result);
        }
    }
}
