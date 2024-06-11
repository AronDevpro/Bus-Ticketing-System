using Microsoft.EntityFrameworkCore;
using SLTB.Server.Models;

namespace SLTB.Server
{
    public partial class AppDBContext : DbContext
    {
        public AppDBContext(DbContextOptions<AppDBContext> options) : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Bus> Buses { get; set; }
        public DbSet<BusRoute> BusRoutes { get; set; }
        public DbSet<Ticket> Tickets { get; set; }
        public DbSet<BusSchedule> BusSchedules { get; set; }
        public DbSet<Transaction> Transaction { get; set; }


    }
}
