import React from 'react'
import SearchBar from '../SearchBar';
import waves from '../../imgs/waves.jpg';
import Footer from '../Footer';

export default function Forecast(props) {
  let surfQualityColor = "spot-bar";
  switch(props.spot.quality) {
    case "epic": 
      surfQualityColor = "spot-bar orange-surf" 
      break;
    case "good": 
      surfQualityColor = "spot-bar green-surf" 
      break;
    case "fair": 
      surfQualityColor = " spot-bar blue-surf" 
      break;
    case "poor": 
      surfQualityColor = "spot-bar gray-surf" 
      break;
    default: 
      surfQualityColor = "spot-bar gray-surf" 
      break;
  }

  function importAll(r) {
    return r.keys().map(r);
  }

  function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
  }
  
  const images = importAll(require.context('../../imgs/forecasts', false, /\.(png|jpe?g|svg)$/));

  return (
    <>
      <SearchBar/>
      <div className="forecast-wrap">
        <div className="forecast">
          <img src={images[getRndInteger(0, images.length -1)]} alt="ff"/>
          <div className="info-wrap">
            <div className="info">
              <div className={surfQualityColor}>
                <div className="spot-name">
                  {props.spot.name}
                </div>
                <div className="spot-quality">
                  {props.spot.quality}
                  <span>{props.spot.size}ft.</span>
                </div>
              </div>
            </div>
            <div className="area-forecast">
              <h3>Regional Forecast - North Orange County</h3>
              <h5>AM Forecast</h5>
              <p>Clean Fun Surf on Tap, 1.5' low tide at bottoms out at 10am with clean glassy conditions. Peaky A-Frames and plenty of rippable shoulders.</p>
              <h5>PM Forecast</h5>
              <p>Tide push maxes out a 3.5' at 3pm, predicting swamped out conditions. However winds stay down and conditions improve with the tidal draw. Best bet ~5pm.</p>
            </div>
            <a className="ad" href="/join">
              <div className="sign-up-ad" style={{backgroundImage: `url(${waves})`}}>
                <h2>Become a Premium Member Today!</h2>
                <h5>Gain Access to Premium Member Benefits</h5>
                <h3>Click Here To Sign Up!</h3>
              </div>
            </a>
          </div>
        </div> 
        <div className="ad">
        </div>
      </div>
      <Footer/>
    </>
  )
}
