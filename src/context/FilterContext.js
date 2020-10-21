import React, { createContext, useState, useEffect } from 'react';
import { pageimEndPoint } from '../Config';
import deviceIdentity from './../helpers/Helpers';
export const FilterContext = createContext();
const API_ENDPOINT = pageimEndPoint();



const FilterContextProvider = (props) => {
    const [filters, setFilters] = useState([]);

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
                            const newFilters = data.filters.map((item, index) => {
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

  
    return (
        <FilterContext.Provider value={[filters, setFilters]} >
                {props.children}
        </FilterContext.Provider >
    )
}
export default FilterContextProvider;

