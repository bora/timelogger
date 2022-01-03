import IProject from "./IProject";

export default interface IModalProps{
	selectedRowItem:IProject|null
	isDisable: boolean,
	rerenderParentCallback:any
}