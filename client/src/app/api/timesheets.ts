import axios from "axios";

const BASE_URL = 'http://localhost:3001/api';

export default async function insertTimesheet(projectId:number, userId:number, timeSpent:number) {
	let endpoint = `${BASE_URL}/timesheets`;
	// POST request using axios with error handling
    axios.post(endpoint, null, { params: {projectId,userId,timeSpent}})
	  .then(response => response.status)
	  .catch(err => console.warn(err));
} 
