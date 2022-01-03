using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Hosting;
using Timelogger.Entities;

namespace Timelogger.Api
{
	public class Startup
	{
		private readonly IWebHostEnvironment _environment;
		public IConfigurationRoot Configuration { get; }

		public Startup(IWebHostEnvironment env)
		{
			_environment = env;

			var builder = new ConfigurationBuilder()
				.SetBasePath(env.ContentRootPath)
				.AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
				.AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true)
				.AddEnvironmentVariables();
			Configuration = builder.Build();
		}

		// This method gets called by the runtime. Use this method to add services to the container.
		public void ConfigureServices(IServiceCollection services)
		{
			// Add framework services.
			services.AddDbContext<ApiContext>(opt => opt.UseInMemoryDatabase("e-conomic interview"));
			services.AddLogging(builder =>
			{
				builder.AddConsole();
				builder.AddDebug();
			});

			services.AddMvc(options => options.EnableEndpointRouting = false);

			if (_environment.IsDevelopment())
			{
				services.AddCors();
			}
		}

		public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
		{
			if (env.IsDevelopment())
			{
				app.UseCors(builder => builder
					.AllowAnyMethod()
					.AllowAnyHeader()
					.SetIsOriginAllowed(origin => true)
					.AllowCredentials());
			}

			app.UseMvc();


			var serviceScopeFactory = app.ApplicationServices.GetService<IServiceScopeFactory>();
			using (var scope = serviceScopeFactory.CreateScope())
			{
				SeedDatabase(scope);
			}
		}

		private static void SeedDatabase(IServiceScope scope)
		{
			var context = scope.ServiceProvider.GetService<ApiContext>();
			#region Project DB Seed
			var testProject1 = new Project
			{
				Id = 1,
				Name = "e-conomic Interview",
				Deadline = new System.DateTime(2022,01,15),
				TotalCost = 160
			};
			context.Projects.Add(testProject1);

			var testProject2 = new Project
			{
				Id = 2,
				Name = "CreditBureau",
				Deadline = new System.DateTime(2022,06,01),
				TotalCost = 800
			};
			context.Projects.Add(testProject2);

			var testProject3 = new Project
			{
				Id = 3,
				Name = "CreditScore",
				Deadline = new System.DateTime(2023,01,15),
				TotalCost = 2400
			};
			context.Projects.Add(testProject3);

			var testProject4 = new Project
			{
				Id = 4,
				Name = "MetaVersePaymentModule",
				Deadline = new System.DateTime(2022,01,10),
				TotalCost = 80
			};
			context.Projects.Add(testProject4);
			#endregion

			#region User Db Seed
			var testUser1 = new User
			{
				Id = 1,
				Name = "Bart",
				Surname = "Simpson",
				Email = "bart.simpson@visma.com"
			};
			context.Users.Add(testUser1);
			#endregion

			context.SaveChanges();
		}
	}
}