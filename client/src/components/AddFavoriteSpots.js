import React, { useEffect, useRef, useState } from 'react';
import { getAllSurfSpots } from '../redux/reducers/surfSpotsReducer';
import { getSpotList, getUserInfo, updateUserSpots } from '../api/UserApi';
import { compareSelectorState, convertArrayToHashOfId } from '../utils/Helpers';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import {
	updateUserFavSpots,
	userInfoReducer,
} from '../redux/reducers/userReducer';
import { USER_INFO } from '../redux/actions';
import { hash } from 'bcryptjs';

export default function AddFavoriteSpots(props) {
	const [checkBoxSpots, setCheckBoxSpots] = useState([]);
	const dispatch = useDispatch();
	const backgroundDiv = useRef(null);
	const allSpots = useSelector(state => state.surfSpotsReducer);
	const userInfo = useSelector(state => state.userInfoReducer);

	useEffect(() => {
		console.log(userInfo);
		const spotLists = async () => {
			// check to see if we have default spots
			if (!compareSelectorState(allSpots, [])) {
				dispatch(getAllSurfSpots());
			}
			// If we aren't logged in, show alert
			if (compareSelectorState(userInfo, {})) {
				props.setShow(false);
				alert('Please Sign In To Continue');

				// Logged in, select favorite spots
			} else {
				const hashOfUsersSpots = convertArrayToHashOfId(
					userInfo.favoriteSpots,
					'_id'
				);
				console.log(hashOfUsersSpots);
				// Find out which Checkboxes to set to checked or not Checked and put them in an array
				setCheckBoxSpots(
					allSpots.map(spot => {
						const obj = {};
						// Check hash of users favorite spots against all spots
						if (hashOfUsersSpots[spot._id] === '') {
							obj['checked'] = true;
						} else {
							obj['checked'] = false;
						}
						obj['_id'] = spot._id;
						obj['spot'] = spot;
						return obj;
					})
				);
			}
		};
		spotLists();
	}, [userInfo]);

	const Checkbox = props => (
		<input className="checkBox" type="checkbox" {...props} />
	);

	const handelCheckBoxChange = (event, id) => {
		let checkBoxSpotsCopy = [...checkBoxSpots];
		checkBoxSpotsCopy = checkBoxSpotsCopy.map(box => {
			if (box._id === id) {
				return { ...box, checked: event.target.checked };
			}
			return box;
		});
		return checkBoxSpotsCopy;
	};

	const saveClickHandler = async () => {
		const favoriteSpots = checkBoxSpots.reduce((aa, { checked, _id }) => {
			if (checked === true) {
				aa.push({ _id });
			}
			return aa;
		}, []);

		console.log(favoriteSpots);
		// Set Users Favorite Spots
		// update redux USER_INFO state
		dispatch({
			type: USER_INFO,
			payload: {
				...userInfo,
				favoriteSpots,
			},
		});
		// update API
		updateUserFavSpots();

		props.setShow(false);
	};

	const clickOutsideOfCheckboxHandler = event => {
		if (event.target === backgroundDiv.current) {
			props.setShow(false);
		}
	};

	return (
		<div
			className="add-favorite-spots"
			onClick={event => clickOutsideOfCheckboxHandler(event)}
			ref={backgroundDiv}
		>
			<div className="spots-modal">
				<div className="checkbox-wrap">
					{checkBoxSpots.map((check, index) => (
						<div className="checkboxes" key={check.spot._id}>
							<Checkbox
								type="checkbox"
								name={check.spot.name}
								checked={check.checked}
								onChange={event =>
									setCheckBoxSpots(handelCheckBoxChange(event, check.spot._id))
								}
							/>
							<label>{check.spot.name}</label>
						</div>
					))}
				</div>
				<div className="save-cancel">
					<div className="save">
						<button onClick={() => saveClickHandler()}>Save</button>
					</div>
					<div className="cancel">
						<button onClick={() => props.setShow(false)}>Cancel</button>
					</div>
				</div>
			</div>
		</div>
	);
}
