import React from 'react'
import './stars.css'


 const Stars = (props) => {
    const count=Number(props.stars);
    let stars = [];
    debugger
    for (let i = 0; i < 5; ++i) {
        i<count?
        stars.push(<i className="fa fa-star checked" key={i}></i>):
        stars.push(<i className="fa fa-star" key={i}></i>)
      }
    return (
        <>
        {stars.map(x=>x)}
            
        </>
    )
}

  export default Stars
