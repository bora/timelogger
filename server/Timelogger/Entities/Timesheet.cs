namespace Timelogger.Entities
{
	public class Timesheet
	{
		public int Id { get; set; }
		public int ProjectId { get; set; }
		public int UserId { get; set; }
		public int TimeSpent { get; set; }
	}
}
