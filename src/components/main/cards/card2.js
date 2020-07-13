import React, { useState, useEffect, useContext } from 'react';
import './Card2.css';
//import socketIOClient from 'socket.io-client';
import { ConfigContext } from '../../../context/ConfigContext';
// import { pageimEndPoint } from '../../../../Config';
import { pageimEndPoint } from '../../../../src/Config';
import Checkboxes from './cards-extra';


export const Card2 = () => {
    const { config } = useContext(ConfigContext);

    const [data, setData] = useState([]);
    const API_ENDPOINT = pageimEndPoint();


    {/*get*/ }
    useEffect(() => {
        fetch(`${API_ENDPOINT}/rows`)
            .then(response => response.json())
            .then(data => setData(data.res))
    }, [data]);

    return (
        <>
            <div className="container">
                <main className='cards'>
                    {data.slice(0, 100).map((el, i) => (
                        <>
                            <span className='card'>
                                <div className='card_header'>
                                    <div className="card-title">
                                        <Checkboxes />
                                    </div>
                                </div>
                                <div className=' card_content'>
                                    {config.map((header, i) => (
                                        <>
                                        <span className='cardLine'>
                                            <label className='label' >{header.name}:</label>
                                            <span className='input'
                                                key={i}>
                                                {el[header.name]}
                                            </span>
                                            </span>
                                        </>
                                    ))}
                                </div>
                                <div className="card_info">
                                    <div>
                                        <i className="material-icons">thumb_up</i>310
                          </div>
                                    <div>
                                        <a href="./" className="card_link">more ...</a>
                                    </div>
                                </div>
                            </span>
                        </>
                    ))}

                </main>
            </div>
        </>
    )
}
export default Card2;

