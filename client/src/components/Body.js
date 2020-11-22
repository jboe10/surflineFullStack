import React from 'react';
import SmallArticle from './SmallArticle';
import small1 from '../imgs/small1.jpg';
import small2 from '../imgs/small2.jpg';
import small3 from '../imgs/small3.jpg';
import hb from '../imgs/hb.jpg';
import waves from '../imgs/waves.jpg';
import feature from '../imgs/feature-lg.jpg'

export default function Body() {
  return (
    <div className="body">
      <div className="articles">
        <a href="/article/feature">
          <div className="featured-article" style={{backgroundImage: `url(${feature})`}}>
            <div className="article-feature">
              <h2>
                Surfing Alone? Not Anymore
              </h2> 
            </div>
          </div>
        </a>
        <div className="other-articles">
          <SmallArticle
            link="/article/1"
            img={small1}
            title="Top Turns, Making Them Look Easy"
            summary="Pro surfer Jordy Smith lends Surfline and Co. a few tips on top turns"
            type="Advice"
          />
           <SmallArticle
            link="/article/2"
            img={small2}
            title="Floating Through Baja"
            summary="Destination South, a complete guide to surfing Baja."
            type="Trips"
          />
           <SmallArticle
            link="/article/3"
            img={small3}
            title="Where Did All The Time Go?"
            summary="Cant find time for surfing, or are you really even trying anymore?"
            type="Lifestyle"
          />
        </div>
      </div>
      <div className="forecasts">
        <a href="">
          <div className="surf-break-of-day" style={{backgroundImage: `url(${hb})`}}>
            <div className="spot-name">
              <span className="dot"></span>
              HB Northside Pier
            </div>
            <div className="spot-conditions">
              <div className="condition height">4-6ft</div>
              <div className="condition tide">0.7ft</div>
              <div className="condition wind">6kts</div>
            </div>
          </div>
        </a>
        <div className="area-forecast">
          <h3>Regional Forecast - North Orange County</h3>
          <h5>AM Forecast</h5>
          <p>Clean Fun Surf on Tap, 1.5' low tide at bottoms out at 10am with clean glassy conditions. Peaky A-Frames and plenty of rippable shoulders.</p>
          <h5>PM Forecast</h5>
          <p>Tide push maxes out a 3.5' at 3pm, predicting swamped out conditions. However winds stay down and conditions improve with the tidal draw. Best bet ~5pm.</p>
        </div>
        <a href="/join">
          <div className="sign-up-ad" style={{backgroundImage: `url(${waves})`}}>
            <h2>Become a Premium Member Today!</h2>
            <h5>Gain Access to Premium Member Benefits</h5>
            <h3>Click Here To Sign Up!</h3>
          </div>
        </a>
      </div>
    </div>
  )
}
