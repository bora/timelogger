import axios from "axios";
import Constants from '../constants';

export default async function insertTimesheet(projectId: number, userId: number, timeSpent: number) {
    let endpoint = `${Constants.BASE_URL}/timesheets`;
    axios.post(endpoint, null, { params: { projectId, userId, timeSpent } })
        .then(response => response.status)
        .catch(err => console.warn(err));
} 
