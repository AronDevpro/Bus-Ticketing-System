namespace SLTB.Server.Models
{
    public class User
    {
        public int Id { get; set; }

        public string Email { get; set; } = null!;
        public string Name { get; set; } = null!;

        public string Password { get; set; } = null!;

        public string PhoneNumber { get; set; } = null!;

        public string AccountType { get; set; } = null!;
        public string? NIC { get; set; }

        public bool Status { get; set; }
    }
}
