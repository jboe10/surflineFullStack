import axios from 'axios';
const userServer = `https://stormy-thicket-96949.herokuapp.com/api`;

export const getUserInfo = token => {
	return axios({
		method: 'GET',
		url: `${userServer}/user`,
		headers: { 'auth-token': token },
	}).then(response => {
		return response.data;
	});
};

export const updateUserSpots = (token, favSpots) => {
	if (token) {
		return axios({
			method: 'PUT',
			url: `${userServer}/user`,
			data: { favoriteSpots: favSpots },
			headers: { 'auth-token': token },
		}).then(response => {
			return response.data;
		});
	}
};

// gets all Spot names
export function getSurfSpotList() {
	return axios.get(`${userServer}/spots`).then(response => {
		return response.data;
	});
}
