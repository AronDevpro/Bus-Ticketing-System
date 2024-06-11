namespace SLTB.Server.Models
{
    public class BusSchedule
    {
        public int Id { get; set; }
        public int BusId { get; set; }
        public int BusRouteId { get; set; }
        public string StartDate { get; set; } = null!;
        public string StartTime { get; set; } = null!;
        public string? EndDate { get; set; } = null!;
        public string? EndTime { get; set; } = null!;
        public string? BookedSeats { get; set; }
        public string Status { get; set; } = null!;
        public virtual BusRoute? BusRoute { get; set; }
        public virtual Bus? Bus { get; set; }
    }
}
