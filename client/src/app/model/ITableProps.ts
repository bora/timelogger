import Project from "./IProject";

export default interface ITableProps{
	dataListObject:Project[],
	onRowSelect:any,
	selectedIndex:any,
	querySorting:any
}