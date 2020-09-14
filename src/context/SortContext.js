import React, { createContext, useState, useEffect } from 'react';
import { pageimEndPoint } from '../Config';
export const SortContext = createContext();

// export const MenuContext = createContext();
const API_ENDPOINT = pageimEndPoint();



const SortContextProvider = (props) => {
    const [sortList, setSortList] = useState();

    let APP = window.location.pathname.toString();
    APP= APP?APP.substr(1).toLowerCase():'';


    useEffect(() => {
        if (localStorage['freeUserToken']) {
            const URL = `${API_ENDPOINT}/applications/getSort?appname=${APP}`;
            fetch(URL, {
                method: 'GET',
                headers: { Authorization: "Bearer " + localStorage['freeUserToken'] }
            })
                .then(response => {
                    return response.json()
                })
                .then(data => {
                   debugger
                    if (data && data.sortList) {
                        setSortList( [...data.sortList.map(x => ([x.name,x.label]))])

                    }
                }
                )
                .catch((error) => {
                    console.error('Error:', error);
                });
        }
    }, [sortList]);
  


    return (
            <SortContext.Provider value={[sortList]} >
                {props.children}
            </SortContext.Provider>
    )
}
export default SortContextProvider;

