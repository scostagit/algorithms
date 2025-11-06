using Refit;

namespace Ranking.Web.API.Infrastructure.Apis
{
    public interface IRestfulApi
    {
        // Get all objects
        [Get("/objects")]
        Task<IEnumerable<dynamic>> GetAllAsync();

        // Get object by name/id
        [Get("/objects/{name}")]
        Task<dynamic> GetByNameAsync(string name);

        // Create a new object
        [Post("/objects")]
        Task<dynamic> CreateAsync([Body] object data);

        // Update an existing object
        [Put("/objects/{name}")]
        Task<dynamic> UpdateAsync(string name, [Body] object data);
    }
}
