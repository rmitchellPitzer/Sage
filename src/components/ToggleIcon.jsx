import React from 'react'
import '../App.css'

const ToggleIcon = ( props ) => {

  return (
  <div className="lightModeToggle">
                <div className="toggleCircle1">
                  <svg xmlns="http://www.w3.org/2000/svg" width="75" height="75" viewBox="0 0 24 24" fill={props.toggleOption == true ? "#4F5E50" : "#223430"} stroke={props.toggleOption == true ? "#4F5E50" : "#223430"} stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle></svg>
                </div>
                <div className="toggleSquare">
                <svg xmlns="http://www.w3.org/2000/svg" width="87" height="87" viewBox="0 0 24 24" fill={props.toggleOption == true ? "#4F5E50" : "#223430"} stroke={props.toggleOption == true ? "#4F5E50" : "#223430"} stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect></svg>                </div>
                <div className="toggleCircle2">
                <svg xmlns="http://www.w3.org/2000/svg" width="75" height="75" viewBox="0 0 24 24" fill={props.toggleOption == true ? "#4F5E50" : "#223430"} stroke={props.toggleOption == true ? "#4F5E50" : "#223430"} stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle></svg>
                </div>
              <div className= {props.toggleOption == true ? "toggleCircle3" : "toggleCircle4"}>
              <svg xmlns="http://www.w3.org/2000/svg" width="62" height="62" viewBox="0 0 24 24" fill={props.toggleOption == true ? "#D2D7C6" : "#556B61"} stroke={props.toggleOption == true ? "#D2D7C6" : "#556B61"} stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle></svg>
              </div>
            </div>  )
}

export default ToggleIcon