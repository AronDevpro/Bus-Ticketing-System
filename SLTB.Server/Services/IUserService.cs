using SLTB.Server.Models;

namespace SLTB.Server.Services
{
    public interface IUserService
    {
        Task<IEnumerable<User>> GetUsers();
        Task<User> GetUser(int id);
        Task<User> CreateUser(User user);
        Task<string> Login(string email, string password);
        Task UpdateUser(int id, User user);
        Task DeleteUser(int id);
    }
}
