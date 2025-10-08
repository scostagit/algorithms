using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ViewFeatures;
using System.Collections.Concurrent;

namespace Ranking.Web.API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WeatherForecastController : ControllerBase
    {
        private static readonly string[] Summaries =
        [
            "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        ];

        [HttpGet(Name = "GetWeatherForecast")]
        public IActionResult Get()
        {
            if (RateLimiter.IsLocked("GetWeatherForecast"))
                return StatusCode(429, "Too many requests");

            var result = Enumerable.Range(1, 5).Select(index => new WeatherForecast
            {
                Date = DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
                TemperatureC = Random.Shared.Next(-20, 55),
                Summary = Summaries[Random.Shared.Next(Summaries.Length)]
            })
            .ToArray();

            return Ok(result);
        }
    }


    static class RateLimiter
    {
        const int MAX_REQUEST_PER_SECOND = 2;

        static ConcurrentDictionary<string, List<DateTime>> _requests = new ();

        public static bool IsLocked(string endpoint)
        {
            var newRequest = _requests.GetOrAdd(endpoint, new List<DateTime>());
            var now = DateTime.UtcNow;

            newRequest.RemoveAll(x => (now -x).TotalMilliseconds >= 60000);

            if (newRequest.Count >= MAX_REQUEST_PER_SECOND) 
                return true;

            newRequest.Add(now);
            return false;
        }

    }
}
