using Microsoft.AspNetCore.Routing;
using Microsoft.EntityFrameworkCore;
using SLTB.Server.Models;

namespace SLTB.Server.Services
{
    public class BusScheduleService : IBusScheduleService
    {
        private readonly AppDBContext _context;

        public BusScheduleService(AppDBContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<BusSchedule>> GetBusSchedules()
        {
            return await _context.BusSchedules
                .Include(bs => bs.BusRoute)
                .Include(bs => bs.Bus)
                .ToListAsync();
        }

        public async Task<BusSchedule> GetBusSchedule(int id)
        {
            return await _context.BusSchedules
                .Include(bs => bs.BusRoute)
                .Include(bs => bs.Bus)
                .FirstOrDefaultAsync(bs => bs.Id == id);
        }

        public async Task<IEnumerable<BusSchedule>> GetBusSchedulesCustom(string startLocation, string endLocation, string date)
        {
            return await _context.BusSchedules
                .Include(bs => bs.BusRoute)
                .Include(bs => bs.Bus)
                .Where(bs => bs.BusRoute.StartLocation == startLocation
                    && bs.BusRoute.EndLocation == endLocation
                    && bs.StartDate == date)
                .ToListAsync();
        }

        public async Task<BusSchedule> CreateBusSchedule(BusSchedule busSchedule)
        {
            _context.BusSchedules.Add(busSchedule);
            await _context.SaveChangesAsync();
            return busSchedule;
        }

        public async Task<bool> UpdateBusSchedule(int id, BusSchedule busSchedule)
        {

            if (id != busSchedule.Id)
            {
                return false;
            }

            _context.Entry(busSchedule).State = EntityState.Modified;

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

        public async Task<bool> DeleteBusSchedule(int id)
        {
            var busSchedule = await _context.BusSchedules.FindAsync(id);
            if (busSchedule == null)
                return false;

            _context.BusSchedules.Remove(busSchedule);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
