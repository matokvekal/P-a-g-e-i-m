import React, { useState, useEffect, useContext } from 'react';
import './Card2.css';
//import socketIOClient from 'socket.io-client';
import { ConfigContext } from '../../../context/ConfigContext';
// import { pageimEndPoint } from '../../../../Config';
import { pageimEndPoint } from '../../../../src/Config';
import Checkboxes from './cards-extra';


export const Card2 = (props) => {
    let app = props.app ? props.app : '';
    let APP = app ? app.substr(1) : '';
    APP = APP.toLowerCase();
    const [ tableFields ,setTableFields] = useContext(ConfigContext);

    // const { config } = useContext(ConfigContext);
    const [AppFields, setAppFields] = useState([]);
    useEffect(() => {
        if (!tableFields || tableFields.length===0){
          if(!localStorage['fields'] || localStorage['fields'].length===0)
              tableFields =JSON.parse(localStorage['fields']) ;
        }
        if (tableFields){
          setAppFields(tableFields.filter(x => x.application === APP));
        }
    
      }, [tableFields])

    const [data, setData] = useState([]);
    const API_ENDPOINT = pageimEndPoint();
    const [trigerFetch, setTrigerFetch] = useState([]);

    useEffect(() => {
        if (app === '/'||app==='/Templates')
          return
        if (!localStorage["freeUserToken"] || localStorage["freeUserToken"] === null || localStorage["freeUserToken"] === "undefined") {
          console.log('no freeUserToken table2')
        }
        else {
          const URL = `${API_ENDPOINT}/public${app}/data`;
          fetch(URL, {
            method: 'POST',
            headers: { Authorization: "Bearer " + localStorage['freeUserToken'] }
          }
          )
            .then(response => response.json())
            .then(res => setData(res))
            .catch((error) => {
              console.error('Error:', error);
            });
        }
    
      }, [AppFields, trigerFetch, global]);
    
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
                                    {AppFields.sort((a, b) => (a.order > b.order) ? 1 : -1).map((header, index1) => (
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

