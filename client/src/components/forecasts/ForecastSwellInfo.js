import React from 'react';

export default function ForecastSwellInfo() {
	return (
		<div className="forecast-swell-info">
			<div className="main-swell-info">
				<div className="swell-info-wrap">
					<div className="swell-info">
						<h6>Surf Height</h6>
						<div className="swell-info-value">
							3-4<span className="sub-text">ft</span>+
						</div>
						<div className="swell-info-sub-value">
							Waist to shoulder High occ. 5ft
						</div>
					</div>
				</div>

				<div className="swell-info-wrap">
					<div className="swell-info">
						<h6>Tide</h6>
						<div className="swell-info-value">
							4.9<span className="sub-text">ft</span>
						</div>
						<div className="swell-info-sub-value">
							High tide 6.1ft at 9:22pm
						</div>
					</div>
				</div>

				<div className="swell-info-wrap">
					<div className="swell-info">
						<h6>Wind</h6>
						<div className="swell-info-value">
							8<span className="sub-text">Kts</span>
						</div>
						<div className="swell-info-sub-value">WSW (245°)</div>
					</div>
				</div>

				<div className="swell-info-wrap">
					<div className="summary-of-swells">
						<h6>Swells</h6>
						<div className="swell-summary">
							<div className="circle orange-surf"></div>
							<div className="swell-height-direction">1.7ft at 18s S 186º</div>
						</div>
						<div className="swell-summary">
							<div className="circle blue-surf"></div>
							<div className="swell-height-direction">1.8ft at 12s S 178º</div>
						</div>
						<div className="swell-summary">
							<div className="circle green-surf"></div>
							<div className="swell-height-direction">0.9ft at 6s W 270º</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
