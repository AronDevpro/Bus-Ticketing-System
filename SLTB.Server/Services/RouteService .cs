using Microsoft.EntityFrameworkCore;
using SLTB.Server.Models;

namespace SLTB.Server.Services
{
    public class RouteService : IRouteService
    {
        private readonly AppDBContext _context;

        public RouteService(AppDBContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<BusRoute>> GetRoutesAsync()
        {
            return await _context.BusRoutes.ToListAsync();
        }

        public async Task<BusRoute> GetRouteAsync(int id)
        {
            return await _context.BusRoutes.FindAsync(id);
        }

        public async Task<BusRoute> CreateRouteAsync(BusRoute route)
        {
            _context.BusRoutes.Add(route);
            await _context.SaveChangesAsync();
            return route;
        }

        public async Task<bool> UpdateRouteAsync(int id, BusRoute route)
        {
            if (id != route.Id)
            {
                return false;
            }

            _context.Entry(route).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
                return true;
            }
            catch (DbUpdateConcurrencyException)
            {
                return false;
            }
        }

        public async Task<bool> DeleteRouteAsync(int id)
        {
            var route = await _context.BusRoutes.FindAsync(id);

            if (route == null)
            {
                return false;
            }

            _context.BusRoutes.Remove(route);
            await _context.SaveChangesAsync();
            return true;
        }

        public bool RouteExists(int id)
        {
            return _context.BusRoutes.Any(b => b.Id == id);
        }
    }
}
