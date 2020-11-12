import React from 'react'

export default function DropdownMenu(props) {
  const firstHalfSpots = props.spots.slice(0,Math.floor(props.spots.length/2));
  const secondHalfSpots = props.spots.slice(Math.ceil(props.spots.length/2),props.spots.length);
 
  return (
    <div className="dropdown">
      <div className="half">
        {firstHalfSpots.map(spot => (
          <a key={spot._id} className="spot-link" href={`${props.link}${spot._id}`}>{spot.name}</a>
        ))}
      </div>
      <div className="half">
        {secondHalfSpots.map(spot => (
          <a key={spot._id} className="spot-link" href={`${props.link}${spot._id}`}>{spot.name}</a>
        ))}
      </div>
    </div>
  )
}
