import React from 'react';
import SmallArticle from '../SmallArticle';
import small1 from '../../imgs/small1.jpg';
import small2 from '../../imgs/small2.jpg';
import small3 from '../../imgs/small3.jpg';
import feature from '../../imgs/feature-lg.jpg'
import SearchBar from '../SearchBar';
import Footer from '../Footer';

export default function News() {
  return (
    <>
      <SearchBar/>
      <div className="news">
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
              summary="Destination South, a complete guide to surfing Baja"
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
      </div>
      <Footer/>
    </>
  )
}
