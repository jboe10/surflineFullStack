import React, {useState} from 'react';
import Body from './Body';
import CamSelect from './CamSelect';
import SearchBar from './SearchBar';
import SearchModal from './SearchModal';

export default function Home() {
  const [showSearchModal, setShowSearchModal] = useState(false);

  let searchModal;
  showSearchModal? searchModal = <SearchModal setShowSearchModal={setShowSearchModal}/> : searchModal = null;

  return (
    <div className="home-page">
      <div className="header">
        <SearchBar/>
      </div>
      <CamSelect/>
      {searchModal}
      <Body/>
    </div>
  )
}
