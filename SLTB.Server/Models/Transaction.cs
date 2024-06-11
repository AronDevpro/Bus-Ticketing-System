namespace SLTB.Server.Models
{
    public class Transaction
    {
        public int Id { get; set; }
        public double TotalAmount { get; set; }
        public double ConvenientFee { get; set; }
        public string PaymentMode { get; set; } = null!;
        public string Status { get; set; } = null!;
        public string TransactionDateTime { get; set; } = null!;
    }
}
