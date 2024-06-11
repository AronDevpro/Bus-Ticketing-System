namespace SLTB.Server.Models
{
    public class Bus
    {
        public int Id { get; set; }
        public string BusNumber { get; set; } = null!;
        public string BusType { get; set; } = null!;
        public string DepotName { get; set; } = null!;
        public int SeatsCapacity { get; set; }
        public string Status { get; set; } = null!;
    }
}
