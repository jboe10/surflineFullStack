import React from 'react';

export default function ForecastHeader(props) {
	return (
		<div className="forecast-header">
			<div className="spot-info">
				<div className="region">
					{props.region.country}/{props.region.state}/{props.region.county}
				</div>
				<h4>{props.spot.name}</h4>
			</div>
			<div className="spot-extras">
				<a href="/">Regional Forecast</a>
				<a href="/">Premium Analysis</a>
				<a href="/">Charts</a>
				<a href="/">More!</a>
			</div>
		</div>
	);
}
