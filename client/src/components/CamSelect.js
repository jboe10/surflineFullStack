import React, { useEffect, useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faPlusCircle,
	faMinusCircle,
	faArrowLeft,
	faArrowRight,
} from '@fortawesome/free-solid-svg-icons';
import CamFavorite from './CamFavorite';
import { getUserInfo } from '../api/UserApi';
import AddFavoriteSpots from './AddFavoriteSpots';
import { scrollLeftSmooth } from '../utils/Helpers';

export default function CamSelect() {
	const [favoriteSpots, setFavoriteSpots] = useState([]);
	const [showAddSpots, setShowAddSpots] = useState(false);
	const favsEle = useRef(null);

	useEffect(() => {
		const getUserSpots = async () => {
			try {
				const userInfo = await getUserInfo();
				setFavoriteSpots(userInfo.favoriteSpots);
			} catch (error) {
				setFavoriteSpots([]);
			}
		};
		getUserSpots();
	}, []);

	useEffect(() => {
		const getUserSpots = async () => {
			try {
				const userInfo = await getUserInfo();
				setFavoriteSpots(userInfo.favoriteSpots);
			} catch (error) {
				setFavoriteSpots([]);
			}
		};
		getUserSpots();
	}, [showAddSpots]);

	return (
		<>
			<div className="cam-select">
				<div className="favorites-wrap" ref={favsEle}>
					<div
						className="add-favorite-wrap"
						onClick={() => setShowAddSpots(true)}
					>
						<div className="add-favorite">
							<div className="add">
								<FontAwesomeIcon icon={faPlusCircle} />
								<FontAwesomeIcon className="minus" icon={faMinusCircle} />
							</div>
							<div className="text">
								<h5>Add/Remove Favorites</h5>
								<span>Quickly access the spots you care about most.</span>
							</div>
						</div>
					</div>
					<div className="favorites">
						{favoriteSpots.map(spot => (
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
				<div className="arrows">
					<button onClick={() => scrollLeftSmooth(favsEle.current, -500)}>
						<FontAwesomeIcon icon={faArrowLeft} />
					</button>
					<button onClick={() => scrollLeftSmooth(favsEle.current, 500)}>
						<FontAwesomeIcon icon={faArrowRight} />
					</button>
				</div>
			</div>
			<div className="nav-links-mobile">
				<a href="/forecasts">Forecasts</a>
				<a href="/news">News</a>
				<a href="/join" className="sign-up-now">
					Sign Up
				</a>
			</div>
			{showAddSpots && <AddFavoriteSpots setShow={setShowAddSpots} />}
		</>
	);
}
