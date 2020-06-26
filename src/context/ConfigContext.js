import React, { createContext, useState, useEffect } from 'react';
import { pageimEndPoint } from '../Config';
export const ConfigContext = createContext();
const API_ENDPOINT = pageimEndPoint();
let APP = window.location.pathname.toString();
APP = APP ? APP.substr(1) : '';

const ConfigContextProvider = (props) => {
    const [appFields, setAppFields] = useState([]);
    const [fields, setFields] = useState([]);

    useEffect(() => {
console.log("At config context")
        if (!localStorage["freeUserToken"] || localStorage["freeUserToken"] === null || localStorage["freeUserToken"] === "undefined") {
            const AUTHURL = `${API_ENDPOINT}/session/createNewUserDevice`;
            fetch(AUTHURL)
                .then(async response => {
                    const data = await response.json();
                    if (!response.ok || !data.success) {
                        console.log('Error: config context', data.message)
                    }
                    else {
                        localStorage["freeUserToken"] = data.token;
                        window.location.reload();
                    }
                })
                .then(res => console.log(res))
        }
        else {
            console.log("At config context get fields",fields)
            const URL = `${API_ENDPOINT}/public/fields/data?client=1`;
            fetch(URL, {
                method: 'POST',
                headers: { Authorization: "Bearer " + localStorage['freeUserToken'] }
            })
                .then(response => response.json())
                .then(data => setFields(data))
                .catch((error) => {
                    console.error('Error:', error);
                });
        }
    }, [global]);
    
    useEffect(() => {
        console.log("At config context get fields",fields)
        if (fields && fields.length > 0) {
            setAppFields(fields.filter(x => x.application === APP))
        }
    }, [fields])



    return (
        <ConfigContext.Provider value={{ appFields }} >
            {props.children}
        </ConfigContext.Provider>
    )
}
export default ConfigContextProvider;

