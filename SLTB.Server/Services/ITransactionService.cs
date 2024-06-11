using SLTB.Server.Models;

namespace SLTB.Server.Services
{
    public interface ITransactionService
    {
        Task<IEnumerable<Transaction>> GetLastTenTransactionsAsync();
        Task<Transaction> GetTransactionByIdAsync(int id);
        Task<Transaction> CreateTransactionAsync(Transaction transaction);
    }
}
