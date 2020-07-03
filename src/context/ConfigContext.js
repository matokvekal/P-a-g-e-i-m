import React, { createContext, useState, useEffect } from 'react';
import { pageimEndPoint } from '../Config';
export const ConfigContext = createContext();
const API_ENDPOINT = pageimEndPoint();
// let APP = window.location.pathname.toString();
// APP = APP ? APP.substr(1) : '';

const ConfigContextProvider = (props) => {
    // const [appFields, setAppFields] = useState([]);
    const [tableFields, setTableFields] = useState([]);

    useEffect(() => {
        
        // debugger
//  console.log("At config context")
        // if (!localStorage["freeUserToken"] || localStorage["freeUserToken"] === null || localStorage["freeUserToken"] === "undefined") {
        //     const AUTHURL = `${API_ENDPOINT}/session/createNewUserDevice`;
        //     fetch(AUTHURL)
        //         .then(async response => {
        //             const data = await response.json();
        //             if (!response.ok || !data.success) {
        //                 console.log('Error: config context', data.message)
        //             }
        //             else {
        //                 localStorage["freeUserToken"] = data.token;
        //                 window.location.reload();
        //             }
        //         })
        //         // .then(res => console.log(res))
        // }
        // else {
            // debugger
            if(localStorage['freeUserToken']){
            // console.log("At config context get fields",tableFields)
            const URL = `${API_ENDPOINT}/public/fields/data`;
            fetch(URL, {
                method: 'POST',
                headers: { Authorization: "Bearer " + localStorage['freeUserToken'] }
            })
                .then(response => response.json())
                .then(data => setTableFields(data))
                .catch((error) => {
                    console.error('Error:', error);
                });
        }
  
    }, []);
    
    useEffect(() => {
        //  console.log("At config context setAppFields has change 46",tableFields)
        if (tableFields && tableFields.length > 0) {
            for (let row of tableFields) {
                row.clienSort = false;
                row.clientSortOrder = null;
                row.clientSortIcon = null;
                row.clientSortDirection = null;
                row.clientHide = false;
                row.clientAggregation = false;
                row.clientAggrigationIcon = 'far fa-square';
                row.clientFilter = false;
                row.clientFilterIconColor = 'colorWhite';
                row.clientTableHideColumn = false;
                row.clientId = 'Id_' + row.name;
                row.dragable = true;
                row.clientFilterHeaderCheckbox = false;
                }
            localStorage['fields']=JSON.stringify(tableFields);
            // setAppFields(tableFields.filter(x => x.application === APP));//not in use
            // console.log('At config   49 setAppFields has change and localStorage reset ',tableFields)
        }
    }, [tableFields])



    return (
        <ConfigContext.Provider value={{ tableFields }} >
            {props.children}
        </ConfigContext.Provider>
    )
}
export default ConfigContextProvider;

