export const INCREMENT = 'INCREMENT';
export const LOGIN_TOKEN = 'LOGIN_TOKEN';
export const USER_INFO = 'USER_INFO';
export const ALL_SURF_SPOTS = 'ALL_SURF_SPOTS';
export const LOGIN_INFO = '';

export const increment = () => {
	return {
		type: INCREMENT,
	};
};

export const saveAccessToken = loginToken => {
	return {
		type: LOGIN_TOKEN,
		payload: loginToken,
	};
};

export const loginInfoReducer = loginInfo => {
	return {
		type: LOGIN_INFO,
		payload: loginInfo,
	};
};

export const getUserInfo = user => {
	return {
		type: USER_INFO,
		payload: user,
	};
};

export const saveAllSurfSpots = spots => {
	return {
		type: ALL_SURF_SPOTS,
		payload: spots,
	};
};
