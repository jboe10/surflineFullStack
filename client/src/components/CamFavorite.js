import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVideo } from '@fortawesome/free-solid-svg-icons';
import { surfColorClassNameGen } from '../utils/Helpers';

const surfQuality = 'surf-quality';

export default function CamFavorite(props) {
	const surfQualityColor = surfColorClassNameGen(surfQuality, props.quality);

	return (
		<div className="favorite-cam-item-wrap">
			<a href={`/forecasts/${props.id}`}>
				<div className="favorite-cam-item">
					<div className="cam-name">
						{props.name}
						<FontAwesomeIcon icon={faVideo} />
					</div>
					<div className="surf-conditions">
						<div className={surfQualityColor}>{props.quality}</div>
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
