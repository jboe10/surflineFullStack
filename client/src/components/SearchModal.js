import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
import { getSpotList } from '../api/UserApi';
import CamFavorite from './CamFavorite';

export default function SearchModal(props) {
	const [searchInput, setSearchInput] = useState();
	const [spots, setSpots] = useState([]);
	const [results, setResults] = useState([]);

	useEffect(() => {
		const getSpots = async () => {
			setSpots(await getSpotList());
		};
		getSpots();
	}, []);

	const inputChangeHandler = event => {
		setResults(
			spots.filter(spot => spot.name.search(new RegExp(searchInput, 'i')) >= 0)
		);
		return event.target.value;
	};

	const closeClickHandler = () => {
		props.setShowSearchModal(false);
	};

	const searchInputChangeHandler = event => {
		setSearchInput(inputChangeHandler(event));
	};
	return (
		<div className="search-modal">
			<div className="search">
				<div className="search-bar">
					<div className="search-input-wrap">
						<div className="search-input">
							<FontAwesomeIcon icon={faSearch} />
							<input
								placeholder="Search spots for Forecast"
								onChange={searchInputChangeHandler}
							/>
						</div>
					</div>
					<div className="search-exit" onClick={closeClickHandler}>
						<FontAwesomeIcon icon={faTimes} />
					</div>
				</div>
				<div className="search-results">
					{results.map(spot => (
						<CamFavorite
							id={spot._id}
							name={spot.name}
							quality={spot.quality}
							height={spot.size}
							key={spot._id}
						/>
					))}
				</div>
			</div>
		</div>
	);
}
