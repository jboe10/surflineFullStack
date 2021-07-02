import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllSurfSpots } from '../redux/reducers/surfSpotsReducer';
import Body from './Body';
import CamSelect from './CamSelect';
import Footer from './Footer';
import SearchBar from './SearchBar';

export default function Home() {
	const dispatch = useDispatch();
	const allSpots = useSelector(state => state.surfSpotsReducer);

	useEffect(() => {
		if (allSpots.length < 1) {
			dispatch(getAllSurfSpots());
		}
	}, []);

	return (
		<div className="home-page">
			<div className="header">
				<SearchBar />
			</div>
			<CamSelect />
			<Body />
			<Footer />
		</div>
	);
}
