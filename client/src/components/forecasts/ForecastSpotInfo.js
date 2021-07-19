import React from 'react';
import { surfColorClassNameGen } from '../../utils/Helpers';
import signUp from '../../imgs/signUp.jpg';
import guy from '../../imgs/guy.jpg';
import ForecastSwellInfo from './ForecastSwellInfo';

const spotBar = 'spot-bar';

export default function ForecastSpotInfo(props) {
	const surfQualityColor = surfColorClassNameGen(spotBar, props.spot.quality);

	return (
		<>
			<div className="forecast-spot-info">
				<div className="surf-info">
					<div className={surfQualityColor}>
						<div className="spot-quality">{props.spot.quality}</div>
					</div>
				</div>
				<ForecastSwellInfo />
				<div className="author">
					<div className="author-info">
						<img className="author-img" src={guy} alt="author" />
						<div className="name-title">
							<div className="author-name">Mike Owhn</div>
							<div className="author-title">Forecaster</div>
						</div>
					</div>
					<div className="forecast-time">
						Last Updated Today, At this Time PDT
					</div>
				</div>
				<div className="area-forecast">
					<p>
						<span className="area-forecast-title">Am Forecast: </span>
						Some bump out there but some fun corners to tag if you haven't
						gotten wet yet. A blend of SSW and SW swells mixes with a bit of NW
						energy for continued waist-chest high surf at better breaks as
						standouts go head high on the larger ones. Light+ SW/SSW wind is
						responsible for that surface texture as the tide slides down to a
						modest 2:30pm low of 2.4'.
					</p>
					<p>
						<span className="area-forecast-title">Pm Forecast: </span>
						Expecting a bit more bump to show through the middle of the
						afternoon as onshore flow picks up to more moderate levels, staying
						manageable through the middle of the afternoon before likely easing
						some into the evening for slightly smoother conditions. SW and SSW
						swells continue to keep the fun waves rolling in while that touch of
						juice out of the NW helps the beachbreaks provide the occasional
						preferred option for the regular footers out there.
					</p>
				</div>
			</div>
			<a className="join-ad" href="/join">
				<div
					className="sign-up-ad"
					style={{
						backgroundImage: `url(${signUp})`,
					}}
				>
					<div className="sign-up-ad-info">
						<h2>Become a Premium Member Today!</h2>
						<h5>Gain Access to Premium Member Benefits</h5>
						<h3>Click Here To Sign Up!</h3>
					</div>
				</div>
			</a>
		</>
	);
}
