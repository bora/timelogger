using System;
using Microsoft.AspNetCore.Mvc;
using Timelogger.Entities;
using System.Linq;

namespace Timelogger.Api.Controllers
{
	[Route("api/[controller]")]
	public class ProjectsController : Controller
	{
		private readonly ApiContext _context;

		public ProjectsController(ApiContext context)
		{
			_context = context;
		}
		
		[HttpGet]
		[Route("get-projects-time")]
		public IActionResult GetProjectsWithTime(int userId,string filterString,bool isAscSorting)
		{
			isAscSorting = string.IsNullOrWhiteSpace(filterString) ? true : isAscSorting;
			Func<dynamic, dynamic> orderingFunction = i =>
                                filterString == "deadline" ? i.Deadline:
                                filterString == "totalCost" ? i.TotalCost :
								filterString == "id" ? i.Id :
								filterString == "name" ? i.Name :
								filterString == "" ? i.Id : "";

			//TODO: api/projects? get-projects

			var combinedProjects = from p in _context.Projects
									join ts in _context.Timesheets on p.Id equals ts.ProjectId into cxt
									from prts in cxt.DefaultIfEmpty()
									group prts by new{p.Id,p.Name,p.Deadline, p.TotalCost} into gtim
									select new
									{
										Id = gtim.Key.Id,
										Name = gtim.Key.Name,
										Deadline = gtim.Key.Deadline,
										TotalCost = gtim.Key.TotalCost,
										TimeSpent = gtim.Sum(x =>x.TimeSpent)
									};
			IOrderedEnumerable<dynamic> combinedProjectsWithOrder;									
			if(isAscSorting)									
				combinedProjectsWithOrder = combinedProjects.OrderBy(orderingFunction);
			else
				combinedProjectsWithOrder = combinedProjects.OrderByDescending(orderingFunction);	
			return Ok(combinedProjectsWithOrder);
		}

		[HttpGet]
		[Route("get-projects-name")]
		public IActionResult GetProjectsWithName(string projectName,int userId)
		{
			var combinedProjects = from p in _context.Projects
									join ts in _context.Timesheets on p.Id equals ts.ProjectId into cxt
									from prts in cxt.DefaultIfEmpty()
									/* where p.Name.Contains(projectName.ToLower) */
									where p.Name.IndexOf(projectName, StringComparison.OrdinalIgnoreCase) != -1
									group prts by new{p.Id,p.Name,p.Deadline, p.TotalCost} into gtim
									select new
									{
										Id = gtim.Key.Id,
										Name = gtim.Key.Name,
										Deadline = gtim.Key.Deadline,
										TotalCost = gtim.Key.TotalCost,
										TimeSpent = gtim.Sum(x =>x.TimeSpent)
									};
			return Ok(combinedProjects);
		}

		// GET api/projects
		[HttpGet]
		public IActionResult Get()
		{
			return Ok(_context.Projects);
		}

		// POST api/projects
		[HttpPost]
		public IActionResult Post(int id, string name,DateTime deadline, int totalCost)
		{
			if(id > 0)
			{
				var projectObject = new Project
				{
					Id = id,
					Name = name,
					Deadline = deadline,
					TotalCost = totalCost
				};
				_context.Projects.Add(projectObject);
				_context.SaveChanges();
			}
			return Ok(_context.Projects);
		}
	}
}