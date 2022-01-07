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
    public class UsersControllerTests
    {
        private readonly ApiContext _context;
        public UsersControllerTests()
        {
            var serviceProvider = new ServiceCollection().AddEntityFrameworkInMemoryDatabase().BuildServiceProvider();

            // Create a new options instance telling the context to use an
            // InMemory database and the new service provider.
            //var builder = new DbContextOptionsBuilder<ApiContext>();
            //builder.UseInMemoryDatabase().UseInternalServiceProvider(serviceProvider);

            var builder = new DbContextOptionsBuilder<ApiContext>().UseInMemoryDatabase(databaseName: "UserDataBase").UseInternalServiceProvider(serviceProvider);
            var context = new ApiContext(builder.Options);
            {
                #region User Db Seed
                var testUserA = new User
                {
                    Id = 1,
                    Name = "Margaret",
                    Surname = "Simpson",
                    Email = "margaret.simpson@visma.com"
                };
                context.Users.Add(testUserA);

                var testUserB = new User
                {
                    Id = 2,
                    Name = "Osman",
                    Surname = "Tamburlu",
                    Email = "osman.tamburlu@visma.com"
                };
                context.Users.Add(testUserB);

                var testUserC = new User
                {
                    Id = 3,
                    Name = "Joe",
                    Surname = "Boe",
                    Email = "joe.boe@visma.com"
                };
                context.Users.Add(testUserC);

                #endregion

                context.SaveChanges();
            }

            _context = context;
        }

        [Theory]
        [InlineData(1)]
        [InlineData(2)]
        [InlineData(3)]
        public void Check_GetMyUser_Status_Ok(int userId)
        {
            UsersController obj = new UsersController(_context);
            IActionResult actionResult = obj.GetMyUser(userId);
            var okResult = actionResult as OkObjectResult;
            Assert.NotNull(okResult);
            Assert.Equal(200, okResult.StatusCode);
        }

    }
}
