import Project from "./IProject";
import User from "./IUser";

export default interface IProjectProps {
    dataListObject: Project[],
    rerenderParentCallback: any,
    searchAction: any,
    querySorting: any,
    updatedStatusWithUser: any,
    myUser: User | undefined
}