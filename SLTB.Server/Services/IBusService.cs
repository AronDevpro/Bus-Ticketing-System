using SLTB.Server.Models;

namespace SLTB.Server.Services
{
    public interface IBusService
    {
        Task<IEnumerable<Bus>> GetBusesAsync();
        Task<Bus> GetBusByIdAsync(int id);
        Task<Bus> CreateBusAsync(Bus bus);
        Task<bool> UpdateBusAsync(int id, Bus bus);
        Task<bool> DeleteBusAsync(int id);
    }
}
