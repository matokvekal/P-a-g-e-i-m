import React from 'react';

import './stars.css';


 export const Stars = (props) => {
    const percent=Number(props.rating);
    // let stars = [];
    // debugger
    // for (let i = 0; i < 5; ++i) {
    //     i<count?
    //     stars.push(<i className="fa fa-star checked" key={i}></i>):
    //     stars.push(<i className="fa fa-star" key={i}></i>)
    //   }
    return (
        <>
        {/* {stars.map(x=>x)} */}
   
        <div className="rating__star star-ratings-sprite">{}
         <span style={{width: percent+"%"}} className="star-ratings-sprite-rating" title="PIC">
         </span>
        </div>
        </>
    )
}

  export default Stars
