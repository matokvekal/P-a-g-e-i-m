import React, { createContext, useState, useEffect } from 'react';
//import { UseLocalStorage } from '../helpers/LocalSrorage';
import { pageimEndPoint } from '../Config';
export const ConfigContext = createContext();


const API_ENDPOINT = pageimEndPoint();

const ConfigContextProvider = (props) => {
    const [config, setConfig] = useState([]);
    // data=UseLocalStorage("get","config");
   let d= window.localStorage.getItem('config');

    console.log("ConfigContextProvider ",d);
    useEffect(() => {
        console.log("at use efect");
            fetch(`${API_ENDPOINT}/fields`)
                .then(response => response.json())
                .then(data => setConfig(data.res))
                .then(console.log('after fetch',config))
                
                

    }, [])

    useEffect(()=>{
       localStorage.setItem('config',JSON.stringify(config));
       
     },[config])

    return (
        <ConfigContext.Provider value={{ config }}>
            {props.children}
        </ConfigContext.Provider>
    )
}
export default ConfigContextProvider;
