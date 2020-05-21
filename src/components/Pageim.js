import React from 'react';
import Table2 from '../components/main/tabale-elemnts/tables/Table2';
import Card2 from '../components/main/cards/Card2';

export const Pageim = (props) => {
    return (
        < >
           {props.screenType==='table'? <Table2 />:<Card2 />}
        </>
    )

}
export default Pageim;
