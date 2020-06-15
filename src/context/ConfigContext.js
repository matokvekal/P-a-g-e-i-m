import React, { createContext, useState, useEffect } from 'react';
import { pageimEndPoint } from '../Config';
export const ConfigContext = createContext();


const API_ENDPOINT = pageimEndPoint();


const ConfigContextProvider = (props) => {
    const [config, setConfig] = useState([]);
    // let d = window.localStorage.getItem('config');
    const [ setHasError] = useState(false);
    const [ setErrorMsg] = useState('');
    const [ setData] = useState([]);
    useEffect(() => {
        let APP = window.location.pathname.toString();
        APP= APP?APP.substr(1):'';
        if (!localStorage["freeUserToken"] || localStorage["freeUserToken"] === null || localStorage["freeUserToken"] === "undefined") {
            const AUTHURL = `${API_ENDPOINT}/session/createNewUserDevice`;
            fetch(AUTHURL)
                .then(async response => {
                    const data = await response.json();
                    if (!response.ok || !data.success) {
                        setErrorMsg(data.message);
                        setHasError(true);
                    }
                    else {
                        localStorage["freeUserToken"] = data.token;
                        // window.location.reload();
                    }
                })
                .catch(error => {
                    this.setState({ errorMessage: error.toString() });
                });
        }
        else {
            const URL = `${API_ENDPOINT}/public/fields/data?application=${APP}`;
            fetch(URL, {
                method: 'POST',
                headers: { Authorization: "Bearer " + localStorage['freeUserToken'] }
            })
                .then(response => response.json())
                .then(data => setConfig(data))
                .catch((error) => {
                    console.error('Error:', error);
                });
        }
    }, [global]);
    // useEffect(() => {
    //     fetch(`${API_ENDPOINT}/fields`)
    //         .then(response => response.json())
    //         .then(data => setConfig(data.res))
    // }, [])

    useEffect(() => {
        localStorage.setItem('config', JSON.stringify(config));
    }, [config])

    return (
        <ConfigContext.Provider value={{ config }} >
            {props.children}
        </ConfigContext.Provider>
    )
}
export default ConfigContextProvider;

