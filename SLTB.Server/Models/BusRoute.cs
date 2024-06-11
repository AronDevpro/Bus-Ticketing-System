namespace SLTB.Server.Models
{
    public class BusRoute
    {
        public int Id { get; set; }
        public int RouteNumber { get; set; }
        public string StartLocation { get; set; } = null!;
        public double TicketPrice { get; set; }
        public string EndLocation { get; set; } = null!;
        public string Status { get; set; } = null!;
    }
}
