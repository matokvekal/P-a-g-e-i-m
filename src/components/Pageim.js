import React from 'react';
import Table2 from '../components/main/tabale-elemnts/tables/Table2';
import Card2 from '../components/main/cards/Card2';

export const Pageim = (props) => {
    console.log('at pagim',props)
    const app=props.app;
    return (
        < >
           {props.screenType==='table'? <Table2 app={app}/>:<Card2 app={app}/>}
        </>
    )

}
export default Pageim;
