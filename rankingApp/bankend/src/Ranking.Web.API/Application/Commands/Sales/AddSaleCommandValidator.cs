using FluentValidation;

namespace Ranking.Web.API.Application.Commands.Sales
{
    public sealed class AddSaleCommandValidator : AbstractValidator<AddSaleCommand>
    {
        public AddSaleCommandValidator()
        {
            RuleFor(x => x.CustomerId)
                .NotEmpty().WithMessage("CustomerId is required.");

            RuleFor(x => x.Items)
                .NotNull().WithMessage("Items cannot be null.")
                .NotEmpty().WithMessage("At least one sale item is required.");

            RuleForEach(x => x.Items)
                .SetValidator(new AddSaleItemDtoValidator());
        }
    }
   
    public sealed class AddSaleItemDtoValidator : AbstractValidator<AddSaleItemDto>
    {
        public AddSaleItemDtoValidator()
        {
            RuleFor(x => x.ProductId)
                .NotEmpty().WithMessage("ProductId is required.");

            RuleFor(x => x.Quantity)
                .GreaterThan(0).WithMessage("Quantity must be greater than zero.");
           
        }
    }
}
