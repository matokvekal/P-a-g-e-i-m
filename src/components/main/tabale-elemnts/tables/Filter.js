import React, { useState, useContext } from 'react';
import './Table2.css';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import FormControl from '@material-ui/core/FormControl';
import FilterListIcon from '@material-ui/icons/FilterList';
import Filter1TwoToneIcon from '@material-ui/icons/Filter1TwoTone';




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
  const [checked, setChecked] = React.useState(false);
  const [name, filterCheckBox] = useState(props);
  const [FilterCheckBox, setFilterCheckBox] = useState(filterCheckBox);
  const [filterIcon, setFilterIcon] = useState(FilterListIcon);
  // const filterCheckBox={props};
  const classes = useStyles();
  const [filterData, setFilterData] = React.useState([]);
  function CheckUnCheckAll(event) {
    setChecked(event.target.checked);
    if (!event.target.checked) {
      setFilterData([])
      setFilterIcon(FilterListIcon);
    }
    else {
      setFilterData([...data]);
      setFilterIcon(Filter1TwoToneIcon)
    }
  }
  function handleChange(event) {
    setFilterData(event.target.value);
    var options = event.target.value;
    if (options.length > 0)
      setFilterIcon(Filter1TwoToneIcon)
    else
      setFilterIcon(FilterListIcon);
    // console.log(FilterCheckBox);
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
        >
          <div className='upperFilter' >
            <Checkbox checked={checked} onChange={CheckUnCheckAll} />
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
