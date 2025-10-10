using FluentValidation;

namespace Ranking.Web.API.Application.Queries.Customers
{
    public class GetAllCustomersQueryValidator : AbstractValidator<GetAllCustomersQuery>
    {
        public GetAllCustomersQueryValidator()
        {
            // No rules needed unless you add parameters
        }
    }

}
