using Microsoft.AspNetCore.Routing;
using Microsoft.EntityFrameworkCore;
using SLTB.Server.Models;

namespace SLTB.Server.Services
{
    public class BusService : IBusService
    {
        private readonly AppDBContext _context;

        public BusService(AppDBContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Bus>> GetBusesAsync()
        {
            return await _context.Buses.ToListAsync();
        }

        public async Task<Bus> GetBusByIdAsync(int id)
        {
            return await _context.Buses.FindAsync(id);
        }

        public async Task<Bus> CreateBusAsync(Bus bus)
        {
            _context.Buses.Add(bus);
            await _context.SaveChangesAsync();
            return bus;
        }

        public async Task<bool> UpdateBusAsync(int id, Bus bus)
        {
            if (id != bus.Id)
            {
                return false;
            }

            _context.Entry(bus).State = EntityState.Modified;

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

        public async Task<bool> DeleteBusAsync(int id)
        {
            var busToDelete = await _context.Buses.FindAsync(id);
            if (busToDelete == null)
                return false;

            _context.Buses.Remove(busToDelete);
            await _context.SaveChangesAsync();

            return true;
        }
    }
}
