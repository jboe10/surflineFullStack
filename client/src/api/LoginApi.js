import axios from 'axios';

const loginServer = `https://stormy-thicket-96949.herokuapp.com/api/user`;

export default function LoginRequest(email, pass) {
	return axios
		.post(`${loginServer}/login`, {
			email: `${email}`,
			password: `${pass}`,
		})
		.then(response => {
			return response.data.token;
		})
		.catch(err => {
			return err;
		});
}

export function CreateUser(name, email, pass) {
	return axios
		.post(`${loginServer}/register`, {
			name: `${name}`,
			email: `${email}`,
			password: `${pass}`,
		})
		.then(response => {
			return response;
		})
		.catch(err => {
			return undefined;
		});
}
