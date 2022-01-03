import User from "../model/IUser";
import axios from "axios";
import IProject from "../model/IProject";
import IQuerySorting from "../model/IQuerySorting";

const BASE_URL = 'http://localhost:3001/api';

/*  async function getAll() {
	const response = await fetch(`${BASE_URL}/projects`);
	return response.json();
}  */

export default async function getAllProjectsWithTimeSpent(
		myUser:User|undefined,querySorting:IQuerySorting|undefined):Promise<IProject[]> 
{
	try {
		const endPoint = `${BASE_URL}/projects/get-projects-time`;
		console.log('myUser Log',myUser);
		let userId = myUser!==undefined && myUser.id>0 ? myUser.id : 1;
		let filter = querySorting!==undefined && querySorting.filterString!==undefined && querySorting.filterString!=='' 
			? querySorting.filterString : 'id';
		let isAscSorting = querySorting!==undefined && querySorting.filterString!==undefined && querySorting.filterString!=='' 
			? querySorting.isAscSorting.toString() : 'true';
		const params = new URLSearchParams([
			['userId', userId.toString() ],
			['filterString', filter],
			['isAscSorting', isAscSorting ]
		]);
		const response = await axios.get<IProject[]>(endPoint,{params});
		return Promise.resolve(response.data);
	} catch (error) {
		console.log("Error occured when getting project from GetAllProjectsWithTimeSpent");
		return Promise.reject(error);
	}
};

export async function getAllProjectsWithName(projectName:string):Promise<IProject[]> {
	try {
		const endPoint = `${BASE_URL}/projects/get-projects-name`;
		const params = new URLSearchParams([
			['projectName', projectName ],
			['userId', "1" ]
		]);
		const response = await axios.get<IProject[]>(endPoint,{params});
		return Promise.resolve(response.data);
	} catch (error) {
		console.log("Error occured when getting project from getAllProjectsWithName");
		return Promise.reject(error);
	}
};

