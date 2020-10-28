import { GolfCourseOutlined } from '@material-ui/icons';
import React, { createContext, useState, useEffect } from 'react';
import { Redirect,Route } from 'react-router-dom';
import { pageimEndPoint } from '../Config';
import deviceIdentity from './../helpers/Helpers';
export const SortContext = createContext();

// export const MenuContext = createContext();
const API_ENDPOINT = pageimEndPoint();



const SortContextProvider = (props) => {
    const [sortList, setSortList] = useState();
    const[clearLocalStorage,setClearLocalStorage]=useState(false);
    let APP = window.location.pathname.toString();
    APP= APP?APP.substr(1).toLowerCase():'';


    React.useEffect(() => {
        if(clearLocalStorage){
            debugger
            localStorage.removeItem('deviceIdentity');
            if (APP &&localStorage['fields_'+APP])
              localStorage.removeItem('fields_'+APP);

        }
      }, [clearLocalStorage]);


    useEffect(() => {
        if (!APP ||!deviceIdentity())  
        return
            const URL = `${API_ENDPOINT}/pageim/getSort?appname=${APP}`;
            fetch(URL, {
                method: 'GET',
                headers: { Authorization: "Bearer " + localStorage['deviceIdentity'] }
            })
                .then(response => {
                    //debugger
                    if(response.status===401)
                    {debugger
                        setClearLocalStorage(true)
                    } 
                    

                    return response.json()
                })
                .then(data => {
                    //debugger
                    if (data && data.sortList) {
                        setSortList( [...data.sortList.map(x => ([x.name,x.label]))])

                    }
                }
                )
                .catch((error) => {
                    console.error('Error:', error);
                });
        
        }, [])
  


    return (
            <SortContext.Provider value={[sortList]} >
                {props.children}
            </SortContext.Provider>
    )
}
export default SortContextProvider;

