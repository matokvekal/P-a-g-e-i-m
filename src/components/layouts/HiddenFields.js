import React,{useContext,useState} from 'react';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import Divider from '@material-ui/core/Divider';
import { ConfigContext } from '../../context/ConfigContext';
import ControlPointIcon from '@material-ui/icons/ControlPoint';

const ITEM_HEIGHT = 48;

export default function HiddenFields() {
  const { config } = useContext(ConfigContext);


  const [hideItem,setHideItem]=useState('')
  let hiddenFields = config.filter(x => x.clientTableHideColumn === true).map(x => x.name);
 
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

const handleRemoveOption=(option)=>{

  config.filter(x => x.name === option)[0].clientTableHideColumn=false;


}
  return (
    <div>
      <IconButton disabled={false} 
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <ControlPointIcon color='primery'/>
      </IconButton>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: '20ch',
          },
        }}
      >
      <div><h4>Hidden fields</h4></div>
      <Divider variant="inset" component="li" />
        {hiddenFields.map((option,i) => (
          <MenuItem  key={i} style={{ displey: hideItem===option?'none':'block'}} onClick={()=>{handleRemoveOption(option);setHideItem(option)}} >
      {option}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}