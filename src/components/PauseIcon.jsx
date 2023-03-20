import React from 'react'
import '../App.css'
const PauseIcon = (props ) => {
  return (
    <div className="playPauseIcon2">
    <div className="circleIcon">
      <svg xmlns="http://www.w3.org/2000/svg" width="115" height="115" viewBox="0 0 24 24" fill={props.toggleOption == true ? "#D2D7C6" : "#223430"} stroke={props.toggleOption == true ? "#D2D7C6" : "#223430"} stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle></svg>
    </div>
  <div className="pauseIcon">
  <svg xmlns="http://www.w3.org/2000/svg" width="95" height="95" viewBox="0 0 24 24" fill={props.toggleOption == true ? "#4F5E50" : "#556B61"} stroke={props.toggleOption == true ? "#4F5E50" : "#556B61"} stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>              </div>
</div>
  )
}

export default PauseIcon