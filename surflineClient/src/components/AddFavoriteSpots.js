import React, { useEffect, useRef, useState } from 'react';
import { getSpotList, getUserInfo, updateUserSpots } from '../api/UserApi';

export default function AddFavoriteSpots(props) {
  const [checkBoxSpots, setCheckBoxSpots] = useState([]);
  const backgroundDiv = useRef(null);

  useEffect(() => {
    const spotLists =  async () => {  
      // Get list of all Spots
      const spots = await getSpotList();
      // Get list of users Favorite Spots
      try {
        const userInfo = await getUserInfo();
        // Make a hash of spots based on IDS for checkboxes 
        const hashOfUsersSpots = convertArrayToHashOfId(userInfo.favoriteSpots, '_id');
        // Find out which Checkboxes to set to checked or not Checked and put them in an array
        setCheckBoxSpots(spots.map(spot => {
          const obj = {};
          // Check hash of users favorite spots against all spots
          if (hashOfUsersSpots[spot._id] === "") {
            obj['checked'] = true;
          } else {
            obj['checked'] = false;
          }
          obj['_id'] = spot._id;
          obj['spot'] = spot;
          return obj;
        }));
      } catch(error) {
        props.setShow(false);
        alert("Please Sign In To Continue")
      }
    }
    spotLists();
  }, [])

  const convertArrayToHashOfId = (array, key) => {
    const initialValue = {};
    return array.reduce((obj, item) => {
      return {
        ...obj,
        [item[key]]: "",
      };
    }, initialValue);
  }

  const Checkbox = (props) => (
    <input className="checkBox" type="checkbox" {...props} />
  )

  const handelCheckBoxChange = (event, id) => {
    let checkBoxSpotsCopy = [ ...checkBoxSpots ];
    checkBoxSpotsCopy = checkBoxSpotsCopy.map(box => {
      if (box._id === id) {
        return { ...box, checked: event.target.checked}
      }
      return box
    });
    return checkBoxSpotsCopy;
  }

  const saveClickHandler = async() => {
    const checked = checkBoxSpots.reduce((aa, {checked, _id}) => {
      if (checked === true) {
        aa.push(_id)
      }
      return aa;
    },[]);

    // Set Users Favorite Spots
    await updateUserSpots(checked);
    props.setShow(false);
  }

  const clickOutsideOfCheckboxHandler = (event) => {
    if (event.target === backgroundDiv.current) {
      props.setShow(false);
    }
  }

  return (
    <div 
      className="add-favorite-spots"
      onClick={(event) => clickOutsideOfCheckboxHandler(event)}
      ref={backgroundDiv}
    >
      <div className="spots-modal">
        <div className="checkbox-wrap">
          {checkBoxSpots.map((check, index) => (
            <div className="checkboxes" key={check.spot._id}>
              <Checkbox
                type="checkbox"
                name={check.spot.name}
                checked={check.checked}
                onChange={(event) => setCheckBoxSpots(handelCheckBoxChange(event, check.spot._id))}
              />
              <label>
                {check.spot.name}
              </label>
            </div>
          ))}
        </div>
        <div className="save-cancel">
          <div className="save">
            <button
              onClick={() => saveClickHandler()}
            >
              Save
            </button>
          </div>
          <div className="cancel">
            <button
              onClick={() => props.setShow(false) }
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
