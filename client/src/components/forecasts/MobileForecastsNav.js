import React, { useState, useEffect } from 'react';
import { getSpotList } from '../../api/UserApi';
import CamFavorite from '../CamFavorite';
import SearchBar from '../SearchBar';

export default function MobileForecastsNav() {
	const [spots, setSpots] = useState([]);

	useEffect(() => {
		const getSpots = async () => {
			setSpots(await getSpotList());
		};
		getSpots();
	}, []);

	return (
		<>
			<SearchBar />
			<div className="search-results">
				{spots.map(spot => (
					<CamFavorite
						id={spot._id}
						name={spot.name}
						quality={spot.quality}
						height={spot.size}
						key={spot._id}
					/>
				))}
			</div>
		</>
	);
}
