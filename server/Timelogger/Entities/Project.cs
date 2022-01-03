using System;

namespace Timelogger.Entities
{
	public class Project
	{
		public int Id { get; set; }
		public string Name { get; set; }
		/// <summary>
		/// Deadline of the project
		/// </summary>
		/// <value></value>
		public DateTime Deadline { get; set; }

		/// <summary>
		/// Total Cost of the project as hour
		/// </summary>
		/// <value></value>
		public int TotalCost{ get; set; }
		
	}
}
