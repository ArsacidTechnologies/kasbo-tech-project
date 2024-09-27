using IdentityService.Api.DTOs;
using IdentityService.Api.Services;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace IdentityService.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto loginDto)
        {
            if (loginDto == null || string.IsNullOrEmpty(loginDto.Username) || string.IsNullOrEmpty(loginDto.Password))
            {
                return BadRequest("Invalid login request");
            }

            var userDto = await _authService.AuthenticateAsync(loginDto);

            if (userDto == null)
            {
                return Unauthorized("Invalid credentials");
            }

            return Ok(userDto);  // Return the authenticated user along with the JWT token
        }
    }
}
