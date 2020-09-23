import React, { createContext, useState ,useEffect} from 'react';
import { pageimEndPoint } from '../Config';
import deviceIdentity from './../../src/helpers/Helpers';
const API_ENDPOINT = pageimEndPoint();

export const GlobalContext = createContext(null);

const GlobalContextProvider = (props) => {
    
    const [global, setGlobal] = useState([{countHiddenFields:0},]);
    function settingGlobal(count){
        setGlobal([{countHiddenFields:count},]);
    }
useEffect(() => {
    debugger
    if (!deviceIdentity()) {
        const AUTHURL = `${API_ENDPOINT}/session/createNewUserDevice`;
        fetch(AUTHURL)
            .then(async response => {
                const data = await response.json();
                if (!response.ok || !data.success) {
                    console.log('Error: config context', data.message)
                }
                else {
                    localStorage["deviceIdentity"] = data.token;
                    window.location.reload();
                }
            })
    }
}, [])
    return (
        <GlobalContext.Provider value={{ global ,settingGlobal}} >
            {props.children}
        </GlobalContext.Provider>
    )
}
export default GlobalContextProvider;

