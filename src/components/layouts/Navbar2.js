import React from 'react'
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';
import { Link } from 'react-router-dom';

export const Navbar2 = () => {
    const menu2=[
    // {Linkto:'UploadFile',key:0,icon:'fas fa-star',text:'UploadFile',app:''},
    // {Linkto:'Pageim',key:3,icon:"fas fa-star",text:'Pageim',app:'rows'},
       {Linkto:'races',key:4,icon:"fas fa-star",text:'races',app:'rows'},
     {Linkto:'Templates',key:5,icon:"fas fa-star",text:'Templates',app:'rows'},

    
];
    return (
        <>

                <List>
                    {menu2.sort((a, b) => (a.key > b.key) ? 1 : -1).map((item, index) => (
                        <Link to={'/'+item.Linkto} params={"table" }  key={item.key}>
                        <ListItem button key={item.key}>
                        <i className={item.icon}></i>
                         <ListItemText primary={item.text} />
                        </ListItem>
                        </Link>
                    ))}
                </List>

        </>
    )
}
export default Navbar2;