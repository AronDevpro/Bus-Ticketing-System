using Microsoft.EntityFrameworkCore;
using SLTB.Server.Models;

namespace SLTB.Server.Services
{
    public class TicketService : ITicketService
    {
        private readonly AppDBContext _context;

        public TicketService(AppDBContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Ticket>> GetTicketsAsync()
        {
            return await _context.Tickets
                .Include(t => t.BusSchedule)
                    .ThenInclude(bs => bs.BusRoute)
                .Include(t => t.User)
                .Include(t => t.Transaction)
                .ToListAsync();
        }

        public async Task<IEnumerable<Ticket>> GetTicketsByEmailAsync(string userEmail)
        {
            return await _context.Tickets
                .Include(t => t.BusSchedule)
                    .ThenInclude(bs => bs.BusRoute)
                .Include(t => t.User)
                .Include(t => t.Transaction)
                .Where(t => t.User.Email == userEmail)
                .ToListAsync();
        }

        public async Task<Ticket> GetTicketByIdAsync(int id)
        {
            return await _context.Tickets.FindAsync(id);
        }

        public async Task<Ticket> CreateTicketAsync(Ticket ticket)
        {
            _context.Tickets.Add(ticket);
            await _context.SaveChangesAsync();
            return ticket;
        }

        public async Task<bool> UpdateTicketAsync(int id, Ticket ticket)
        {
            var existingTicket = await _context.Tickets.FindAsync(id);
            if (existingTicket == null)
                return false;

            _context.Entry(existingTicket).CurrentValues.SetValues(ticket);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteTicketAsync(int id)
        {
            var ticketToDelete = await _context.Tickets.FindAsync(id);
            if (ticketToDelete == null)
                return false;

            _context.Tickets.Remove(ticketToDelete);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
