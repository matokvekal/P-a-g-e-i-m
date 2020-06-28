import React from 'react';


 const ConfigDetails = ({column,index}) => {
    return (
        <>
            <span key={index} className='rowData'>{column.name} |</span>
            {/*<span className='rowData'>{row.width}</span>
    <span className='rowData'>{row.alias}</span>*/}
        </>
    )
}
export default ConfigDetails;
