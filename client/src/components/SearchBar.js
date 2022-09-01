import React, { useState, useEffect } from 'react';
import surfline from '../imgs/fullLogo.png';
import surflineSmall from '../imgs/surfline.png';
import SearchModal from './SearchModal';
import DropdownMenu2 from '../resources/DropdownMenu2';
import { getSpotList } from '../api/UserApi';

export default function SearchBar() {
	const [showSearchModal, setShowSearchModal] = useState(false);
	const [forecastDrop, setForecastDrop] = useState(false);
	const [spots, setSpots] = useState([]);
	const [showLogout, setShowLogout] = useState(false);

	useEffect(() => {
		const getSpots = async () => {
			setSpots(await getSpotList());
		};
		const token = localStorage.getItem('auth-token');
		if (token) {
			setShowLogout(true);
		} else {
			setShowLogout(false);
		}
		getSpots();
	}, []);

	let searchModal;
	showSearchModal
		? (searchModal = <SearchModal setShowSearchModal={setShowSearchModal} />)
		: (searchModal = null);

	const logoutClickHandler = () => {
		const token = localStorage.getItem('auth-token');
		if (token) {
			setShowLogout(false);
			localStorage.setItem('auth-token', '');
		}
	};

	const searchClickHandler = () => {
		setShowSearchModal(true);
	};

	return (
		<>
			<div className="search-bar">
				<div className="home-button">
					<a href="/">
						<img
							src={surfline}
							className="large-logo"
							height="56px"
							width="120px"
							alt="ff"
						/>
						<img
							src={surflineSmall}
							className="small-logo"
							height="56px"
							width="56px"
							alt="ff"
						/>
					</a>
				</div>
				<div
					className="dropdown-f"
					onMouseEnter={() => setForecastDrop(true)}
					onMouseLeave={() => setForecastDrop(false)}
				>
					FORECASTS
					{forecastDrop && <DropdownMenu2 link="/forecasts/" spots={spots} />}
				</div>
				<div className="news-link">
					<a href="/news">NEWS</a>
				</div>
				<input type="text" placeholder="Search" onClick={searchClickHandler} />

				<a className="free-trial-btn" href="/join">
					START FREE TRIAL
				</a>
				{!showLogout && <a href="/login">SIGN IN</a>}
				{showLogout && (
					<div className="logout-btn" onClick={logoutClickHandler}>
						LOGOUT
					</div>
				)}
			</div>
			{searchModal}
		</>
	);
}
