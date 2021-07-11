import React from 'react';
import SearchBar from '../SearchBar';
import waves from '../../imgs/waves.jpg';
import signUp from '../../imgs/signUp.jpg';

import Footer from '../Footer';
import {
	importAllImgs,
	getRndInteger,
	surfColorClassNameGen,
} from '../../utils/Helpers';

const spotBar = 'spot-bar';

export default function Forecast(props) {
	const surfQualityColor = surfColorClassNameGen(spotBar, props.spot.quality);

	const images = importAllImgs(
		require.context('../../imgs/forecasts', false, /\.(png|jpe?g|svg)$/)
	);

	return (
		<>
			<SearchBar />
			<div className="forecast-wrap">
				<div className="forecast">
					<img src={images[getRndInteger(0, images.length - 1)]} alt="ff" />
					<div className="surf-info-wrap">
						<div className="surf-info">
							<div className={surfQualityColor}>
								<div className="spot-name">{props.spot.name}</div>
								<div className="spot-quality">
									{props.spot.quality}
									<span>{props.spot.size}ft.</span>
								</div>
							</div>
						</div>
						<div className="area-forecast">
							<h3>Regional Forecast - North Orange County</h3>
							<h5>AM Forecast</h5>
							<p>
								Some bump out there but some fun corners to tag if you haven't
								gotten wet yet. A blend of SSW and SW swells mixes with a bit of
								NW energy for continued waist-chest high surf at better breaks
								as standouts go head high on the larger ones. Light+ SW/SSW wind
								is responsible for that surface texture as the tide slides down
								to a modest 2:30pm low of 2.4'.
							</p>
							<h5>PM Forecast</h5>
							<p>
								Expecting a bit more bump to show through the middle of the
								afternoon as onshore flow picks up to more moderate levels,
								staying manageable through the middle of the afternoon before
								likely easing some into the evening for slightly smoother
								conditions. SW and SSW swells continue to keep the fun waves
								rolling in while that touch of juice out of the NW helps the
								beachbreaks provide the occasional preferred option for the
								regular footers out there.
							</p>
						</div>
						<a className="join-ad" href="/join">
							<div
								className="sign-up-ad"
								style={{
									backgroundImage: `url(${signUp})`,
								}}
							>
								<h2>Become a Premium Member Today!</h2>
								<h5>Gain Access to Premium Member Benefits</h5>
								<h3>Click Here To Sign Up!</h3>
							</div>
						</a>
					</div>
				</div>
				<div className="ad"></div>
			</div>
			<Footer />
		</>
	);
}
