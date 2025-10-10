using Xunit;
using Moq;
using Ranking.Web.API.Domain.Interfaces;
using Ranking.Web.API.Application.Commands.Customers;
using Ranking.Web.API.Domain.Entities;

namespace Ranking.UnitTests.Application.Commands.Customers
{
    public class CreateCustomerCommandHandlerTests
    {
        [Fact]
        public async Task Handle_ShouldAddCustomerAndReturnId()
        {
            // Arrange
            var mockRepository = new Mock<ICustomerRepository>();
            var mockMessageBus = new Mock<IMessageBus>();

            var handler = new CreateCustomerCommandHandler(mockRepository.Object, mockMessageBus.Object);

            var command = new CreateCustomerCommand
            {
                Name = "John Doe",
                Email = "john@example.com"
            };

            var expectedCustomer = new Customer("John Doe", "john@example.com");

            mockRepository
                .Setup(r => r.AddAsync(It.IsAny<Customer>()))
                .ReturnsAsync(expectedCustomer); 

            // Act
            var result = await handler.Handle(command, CancellationToken.None);

            // Assert
            mockRepository.Verify(r => r.AddAsync(It.Is<Customer>(c =>
                c.Name == command.Name && c.Email == command.Email)), Times.Once);

            Assert.NotEqual(Guid.Empty, result);
        }
    }
}



