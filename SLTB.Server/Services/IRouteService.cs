using SLTB.Server.Models;

namespace SLTB.Server.Services
{
    public interface IRouteService
    {
        Task<IEnumerable<BusRoute>> GetRoutesAsync();
        Task<BusRoute> GetRouteAsync(int id);
        Task<BusRoute> CreateRouteAsync(BusRoute route);
        Task<bool> UpdateRouteAsync(int id, BusRoute route);
        Task<bool> DeleteRouteAsync(int id);
        bool RouteExists(int id);
    }
}
