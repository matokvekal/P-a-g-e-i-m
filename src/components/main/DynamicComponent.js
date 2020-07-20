import React, { useState,useEffect } from 'react';

function DynamicComponent(props) {
    debugger
    const [html] = useState(props.html);
   
    useEffect(() => {
        const main=document.getElementById('maindiv');
        if(html)
           main.innerHTML=html;
    }, [html])
    // const [appPermission] = useState(props.appPermission)
    return (
        <>
            <br />
            <br />
            <p>-------------------------------------</p>
            <h1>DYNAMIC PAGE </h1>
            <div id='maindiv'></div>
        </>
    )
}

export default DynamicComponent
