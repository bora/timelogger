import IProject from "./IProject";
import User from "./IUser";

export default interface IModalProps {
    selectedRowItem: IProject | null
    isDisable: boolean,
    rerenderParentCallback: any,
    myUser: User | undefined
}