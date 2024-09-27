using System.Linq;
using System.Threading.Tasks;
using IdentityService.Api.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using IdentityService.Api.Data;

namespace IdentityService.Api.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly ApplicationDbContext _context;
        private readonly IPasswordHasher<ApplicationUser> _passwordHasher;

        public UserRepository(ApplicationDbContext context, IPasswordHasher<ApplicationUser> passwordHasher)
        {
            _context = context;
            _passwordHasher = passwordHasher;
        }

        public async Task<ApplicationUser> GetUserByUsernameAsync(string username)
        {
            return await _context.Users.SingleOrDefaultAsync(u => u.UserName == username);
        }

        public async Task<bool> ValidateUserCredentialsAsync(string username, string password)
        {
            var user = await GetUserByUsernameAsync(username);
            if (user == null) return false;

            var result = _passwordHasher.VerifyHashedPassword(user, user.PasswordHash, password);
            return result == PasswordVerificationResult.Success;
        }

        public async Task CreateUserAsync(ApplicationUser user, string password)
        {
            user.PasswordHash = _passwordHasher.HashPassword(user, password);
            await _context.Users.AddAsync(user);
            await _context.SaveChangesAsync();
        }
    }
}
