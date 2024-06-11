using SLTB.Server.Models;

namespace SLTB.Server.Services
{
    public interface IBusScheduleService
    {
        Task<IEnumerable<BusSchedule>> GetBusSchedules();
        Task<BusSchedule> GetBusSchedule(int id);
        Task<IEnumerable<BusSchedule>> GetBusSchedulesCustom(string startLocation, string endLocation, string date);
        Task<BusSchedule> CreateBusSchedule(BusSchedule busSchedule);
        Task<bool> UpdateBusSchedule(int id, BusSchedule busSchedule);
        Task<bool> DeleteBusSchedule(int id);
    }
}
