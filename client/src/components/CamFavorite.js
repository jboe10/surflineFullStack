import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVideo } from '@fortawesome/free-solid-svg-icons';

export default function CamFavorite(props) {
	let surfQualityColor;
	switch (props.quality) {
		case 'epic':
			surfQualityColor = 'surf-quality orange-surf';
			break;
		case 'good':
			surfQualityColor = 'surf-quality green-surf';
			break;
		case 'fair':
			surfQualityColor = ' surf-quality blue-surf';
			break;
		case 'poor':
			surfQualityColor = 'surf-quality gray-surf';
			break;
		default:
			surfQualityColor = 'surf-quality gray-surf';
			break;
	}

	return (
		<div className="favorite-cam-item-wrap">
			<a href={`/forecasts/${props.id}`}>
				<div className="favorite-cam-item">
					<div className="cam-name">
						{props.name}
						<FontAwesomeIcon icon={faVideo} />
					</div>
					<div className="surf-conditions">
						<div className={surfQualityColor}>
							{props.quality}
						</div>
						<div className="surf-height">
							{props.height}
							<span>ft</span>
						</div>
					</div>
				</div>
			</a>
		</div>
	);
}
