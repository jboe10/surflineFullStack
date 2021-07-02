import { getSurfSpotList } from '../../api/UserApi';
import { ALL_SURF_SPOTS, saveAllSurfSpots } from '../actions';

export const getAllSurfSpots = () => async (dispatch, getState) => {
	const allSpots = await getSurfSpotList();
	dispatch(saveAllSurfSpots(allSpots));
};

export const surfSpotsReducer = (state = [], action) => {
	switch (action.type) {
		case ALL_SURF_SPOTS:
			return action.payload;
		default:
			return state;
	}
};
