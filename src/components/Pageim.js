import React,{useState} from 'react';
import Table2 from '../components/main/tabale-elemnts/tables/Table2';
import Card2 from '../components/main/cards/Card2';

export const Pageim = (props) => {
    const [app] = useState(props.app)
    console.log('at pagim',props)
    return (
        < >
           {props.screenType==='table'? <Table2 app={app}/>:<Card2 app={app}/>}
        </>
    )

}
export default Pageim;
