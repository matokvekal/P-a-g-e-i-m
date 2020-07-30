import React, { createContext, useState, useEffect } from 'react';
import { pageimEndPoint } from '../Config';

export const MenuContext = createContext();


const API_ENDPOINT = pageimEndPoint();


const MenuContextProvider = (props) => {
    const [menuList, setMenuList] = useState([]);

    useEffect(() => {


        // if (localStorage['menu'] && localStorage['menu'] !== null  && localStorage['menu'] !== "[]")
        // setMenuList(JSON.stringify(localStorage['menu']))
        // else {
            if (!localStorage["freeUserToken"] || localStorage["freeUserToken"] === null || localStorage["freeUserToken"] === "undefined") {
                console.log('no user token Menu context')
            }
            else {
                debugger
                
                const URL = `${API_ENDPOINT}/applications/menuApplications?appname=races`;
                //const URL = `${API_ENDPOINT}/public/menu/data`;
                 //const URL = `${API_ENDPOINT}/applications/menuApplications?appname=menu`;
                fetch(URL, {
                    method: 'GET',
                    headers: { Authorization: "Bearer " + localStorage['freeUserToken'] }
                })
                    .then(response => {debugger
                        return response.json()})
                    .then(data => {debugger 
                        return setMenuList(data.appsresult[0])})
                    .catch((error) => {
                        console.error('Error:', error);
                    });
             }
        // }
    }, []);


    return (
        <MenuContext.Provider value={{ menuList }} >
            {props.children}
        </MenuContext.Provider>
    )
}
export default MenuContextProvider;

