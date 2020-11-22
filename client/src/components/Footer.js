import React from 'react';
import surfline from '../imgs/srflinelogo.png';
import fb from '../imgs/fb.svg';
import ig from '../imgs/ig.svg';
import twitter from '../imgs/twitter.svg';
import youtube from '../imgs/youtube.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';

export default function Footer() {
  return (
    <div className="footer">
      <div className="info">
        <div className="surfline-info">
          <img src={surfline} className="large-logo"  alt="ff"/>
          <ul>
            <li>@200 surfline/Wavestrak, Inc.</li>
            <li>Terms of Use and Privacy Policy.</li>
            <li>Partner of USATODAY Lifestyle/Action Sports</li>
          </ul>
        </div>
        <div className="surfline-info">
          <h4>Company</h4>
          <ul>
            <li><a href="#">About Surfline</a></li>
            <li><a href="#">Careers</a></li>
            <li><a href="#">Advertise</a></li>
            <li><a href="#">Ocean Consulting</a></li>
          </ul>
        </div>
        <div className="surfline-info">
          <h4>Support</h4>
          <ul>
            <li><a href="#">Support Center</a></li>
            <li><a href="#">My Account</a></li>
            <li><a href="#">Get Premium</a></li>
            <li><a href="#">Gift Cards</a></li>
          </ul>
        </div>
        <div className="social-lnks">
          <a className="square" href="#">
            <img src={fb}/> 
          </a>
          <a className="square" href="#">
            <img src={ig}/>
          </a> 
          <a className="square" href="#">
            <img src={youtube}/>
          </a> 
          <a className="square" href="#">
            <img src={twitter}/>
          </a>
        </div>
      </div>
    </div>
  )
}
