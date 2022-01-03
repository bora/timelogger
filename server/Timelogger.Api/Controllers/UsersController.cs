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
		[Route("get-myuser")]
		public IActionResult GetMyUser()
		{
			const int USER_ID = 1;
			//_context.Users<ApiContext>().HasQueryFilter(p => !p.IsDeleted);
			var filteredUsers = _context.Users.Where(x => x.Id == USER_ID).FirstOrDefault();
			return Ok(filteredUsers);
		}

		// GET api/users
		[HttpGet]
		public IActionResult Get()
		{
			return Ok(_context.Users);
		}
	}
}
