import React from 'react';
import Body from './Body';
import CamSelect from './CamSelect';
import Footer from './Footer';
import SearchBar from './SearchBar';

export default function Home() {
  return (
    <div className="home-page">
      <div className="header">
        <SearchBar/>
      </div>
      <CamSelect/>
      <Body/>
      <Footer/>
    </div>
  )
}
