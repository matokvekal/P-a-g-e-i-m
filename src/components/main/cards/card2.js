import React, { useState, useEffect, useContext } from 'react';
import moment from 'moment';

import './card.css';
//import socketIOClient from 'socket.io-client';
import { ConfigContext } from '../../../../context/ConfigContext';
import { pageimEndPoint } from '../../../../Config';

export const Table2 = () => {
    const { config } = useContext(ConfigContext);
    const [data, setData] = useState([]);
    const API_ENDPOINT = pageimEndPoint();


    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ order: 'Last Name' })
    };
    //post
    // useEffect(() => {
    //   fetch(`${API_ENDPOINT}/rows`, requestOptions)
    // .then(response => response.json())
    // .then(data => this.setData(data.res));
    // }, [data]);

    {/*get*/ }
    useEffect(() => {
        fetch(`${API_ENDPOINT}/rows`)
            .then(response => response.json())
            .then(data => setData(data.res))
    }, [data]);


    return (
        <>

            <div className="text-center mb-2">
                <div className="row">
                    <div className="card-box border">
                        <i className={`fas fa-tag font-24`}></i>
                        <h3 className={'cardValueClass'}>
                            333
    </h3>
                        <p className="text-uppercase font-13 font-weight-medium mb-1">
                            fggrgrgt
    </p>
                    </div>




                </div>
            </div>

            <table id="example" className="display" >
                <thead>
                    <tr>
                        {config.map((header, i) => (
                            <th data-type="numeric"
                                style={{ width: `${header.width}px` }}
                                key={i}>
                                {header.name}
                                <span className="resize-handle">
                                </span>
                            </th>
                        ))
                        }
                    </tr>
                </thead>
                <tbody>
                    {data.slice(0, 100).map((el, i) => (
                        <>
                            <tr>
                                {config.map((header, i) => (
                                    <td style={{ width: `${header.width}px` }}
                                        key={i}>
                                        {el[header.name]}
                                    </td>
                                ))}
                            </tr>
                        </>
                    ))}

                </tbody>
            </table>
        </>
    )
}
export default Table2;






