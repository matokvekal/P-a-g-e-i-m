import React, { useContext } from 'react';
import { ConfigContext } from '../../context/ConfigContext';
import ConfigDetails from './ConfigDetails';

export const ConfigHeaders = () => {
    const { tableFields } = useContext(ConfigContext);
    let APP = window.location.pathname.toString();
    APP = APP ? APP.substr(1) : '';

    const appFields=tableFields.filter(x => x.application === APP);
    // console.log('config headers 2  try get config ',appFields)
    return (
        <>
            {appFields ? appFields.map((header, i) => (
                <ConfigDetails key={i} column={header}/>
            )) :
             (<h1>No Headers</h1>)
            }
        </>
    )
}
export default ConfigHeaders;