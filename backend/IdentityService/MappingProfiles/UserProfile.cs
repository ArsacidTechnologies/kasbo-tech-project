using AutoMapper;
using IdentityService.Api.DTOs;
using IdentityService.Api.Models;

namespace IdentityService.Api.MappingProfiles
{
    public class UserProfile : Profile
    {
        public UserProfile()
        {
            CreateMap<ApplicationUser, UserDto>().ForMember(dest => dest.Token, opt => opt.Ignore());
        }
    }
}