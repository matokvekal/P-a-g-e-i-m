import React, { createContext, useState, useEffect } from 'react';
import { pageimEndPoint } from '../Config';

export const MenuContext = createContext();


const API_ENDPOINT = pageimEndPoint();


const MenuContextProvider = (props) => {
    const [menuList, setMenuList] = useState([]);
    // const [setHasError] = useState(false);
    // const [setErrorMsg] = useState('');

    useEffect(() => {
        // if (localStorage['menu'] && localStorage['menu'] !== null  && localStorage['menu'] !== "[]")
        // setMenuList(JSON.stringify(localStorage['menu']))
        // else {
            if (!localStorage["freeUserToken"] || localStorage["freeUserToken"] === null || localStorage["freeUserToken"] === "undefined") {
                console.log('no user token Menu context')
            }
            else {
                const URL = `${API_ENDPOINT}/public/menu/data`;
                fetch(URL, {
                    method: 'POST',
                    headers: { Authorization: "Bearer " + localStorage['freeUserToken'] }
                })
                    .then(response => response.json())
                    .then(data => setMenuList(data))
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

