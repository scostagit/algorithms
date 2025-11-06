
using Polly;
using Polly.Extensions.Http;

namespace Ranking.Web.API.Policies
{
    //Polly Policies
    // Configure a resilience policy using Polly
    public static class PollyPolicies
    {
        /// <summary>
        /// Retry policy with exponential backoff for transient HTTP errors.
        /// </summary>
        public static IAsyncPolicy<HttpResponseMessage> GetRetryPolicy()
        {
            return HttpPolicyExtensions
                .HandleTransientHttpError()
                .OrResult(msg => !msg.IsSuccessStatusCode)
                .WaitAndRetryAsync(
                    retryCount: 3,
                    sleepDurationProvider: attempt => TimeSpan.FromSeconds(Math.Pow(2, attempt)),
                    onRetry: (outcome, timespan, retryAttempt, context) =>
                    {
                        Console.WriteLine($"[RetryPolicy] Attempt {retryAttempt}: Retrying after {timespan.TotalSeconds}s due to {outcome.Result?.StatusCode}");
                    });
        }

        /// <summary>
        /// Circuit breaker policy to stop requests after repeated failures.
        /// </summary>
        public static IAsyncPolicy<HttpResponseMessage> GetCircuitBreakerPolicy()
        {
            return HttpPolicyExtensions
                .HandleTransientHttpError()
                .CircuitBreakerAsync(
                    handledEventsAllowedBeforeBreaking: 3,
                    durationOfBreak: TimeSpan.FromSeconds(15),
                    onBreak: (result, timespan) =>
                    {
                        Console.WriteLine($"[CircuitBreaker] Circuit opened for {timespan.TotalSeconds}s due to: {result.Exception?.Message ?? result.Result?.ReasonPhrase}");
                    },
                    onReset: () => Console.WriteLine("[CircuitBreaker] Circuit closed. Operations normal."),
                    onHalfOpen: () => Console.WriteLine("[CircuitBreaker] Circuit half-open. Testing API health...")
                );
        }
    }
}
