using System;
using Microsoft.AspNetCore.Mvc;
using Timelogger.Entities;
using System.Linq;

namespace Timelogger.Api.Controllers
{
	[Route("api/[controller]")]
	public class TimesheetsController : Controller
	{
		private readonly ApiContext _context;

		public TimesheetsController(ApiContext context)
		{
			_context = context;
		}

		[HttpGet]
		[Route("get-timesheet")]
		public IActionResult GetTimesheet(int projectId,int userId)
		{	
			//var result = _context.Timesheets.Where(d => d.ProjectId == projectId && d.UserId == userId).GroupBy(x=>x.ProjectId)
			return Ok(_context.Timesheets);
		}

		// GET api/timesheets
		[HttpGet]
		public IActionResult Get()
		{
			return Ok(_context.Timesheets);
		}


		// POST api/timesheets
		[HttpPost]
		public IActionResult Post(int id, int projectId,int userId, int timeSpent)
		{
			if(projectId > 0 && timeSpent>0)
			{
				int lastId = _context.Timesheets.Any() ? _context.Timesheets.Max(t=>t.Id) : 0;
				var timesheetObject = new Timesheet
				{
					Id = lastId+1,
					ProjectId = projectId,
					UserId = userId,
					TimeSpent = timeSpent
				};
				_context.Timesheets.Add(timesheetObject);
				_context.SaveChanges();
			}
			return Ok(_context.Timesheets);
		}

	}
}
