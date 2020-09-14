import React from 'react';


const ConfigDetails = ({ column, index }) => {
    return (
        <>
            <span key={index} className='rowData'>{column.name} |</span>

        </>
    )
}
export default ConfigDetails;
