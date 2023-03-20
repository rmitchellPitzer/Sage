import React from 'react'
import '../App.css'

const DeleteIcon = () => {
    return (
        // <div className="deleteIcon">
        //     <div className="minusCircle">
        //         <svg xmlns="http://www.w3.org/2000/svg" width="65" height="65" viewBox="0 0 24 24" fill="#D2D7C6" stroke="#D2D7C6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle></svg>
        //         </div>
        //     <div className="minusIcon">
        //     <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24" fill="#4F5E50" stroke="#4F5E50" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line></svg>            </div>
        // </div>
        <div className="deleteIcon">
            <div className="minusCircle">
                <svg xmlns="http://www.w3.org/2000/svg" width="65" height="65" viewBox="0 0 24 24" fill="black" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle></svg>
                </div>
            <div className="minusIcon">
            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24" fill="black" stroke="black" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line></svg>            </div>
        </div>
      )
}

export default DeleteIcon