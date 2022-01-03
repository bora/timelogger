import IProject from "./IProject";

export default interface ITimesheetSelectBoxProps{
	selectedItem:IProject|null,
	onChangeTimeSheet:any
}