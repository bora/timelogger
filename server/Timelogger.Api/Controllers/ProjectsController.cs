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
        [Route("user")]
        public IActionResult GetProjectsByUser(int userId, string filterString, bool isAscSorting)
        {
            IQueryable<dynamic> combinedProjects;
            isAscSorting = string.IsNullOrWhiteSpace(filterString) ? true : isAscSorting;
            Func<dynamic, dynamic> orderingFunction = i =>
                                filterString == "deadline" ? i.Deadline :
                                filterString == "totalCost" ? i.TotalCost :
                                filterString == "id" ? i.Id :
                                filterString == "name" ? i.Name :
                                filterString == "timeSpent" ? i.TimeSpent :
                                filterString == "" ? i.Id : "";
            if (userId > 0)
            {
                combinedProjects = from p in _context.Projects
                                   join ts in _context.Timesheets on p.Id equals ts.ProjectId into ptsCxt
                                   from pts in ptsCxt
                                   where pts.UserId == userId
                                   group pts by new { p.Id, p.Name, p.Deadline, p.TotalCost } into gtim
                                   select new
                                   {
                                       Id = gtim.Key.Id,
                                       Name = gtim.Key.Name,
                                       Deadline = gtim.Key.Deadline,
                                       TotalCost = gtim.Key.TotalCost,
                                       TimeSpent = gtim.Sum(x => x.TimeSpent)
                                   };
            }
            else
            {
                combinedProjects = from p in _context.Projects
                                   join ts in _context.Timesheets on p.Id equals ts.ProjectId into cxt
                                   from prts in cxt.DefaultIfEmpty()
                                   group prts by new { p.Id, p.Name, p.Deadline, p.TotalCost } into gtim
                                   select new
                                   {
                                       Id = gtim.Key.Id,
                                       Name = gtim.Key.Name,
                                       Deadline = gtim.Key.Deadline,
                                       TotalCost = gtim.Key.TotalCost,
                                       TimeSpent = gtim.Sum(x => x.TimeSpent)
                                   };
            }

            IOrderedEnumerable<dynamic> combinedProjectsWithOrder;
            if (isAscSorting)
                combinedProjectsWithOrder = combinedProjects.OrderBy(orderingFunction);
            else
                combinedProjectsWithOrder = combinedProjects.OrderByDescending(orderingFunction);
            return Ok(combinedProjectsWithOrder);
        }

        [HttpGet]
        [Route("name")]
        public IActionResult GetProjectsWithName(string projectName)
        {
            var combinedProjects = from p in _context.Projects
                                   join ts in _context.Timesheets on p.Id equals ts.ProjectId into cxt
                                   from prts in cxt.DefaultIfEmpty()
                                   where p.Name.IndexOf(projectName, StringComparison.OrdinalIgnoreCase) != -1
                                   group prts by new { p.Id, p.Name, p.Deadline, p.TotalCost } into gtim
                                   select new
                                   {
                                       Id = gtim.Key.Id,
                                       Name = gtim.Key.Name,
                                       Deadline = gtim.Key.Deadline,
                                       TotalCost = gtim.Key.TotalCost,
                                       TimeSpent = gtim.Sum(x => x.TimeSpent)
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
        public IActionResult Post(string name, DateTime deadline, int totalCost)
        {
            if (!string.IsNullOrWhiteSpace(name))
            {
                int lastId = _context.Projects.Any() ? _context.Projects.Max(t => t.Id) : 0;
                var projectObject = new Project
                {
                    Id = lastId + 1,
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