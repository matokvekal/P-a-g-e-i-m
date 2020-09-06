import React, { createContext, useState, useEffect } from 'react';
import { pageimEndPoint } from '../Config';
export const FilterContext = createContext();
const API_ENDPOINT = pageimEndPoint();


const FilterContextProvider = (props) => {
    const [filters, setFilters] = useState([]);

    useEffect(() => {
        if (localStorage['freeUserToken']) {

            const URL = `${API_ENDPOINT}/applications/filterapp?appname=races`;
            fetch(URL, {
                method: 'GET',
                headers: { Authorization: "Bearer " + localStorage['freeUserToken'] }
            })
                .then(response => {
                    return response.json()
                })
                .then(data => {
                    if (data && data.filters && data.selectedfilters) {
                        setFilters((x) => {
                            //debugger
                            const newFilters = data.filters.map((item, index) => {
                                //debugger
                              if (data.selectedfilters.find((x) => x.field === item.field && x.data === item.data)) {
                                return {
                                  ...item,
                                  checked: true,
                                  filterId:index,
                                };
                              } else {
                                return {
                                    ...item,
                                    filterId:index,
                                  };
                              };
                            });
                            return newFilters;
                        })
                        // const merged = data.filters.map((item, index) => {
                        //     debugger
                        //     const findCompared = data.data.find((x) => x.field === item.field && x.data === item.data, index);
                        //     if (typeof findCompared !== "undefined") {
                        //         debugger
                        //         return {
                        //             ...item, ...findCompared, selected: true
                        //         };
                        //     }
                        //     return item;
                        // }
                        // );
                        // setFilters(merged)
                    }
                }
                )
                .catch((error) => {
                    console.error('Error:', error);
                });
        }
    }, []);
    //---------------------------



    ///-------------------
    //  useEffect(() => {
    //     get data from state and insert into filter at start
    //    if (filters && filters.length > 0) {
    //      for (let row of filters) {
    //          filters.selected = false;//TODO TEST ONLY this shuld be remove ,we will update from userState

    //          }
    //          setFilters(filters);
    //    }
    //    else
    //    {
    //        console.log('No filters')
    //    }

    //  }, [])




    return (
        <FilterContext.Provider value={[filters, setFilters]} >
            {props.children}
        </FilterContext.Provider>
    )
}
export default FilterContextProvider;

