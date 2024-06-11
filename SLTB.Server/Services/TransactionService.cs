using Microsoft.EntityFrameworkCore;
using SLTB.Server.Models;

namespace SLTB.Server.Services
{
    public class TransactionService : ITransactionService
    {
        private readonly AppDBContext _context;

        public TransactionService(AppDBContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Transaction>> GetLastTenTransactionsAsync()
        {
            return await _context.Transaction
                .OrderByDescending(t => t.Id)
                .Take(10)
                .ToListAsync();
        }

        public async Task<Transaction> GetTransactionByIdAsync(int id)
        {
            return await _context.Transaction.FindAsync(id);
        }

        public async Task<Transaction> CreateTransactionAsync(Transaction transaction)
        {
            _context.Transaction.Add(transaction);
            await _context.SaveChangesAsync();
            return transaction;
        }
    }
}
