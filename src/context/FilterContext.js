import React, { createContext, useState, useEffect } from 'react';
import { pageimEndPoint } from '../Config';
export const FilterContext = createContext();
const API_ENDPOINT = pageimEndPoint();


const FilterContextProvider = (props) => {
    const [filters, setFilters] = useState([]);

    useEffect(() => {
            if(localStorage['freeUserToken']){

            const URL= `${API_ENDPOINT}/applications/filterapp?appname=races`;
            fetch(URL, {
                method: 'GET',
                headers: { Authorization: "Bearer " + localStorage['freeUserToken'] }
            })
                .then(response =>{
                    debugger
                    return response.json()})
                .then(data => {
                    debugger
                    setFilters(data.data)})
                .catch((error) => {
                    console.error('Error:', error);
                });
        }
  
    }, []);
    
    useEffect(() => {
       debugger
      if (filters && filters.length > 0) {
        for (let row of filters) {
            filters.selected = false;//TODO TEST ONLY this shuld be remove ,we will update from userState
           
            }
            setFilters(filters);
      }
      else
      {
          console.log('No filters')
      }

    }, [filters])
//     useEffect(() => {
//       if (filters && filters.length > 0) {
//          setFilters(x=>filters);
//           localStorage['filters']=JSON.stringify(filters);
//       }
//       else
//       console.log('no filters')
//   }, [filters])



    return (
        <FilterContext.Provider value={[ filters, setFilters]} >
            {props.children}
        </FilterContext.Provider>
    )
}
export default FilterContextProvider;

