using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace IdentityService.Api.Models
{
    public class RoleModel
    {
        [Key]
        public string Id { get; set; }
        public string Name { get; set; }
        public List<Permission> Permissions { get; set; }
    }
}
