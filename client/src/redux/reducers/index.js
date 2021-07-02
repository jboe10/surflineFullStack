import accessToken from './accessToken';
import counterReducer from './counter';
import { combineReducers } from 'redux';
import { loginRequest, loginInfoReducer } from '../reducers/loginReducer';
import { userInfoReducer, getUser } from './userReducer';
import { surfSpotsReducer, getAllSurfSpots } from './surfSpotsReducer';

const allReducers = combineReducers({
	getAllSurfSpots,
	accessToken,
	counterReducer,
	loginRequest,
	loginInfoReducer,
	getUser,
	userInfoReducer,
	surfSpotsReducer,
});

export default allReducers;
