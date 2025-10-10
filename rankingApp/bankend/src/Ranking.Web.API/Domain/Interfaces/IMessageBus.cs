namespace Ranking.Web.API.Domain.Interfaces
{
    public interface IMessageBus
    {
        Task PublishAsync<T>(T message, string queue);
    }
}
