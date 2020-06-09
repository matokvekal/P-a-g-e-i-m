import React, { createContext, useState } from 'react';

export const GlobalContext = createContext(null);

const GlobalContextProvider = (props) => {
    const [global, setGlobal] = useState([{countHiddenFields:0},]);
    function settingGlobal(count){
        setGlobal([{countHiddenFields:count},]);
    }

    return (
        <GlobalContext.Provider value={{ global ,settingGlobal}} >
            {props.children}
        </GlobalContext.Provider>
    )
}
export default GlobalContextProvider;

