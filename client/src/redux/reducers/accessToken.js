// REDUCER -> describes how your action transforms your state
import { LOGIN_TOKEN } from '../actions';

const tokenReducer = (state = '', action) => {
	switch (action.type) {
		case LOGIN_TOKEN:
			return action.payload;
		default:
			return state;
	}
};

export default tokenReducer;
