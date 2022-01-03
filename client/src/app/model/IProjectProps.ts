import Project from "./IProject";

export default interface IProjectProps{
	dataListObject:Project[],
	rerenderParentCallback:any,
	searchAction:any,
	querySorting:any
}