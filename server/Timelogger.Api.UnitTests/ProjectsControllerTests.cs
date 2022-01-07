using Timelogger.Api.Controllers;
using System;
using Microsoft.AspNetCore.Mvc;
using Timelogger.Entities;
using System.Linq;
using Xunit;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.EntityFrameworkCore;

namespace Timelogger.Api.Tests
{
    public class ProjectsControllerTests
    {
        private readonly ApiContext _context;
        public ProjectsControllerTests()
        {
            var options = new DbContextOptionsBuilder<ApiContext>().UseInMemoryDatabase(databaseName: "ProjectDataBase").Options;
            var context = new ApiContext(options);
            _context = context;
        }


        [Fact]
        public void HelloWorld_ShouldReply_HelloBack()
        {
            ProjectsController sut = new ProjectsController(null);
            string actual = sut.HelloWorld();
            Assert.Equal("Hello Back!", actual);
        }

        [Fact]
        public void Check_GetProjectWithName_Status_Ok()
        {
            ProjectsController obj = new ProjectsController(_context);
            IActionResult actionResult = obj.GetProjectsWithName("Meta");
            var okResult = actionResult as OkObjectResult;
            Assert.NotNull(okResult);
            Assert.Equal(200, okResult.StatusCode);
        }

        [Theory]
        [InlineData(1, "deadline", true)]
        [InlineData(1, "totalCost", true)]
        [InlineData(1, "id", true)]
        [InlineData(1, "name", true)]
        [InlineData(1, "timeSpent", true)]
        [InlineData(2, "deadline", false)]
        [InlineData(2, "totalCost", false)]
        [InlineData(2, "id", false)]
        [InlineData(2, "name", false)]
        [InlineData(2, "timeSpent", false)]
        public void Check_GetProjectsByUser_Status_With_Soritng_Ok(int userId, string sortingString, bool isAscSorting)
        {
            ProjectsController obj = new ProjectsController(_context);
            IActionResult actionResult = obj.GetProjectsByUser(userId, sortingString, isAscSorting);
            var okResult = actionResult as OkObjectResult;
            Assert.NotNull(okResult);
            Assert.Equal(200, okResult.StatusCode);
        }

        [Fact]
        public void Check_GetProjectsByUser_Status_Ok()
        {
            ProjectsController obj = new ProjectsController(_context);
            IActionResult actionResult = obj.GetProjectsByUser(1, "", true);
            var okResult = actionResult as OkObjectResult;
            Assert.NotNull(okResult);
            Assert.Equal(200, okResult.StatusCode);
        }
    }
}
