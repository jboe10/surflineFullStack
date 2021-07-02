import LoginRequest from '../../api/LoginApi';
import { saveAccessToken } from '../actions/index';
import { getUser } from '../reducers/userReducer';
import { LOGIN_INFO } from '../actions/index';

export const loginRequest = () => async (dispatch, getState) => {
	const loginInfo = getState().loginInfoReducer;
	const responseToken = await LoginRequest(loginInfo.login, loginInfo.password);
	dispatch(saveAccessToken(responseToken));
	dispatch(getUser());
};

export const loginInfoReducer = (state = {}, action) => {
	switch (action.type) {
		case LOGIN_INFO:
			return action.payload;
		default:
			return state;
	}
};
