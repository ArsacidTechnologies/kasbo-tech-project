using AutoMapper;
using IdentityService.Api.DTOs;
using IdentityService.Api.Models;
using IdentityService.Api.Repositories;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace IdentityService.Api.Services
{
    public class AuthService : IAuthService
    {
        private readonly IUserRepository _userRepository;
        private readonly JwtSettings _jwtSettings;
        private readonly IMapper _mapper;

        public AuthService(IUserRepository userRepository, IOptions<JwtSettings> jwtSettings, IMapper mapper)
        {
            _userRepository = userRepository;
            _jwtSettings = jwtSettings.Value;
            _mapper = mapper;
        }

        public async Task<UserDto> AuthenticateAsync(LoginDto loginDto)
        {
            if (await _userRepository.ValidateUserCredentialsAsync(loginDto.Username, loginDto.Password))
            {
                var user = await _userRepository.GetUserByUsernameAsync(loginDto.Username);
                var token = GenerateJwtToken(user);
                var userDto = _mapper.Map<UserDto>(user);
                userDto.Token = token;
                return userDto;
            }
            return null;
        }

        private string GenerateJwtToken(ApplicationUser user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.UTF8.GetBytes(_jwtSettings.Key);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.NameIdentifier, user.Id), // Use Id as the NameIdentifier claim
                    new Claim(ClaimTypes.Name, user.UserName),      // Use UserName for the Name claim
                    new Claim(ClaimTypes.Email, user.Email ?? string.Empty),  // Include email if available
                    new Claim(JwtRegisteredClaimNames.Sub, _jwtSettings.Subject),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                    new Claim(JwtRegisteredClaimNames.Iat, DateTime.UtcNow.ToString())
                }),
                Expires = DateTime.UtcNow.AddMinutes(30),
                Issuer = _jwtSettings.Issuer,
                Audience = _jwtSettings.Audience,
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}
