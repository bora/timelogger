
import axiosObj from 'axios';
import User from '../model/IUser';
import Constants from '../constants';

export default async function getMyUser(): Promise<User> {
    let endpoint = `${Constants.BASE_URL}/users/myuser`;
    try {
        const response = await axiosObj.get<User>(endpoint);
        return Promise.resolve(response.data);
    } catch (error) {
        console.error("Error occured when getting user info");
        return Promise.reject(error);
    }
} 