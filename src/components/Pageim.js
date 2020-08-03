import React,{useState} from 'react';
import Table2 from '../components/main/tabale-elemnts/tables/Table2';
import Card2 from './main/cards/Card2';

export const Pageim = (props) => {
    const [app] = useState(props.app)
    const [appPermission] = useState(props.appPermission)
    return (
        < >
           {props.screenType==='table'? <Table2 app={app} appPermission={appPermission}/>:<Card2 app={app}/>}
        </>
    )

}
export default Pageim;
