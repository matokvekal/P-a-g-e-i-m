import React, { useContext, useState } from 'react';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { GlobalContext } from '../../context/GlobalContext';
import Divider from '@material-ui/core/Divider';
import { ConfigContext } from '../../context/ConfigContext';
// import ControlPointIcon from '@material-ui/icons/ControlPoint';
import SettingsBackupRestoreIcon from '@material-ui/icons/SettingsBackupRestore';

const ITEM_HEIGHT = 48;

export default function HiddenFields() {
  const [ tableFields ,setTableFields] = useContext(ConfigContext);
  const { global, settingGlobal } = useContext(GlobalContext);
  const [hideItem, setHideItem] = useState('')
  let APP = window.location.pathname.toString();
  APP = APP ? APP.substr(1) : '';
  APP = APP.toLowerCase();
  // const [appFields, setAppFields] = useState([]);

  // setAppFields(tableFields.filter(x => x.application === APP));
  const appFields=tableFields.filter(x => x.application === APP);
  let hiddenFields = appFields.filter(x => x.clientTableHideColumn === true).map(x => x.name);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  let countHidden = hiddenFields.length;

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleRemoveOption = (option) => {
    appFields.filter(x => x.name === option)[0].clientTableHideColumn = false;
    settingGlobal(countHidden);
  }
  return (
    <div>
      <IconButton disabled={false}
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <SettingsBackupRestoreIcon color={countHidden === 0 ? 'inherit' : 'secondary'} />
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
        {hiddenFields.map((option, i) => (
          <MenuItem key={i} style={{ displey: hideItem === option ? 'none' : 'block' }} onClick={() => { handleRemoveOption(option); setHideItem(option) }} >
            {option}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
