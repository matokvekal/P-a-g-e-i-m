import React, { useState, useContext } from 'react';
// import { ConfigContext } from '../../../../context/ConfigContext';
import './Table2.css';
// import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
// import Input from '@material-ui/core/Input';
// import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import FormControl from '@material-ui/core/FormControl';
// import Chip from '@material-ui/core/Chip';
import FilterListIcon from '@material-ui/icons/FilterList';
import Filter1TwoToneIcon from '@material-ui/icons/Filter1TwoTone';
// import Input from '@material-ui/core/Input';




const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    maxWidth: 250,
    minWidth: 120,
  },
  formControl: {
    // margin: theme.spacing(1),
    // minWidth: 120,
    maxWidth: 200,
    // direction:'ltr',
    display: 'flex'
  },
  upperFilte11: {
    minHeight: '2rem',
    minWidth: 120,
    maxWidth: 250,
    backgroundColor: "lightblue",
    position: 'sticky',
    top: 0,
  },
}));
// const ITEM_HEIGHT = 48;
// const ITEM_PADDING_TOP = 8;
// const MenuProps = {
//   PaperProps: {
//     style: {
//       maxHeight: ITEM_HEIGHT * 15 + ITEM_PADDING_TOP,
//       width: 250,
//     },
//   },
// };


const data = [
  'אדוני ים',
  'דולב גלעד',
  'כהן חיים',
  'אדם לילך',
  'יור בני',
  'טרייר יורקשייר',
  'חיים',
  'Bbb',
  'AAAA',
  'CCCC',
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Miriam Wagner',
  'Bradley Wilkerson',
  'Virginia Andrews',
  'Kelly Snyder',

];



function Filter(props) {
  // console.log('at filter');
  // const { config } = useContext(ConfigContext);
  const [name, filterCheckBox] = useState(props);
  const [FilterCheckBox, setFilterCheckBox] = useState(filterCheckBox);
  const [filterIcon, setFilterIcon] = useState(FilterListIcon);
  // const filterCheckBox={props};
  const classes = useStyles();
  const [filterData, setFilterData] = React.useState([]);
  function handleChange(event) {
    setFilterData(event.target.value);
    var options = event.target.value;
    if(options.length > 0 ){
      setFilterCheckBox('true');
      setFilterIcon(Filter1TwoToneIcon)
    }  
    else
    {
      setFilterCheckBox('false');
      setFilterIcon(FilterListIcon);
    }
    console.log(FilterCheckBox);
  }

  return (
    < >
      <FormControl className={classes.formControl}>
        <Select
          multiple
          value={filterData}
          onChange={handleChange}
          renderValue={selected => selected.join(', ')}
          IconComponent={filterIcon}
          // IconComponent={FilterListIcon}
          
        >
          <div className='upperFilter' >
            <Checkbox checked={FilterCheckBox === 'true'} />
            <span></span>
            <hr />
          </div>

          {data.sort((a, b) => (a > b) ? 1 : -1).map((item) => (
            <MenuItem key={item} value={item} >
              <Checkbox checked={filterData.indexOf(item) > -1} />
              <ListItemText primary={item} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
}

export default Filter;
