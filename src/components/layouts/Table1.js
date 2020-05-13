import React, { useState, useEffect } from 'react';
import { PageimEndPoint } from '../../Config';



export const Table1 = (props) => {
    const headers = { props };

    const API_ENDPOINT = PageimEndPoint();
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch(`http://yonaswr.com/files/rows`)
            .then(response => response.json())
            .then(data => setData(data.res))
    },[data]);

    return (
        <>
            <h1 >table </h1>
            {console.log('at table1')}

            <h3>data</h3>
            {data.slice(0, 10).map((el, i) => (
                <div key={i}>{el.type}</div>
            ))}

        </>
    );
}




export default Table1;