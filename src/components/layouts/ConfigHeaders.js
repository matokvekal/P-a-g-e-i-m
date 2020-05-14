import React, { useContext } from 'react';
import { ConfigContext } from '../../context/ConfigContext';
import ConfigDetails from './ConfigDetails';

export const ConfigHeaders = () => {
    const { config } = useContext(ConfigContext);
    return (
        <>
            {config ? config.map((header, i) => (
                <ConfigDetails key={i} row={header}/>
            )) :
             (<h1>No Headers</h1>)
            }
        </>
    )
}
export default ConfigHeaders;