
import axiosObj from 'axios';
//import { useReducer } from 'react';
import User from '../model/IUser';

const BASE_URL = 'http://localhost:3001/api';

export default async function getMyUser():Promise<User> {
	let endpoint = `${BASE_URL}/users/get-myuser`;
	try {
		const response = await axiosObj.get<User>(endpoint);
		return Promise.resolve(response.data);
	} catch (error) {
		console.log("Error occured when getting user info");
		return Promise.reject(error);
	}
} 