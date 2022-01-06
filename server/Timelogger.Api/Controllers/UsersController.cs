using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Timelogger.Entities;

namespace Timelogger.Api.Controllers
{
    [Route("api/[controller]")]
    public class UsersController : Controller
    {
        private readonly ApiContext _context;

        public UsersController(ApiContext context)
        {
            _context = context;
        }

        [HttpGet]
        [Route("myuser")]
        public IActionResult GetMyUser(int userId)
        {
            int USER_ID = userId > 0 ? userId : 1;
            var filteredUsers = _context.Users.Where(x => x.Id == USER_ID).FirstOrDefault();
            return Ok(filteredUsers);
        }

        // POST api/users
        [HttpPost]
        public IActionResult Post(string name, string surname, string email)
        {
            if (!string.IsNullOrWhiteSpace(name) && !string.IsNullOrWhiteSpace(surname))
            {
                int lastId = _context.Users.Any() ? _context.Users.Max(t => t.Id) : 0;
                var userObject = new User
                {
                    Id = lastId + 1,
                    Name = name,
                    Surname = surname,
                    Email = email
                };
                _context.Users.Add(userObject);
                _context.SaveChanges();
            }
            return Ok(_context.Users);
        }

        // GET api/users
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_context.Users);
        }
    }
}
