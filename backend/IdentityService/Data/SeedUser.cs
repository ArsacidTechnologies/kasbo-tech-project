using System.Linq;
using System.Threading.Tasks;
using IdentityService.Api.Models;
using IdentityService.Api.Repositories;
using Microsoft.Extensions.DependencyInjection;

namespace IdentityService.Api.Data
{
    public static class DataSeeder
    {
        public static async Task SeedUsersAsync(IServiceProvider serviceProvider)
        {
            using var scope = serviceProvider.CreateScope();
            var userRepository = scope.ServiceProvider.GetRequiredService<IUserRepository>();

            // Check if users already exist, to prevent duplication
            var mehranExists = await userRepository.GetUserByUsernameAsync("mehran") != null;
            var adminExists = await userRepository.GetUserByUsernameAsync("admin") != null;

            if (!mehranExists)
            {
                var mehran = new ApplicationUser { UserName = "mehran", Email = "mehran@example.com" };
                await userRepository.CreateUserAsync(mehran, "password");
            }

            if (!adminExists)
            {
                var admin = new ApplicationUser { UserName = "admin", Email = "admin@example.com" };
                await userRepository.CreateUserAsync(admin, "admin");
            }
        }
    }
}
