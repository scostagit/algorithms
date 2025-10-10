namespace Ranking.Web.API.Domain.Entities.Base
{
    public abstract class Entity
    {
        public Guid Id { get; protected set; } = Guid.NewGuid();
       
    }

}
