import React from 'react';
import SearchBar from '../SearchBar';
import Footer from '../Footer';
import { importAllImgs, getRndInteger } from '../../utils/Helpers';
import ForecastHeader from './ForecastHeader';
import ForecastSpotInfo from './ForecastSpotInfo';
import CamSelect from '../CamSelect';

const tempRegion = {
	country: 'United States',
	state: 'California',
	county: 'Orange County',
	city: 'Huntington Beach',
};

export default function ForecastV2(props) {
	const images = importAllImgs(
		require.context('../../imgs/forecasts', false, /\.(png|jpe?g|svg)$/)
	);

	return (
		<div className="forecast-v2">
			<SearchBar />
			<CamSelect />
			<ForecastHeader region={tempRegion} />
			<div className="forecast-wrap">
				<div className="forecast">
					<img
						className="spot-img"
						src={images[getRndInteger(0, images.length - 1)]}
						alt="ff"
					/>
					<ForecastSpotInfo spot={props.spot} />
				</div>
				<div className="ad"></div>
			</div>
			<Footer />
		</div>
	);
}
