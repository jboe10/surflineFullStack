import { getUserInfo, updateUserSpots } from '../../api/UserApi';
import { USER_INFO } from '../actions';

export const getUser = () => async (dispatch, getState) => {
	const token = getState().accessToken;
	console.log(token);
	if (token !== '') {
		const userInfo = await getUserInfo(token);
		dispatch({ type: USER_INFO, payload: userInfo });
	}
};

export const updateUserFavSpots = () => async (dispatch, getState) => {
	console.log(getState());
	const favSpots = getState().favoriteSpots;
	const token = getState().accessToken;
	const userInfo = await updateUserSpots(token, favSpots);
};

export const userInfoReducer = (state = {}, action) => {
	switch (action.type) {
		case USER_INFO:
			return action.payload;
		default:
			return state;
	}
};
