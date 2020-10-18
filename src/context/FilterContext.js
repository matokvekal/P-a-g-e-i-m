import React, { createContext, useState, useEffect } from 'react';
import { pageimEndPoint } from '../Config';
import deviceIdentity from './../helpers/Helpers';
export const FilterContext = createContext();
// export const SortContext = createContext();
const API_ENDPOINT = pageimEndPoint();



const FilterContextProvider = (props) => {
    const [filters, setFilters] = useState([]);
    // const [sortList, setSortList] = useState();
    // let app = props.app ? props.app : '';
    // let APP = app ? app.substr(1) : '';
    // APP = APP.toLowerCase();
    let APP = window.location.pathname.toString();
    APP= APP?APP.substr(1).toLowerCase():'';
    useEffect(() => {
        if (localStorage['deviceIdentity']) {
            const URL = `${API_ENDPOINT}/pageim/getFilter?appname=${APP}`;
            fetch(URL, {
                method: 'GET',
                headers: { Authorization: "Bearer " + localStorage['deviceIdentity'] }
            })
                .then(response => {
                    return response.json()
                })
                .then(data => {

                    if (data && data.filters && data.selectedfilters) {
                        setFilters((x) => {
                           // debugger
                            const newFilters = data.filters.map((item, index) => {
                                //debugger
                                if (data.selectedfilters.find((x) => x.field === item.field && x.data === item.data)) {
                                    return {
                                        ...item,
                                        checked: true,
                                        filterId: index,
                                    };
                                } else {
                                    return {
                                        ...item,
                                        filterId: index,
                                    };
                                };
                            });
                            return newFilters;
                        })
                    }
                }
                )
                .catch((error) => {
                    console.error('Error:', error);
                });
        }
    }, []);

    // useEffect(() => {
    //     if (localStorage['deviceIdentity']) {
    //         const URL = `${API_ENDPOINT}/applications/getSort?appname=${APP}`;
    //         fetch(URL, {
    //             method: 'GET',
    //             headers: { Authorization: "Bearer " + localStorage['deviceIdentity'] }
    //         })
    //             .then(response => {
    //                 return response.json()
    //             })
    //             .then(data => {
    //                 if (data && data.sortList) {
    //                     setSortList( [...data.sortList.map(x => ([x.name,x.label]))])

    //                 }
    //             }
    //             )
    //             .catch((error) => {
    //                 console.error('Error:', error);
    //             });
    //     }
    // }, []);
  


    return (
        <FilterContext.Provider value={[filters, setFilters]} >
            {/* <SortContext.Provider value={[sortList]} > */}
                {props.children}
            {/* </SortContext.Provider> */}
        </FilterContext.Provider >
    )
}
export default FilterContextProvider;

