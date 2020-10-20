import React from 'react';

import './stars.css';


 export const Stars = (props) => {
    const percent=Number(props.rating);

    return (
        <>
   
        <div className="rating__star star-ratings-sprite">{}
         <span style={{width: percent+"%"}} className="star-ratings-sprite-rating" title="PIC">
         </span>
        </div>
        </>
    )
}

  export default Stars
