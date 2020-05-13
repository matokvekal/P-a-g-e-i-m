import React from 'react';


 const ConfigDetails = ({row,index}) => {
    return (
        <>
            <span key={index} className='rowData'>{row.name} |</span>
            {/*<span className='rowData'>{row.width}</span>
    <span className='rowData'>{row.alias}</span>*/}
        </>
    )
}
export default ConfigDetails;
