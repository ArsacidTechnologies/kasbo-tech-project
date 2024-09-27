using System.Threading.Tasks;
using IdentityService.Api.Models;

namespace IdentityService.Api.Repositories
{
    public interface IUserRepository
    {
        // Retrieve a user by their username
        Task<ApplicationUser> GetUserByUsernameAsync(string username);

        // Validate user credentials (username and password)
        Task<bool> ValidateUserCredentialsAsync(string username, string password);

        // Create a new user with a hashed password
        Task CreateUserAsync(ApplicationUser user, string password);
    }
}
