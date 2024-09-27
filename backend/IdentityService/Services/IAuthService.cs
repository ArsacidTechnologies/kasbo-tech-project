using System.Threading.Tasks;
using IdentityService.Api.DTOs;

namespace IdentityService.Api.Services
{
    public interface IAuthService
    {
        Task<UserDto> AuthenticateAsync(LoginDto loginDto);
    }
}
