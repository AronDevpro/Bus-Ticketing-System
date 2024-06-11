namespace SLTB.Server.Models
{
    public class Ticket
    {
        public int Id { get; set; }
        public int BusScheduleId { get; set; }
        public List<string>? SeatNumber { get; set; }
        public string PassengerName { get; set; } = null!;

        public string PassengerPhone { get; set; } = null!;

        public string Nic { get; set; } = null!;

        public string Status { get; set; } = null!;
        public int UserId { get; set; }
        public int TransactionId { get; set; }
        public virtual Transaction? Transaction { get; set; }
        public virtual User? User { get; set; }
        public virtual BusSchedule? BusSchedule { get; set; }
    }
}
