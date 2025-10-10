using FluentValidation;

namespace Ranking.Web.API.Application.Queries.Customers
{
    public sealed class GetCustomerByIdQueryValidator : AbstractValidator<GetCustomerByIdQuery>
    {
        public GetCustomerByIdQueryValidator()
        {
            RuleFor(x => x.Id)
                .NotEmpty().WithMessage("Customer ID must not be empty.");
        }
    }
}

