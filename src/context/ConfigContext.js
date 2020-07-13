import React, { createContext, useState, useEffect } from 'react';
import { pageimEndPoint } from '../Config';
export const ConfigContext = createContext();
const API_ENDPOINT = pageimEndPoint();


const ConfigContextProvider = (props) => {
    const [tableFields, setTableFields] = useState([]);

    useEffect(() => {
//  debugger
            if(localStorage['freeUserToken']){
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
        }
    }, [tableFields])



    return (
        <ConfigContext.Provider value={{ tableFields }} >
            {props.children}
        </ConfigContext.Provider>
    )
}
export default ConfigContextProvider;

