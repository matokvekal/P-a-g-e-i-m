import React, { createContext, useState, useEffect } from 'react';
import { pageimEndPoint } from '../Config';
import deviceIdentity from './../helpers/Helpers';
import { atom, useRecoilState } from 'recoil';
export const ConfigContext = createContext();


const API_ENDPOINT = pageimEndPoint();

const ConfigContextProvider = (props) => {
    const [tableFields, setTableFields] = useState([]);

      let APP = window.location.pathname.toString();
    APP= APP?APP.substr(1).toLowerCase():'';

    const isLogIn = atom({
        key: "_logIn",
        default: 'false',
      });
      const [login, setLogin] = useRecoilState(isLogIn);
    
      useEffect(() => {
        if (localStorage["isLogin"] && localStorage["isLogin"] === 'true')
          setLogin(true);
        else
          setLogin(false);
      }, [])

    useEffect(() => {
        if (!deviceIdentity())  
        return
            const URL= `${API_ENDPOINT}/pageim/fieldsOfTable?appname=${APP}`;
            fetch(URL, {
                method: 'GET',
                headers: { Authorization: "Bearer " + localStorage['deviceIdentity'] }
            })
                .then(response =>{
                    return response.json()})
                .then(data => {
                    debugger
                    setTableFields(data.data)})
                .catch((error) => {
                    debugger

                    console.error('Error:', error);
                });
        
  
    }, []);
    
    useEffect(() => {
        if (tableFields && tableFields.length > 0 ) {
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
                setTableFields(x=>tableFields);
            if(APP)
              localStorage['fields_'+APP]=JSON.stringify(tableFields);
        }
        else
        console.log('no tableFields')
    }, [tableFields])



    return (
        <ConfigContext.Provider value={[ tableFields ,setTableFields]} >
            {props.children}
        </ConfigContext.Provider>
    )
}
export default ConfigContextProvider;

