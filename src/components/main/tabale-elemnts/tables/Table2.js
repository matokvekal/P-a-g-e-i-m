/* eslint-disable no-unused-expressions */
import React, { useState, useEffect, useContext } from 'react';
import moment from 'moment';
import Actions from './Actions';
import './Table2.css';

//import socketIOClient from 'socket.io-client';
import { ConfigContext } from '../../../../context/ConfigContext';
import { GlobalContext } from '../../../../context/GlobalContext';
import { pageimEndPoint } from '../../../../Config';
// import Checkbox from '@material-ui/core/Checkbox';
// import { ListItem } from '@material-ui/core';
import Filter from './Filter';
import Stars from './Stars';

import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';



export const Table2 = (props) => {
  const app = props.app ? props.app : '';
  const { global } = useContext(GlobalContext);
  const [sortOrder, setSortOrder] = useState(0);
  const { config } = useContext(ConfigContext);
  const [filter, setFilter] = useState(<Filter />)
  const [data, setData] = useState([]);
  const API_ENDPOINT = pageimEndPoint();
  const [pageSize, setPageSize] = useState(3);
  const extra_header_width = 80;

  const [hasError, setHasError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');


  const [trigerFetch, setTrigerFetch] = useState([]);
  useEffect(() => {

    if (config && config.length > 0) {
      for (let header of config) {
        header.clienSort = false;
        header.clientSortOrder = null;
        header.clientSortIcon = null;
        header.clientSortDirection = null;
        header.clientHide = false;
        header.clientAggregation = false;
        header.clientAggrigationIcon = 'far fa-square';
        header.clientFilter = false;
        header.clientFilterIconColor = 'colorWhite';
        header.clientTableHideColumn = false;
        header.clientId = 'Id_' + header.name;
        header.dragable = true;
        header.clientFilterHeaderCheckbox = false;

      }
    }
  }, [config]);


  const HandleAggregation = (field) => {
    setTrigerFetch('HandleAggregation');
    let h = config.filter(x => x.name === field)[0];
    if (!h.clientAggregation) {
      h.clientAggrigationIcon = 'fa fa-check-square';
      h.clientAggregation = field;
    }
    else {
      h.clientAggrigationIcon = 'far fa-square';
      h.clientAggregation = false;
    }
  }

  const HandleFilter = (field) => {
    setTrigerFetch('HandleFilter');
    let h = config.filter(x => x.name === field)[0];
    if (!h.clientFilter) {
      h.clientFilter = field;
      h.clientFilterIconColor = 'colorRed';
      // setFilter(<Filter />);
    }
    else {
      h.clientFilter = false;
      h.clientFilterIconColor = 'colorWhite';
      // setFilter();
    }
  }

  const HandleHideColumn = (field) => {
    setTrigerFetch('HandleHideColumn');
    let h = config.filter(x => x.name === field)[0];
    h.clientTableHideColumn = true;
  }



  const HandleSort = (field) => {
    setTrigerFetch('HandleSort');
    let h = config.filter(x => x.name === field)[0];

    if (h.clientSort) {
      h.clientSortIcon === 'fas fa-sort-down icon' ? (h.clientSortIcon = 'fas fa-sort-up icon', h.direction = 'asc') : (h.clientSortIcon = 'fas fa-sort-down icon', h.direction = 'desc');
    }
    else {
      h.clientSort = true;
      h.clientSortIcon = 'fas fa-sort-up icon';
      h.direction = 'asc'
      setSortOrder(x => x + 1);
      h.clientSortOrder = sortOrder;
    }
  }

  const handleDragStart = e => {
    setTrigerFetch('handleDragStart');
    const { id } = e.target;
    e.dataTransfer.setData("data", id);

  }
  const HandleOnDragOver = (e) => {
    e.preventDefault();
  }
  const handleDragEnter = (e) => {
    const id = e.target;
  }
  const handleDrop = e => {
    const target_id = e.currentTarget.id;
    const source_id = e.dataTransfer.getData('data');
    let result = handleChangeOrder(target_id, source_id);

    // e.preventDefault();
  }
  const CheckSpecialFields = (header, row) => {
    if (header.name === 'stars')
      return <Stars stars={row[header.name]} />
    else if (header.name === 'action')
      return <Actions />
    else if (header.name === 'checkBox')
      return <Checkbox />
    else return <span>{row[header.name]}</span>
  }
  const handleChangeOrder = (target_id, source_id) => {
    setTrigerFetch('handleChangeOrder');
    let order = 1;
    if (config && config.length > 0) {
      let newOrder = config.filter(x => x.clientId === target_id)[0].order;
      for (let header of config) {
        if (header.clientId === source_id) {
          header.order = newOrder;
        }
        else {
          if (order === newOrder)
            order = order + 1;
          header.order = order;
          order = order + 1;
        }
      }
    }
  }



  useEffect(() => {
    if (!localStorage["freeUserToken"] || localStorage["freeUserToken"] === null || localStorage["freeUserToken"] === "undefined") {
      const AUTHURL = `${API_ENDPOINT}/session/createNewUserDevice`;
      fetch(AUTHURL)
        .then(async response => {
          const data = await response.json();
          if (!response.ok || !data.success) {
            setErrorMsg(data.message);
            setHasError(true);
          }
          else {
            localStorage["freeUserToken"] = data.token;
            // window.location.reload();
          }
        })
        .catch(error => {
          this.setState({ errorMessage: error.toString() });
          console.error('There was an error!', error);
        });
    }
    else {
      const URL = `${API_ENDPOINT}/public${app}/data`;
      fetch(URL, {
        method: 'POST',
        headers: { Authorization: "Bearer " + localStorage['freeUserToken'] }
      }
      )
        .then(response => response.json())
        .then(res => setData(res))
        .catch((error) => {
          console.error('Error:', error);
        });
    }

    // setTrigerFetch('');
  }, [config, trigerFetch, global]);


  return (
    <>
      {hasError ? <><div className='error'>Error occured : {errorMsg}</div></> :
        <table id="main" className="display" >
          <thead>
            <tr>

              {config.sort((a, b) => (a.order > b.order) ? 1 : -1).map((header, i) => (!header.clientTableHideColumn ?
                (<th data-type="numeric"
                  id={header.clientId}
                  draggable={header.dragable}
                  onDragStart={handleDragStart}
                  onDragOver={HandleOnDragOver}
                  onDragEnter={handleDragEnter}
                  onDrop={handleDrop}
                  style={{ maxWidth: `${header.width + extra_header_width}px`, minWidth: `${header.width + extra_header_width}px` }}
                  key={i}>
                  <span className='header-unit' key={i*999}>
                    <span
                      style={{ Width: `${header.width}px` }} className='header-data' onClick={() => HandleSort(header.name)}>
                      {header.name}
                    </span>
                    <span className='header-action' >

                      <span className="sort-icon" onClick={() => HandleSort(header.name)} >
                        <i className={header.clientSortIcon}>
                          <span className='sort-order'>{header.clientSortOrder}</span>
                        </i>
                      </span>


                      <span onClick={() => HandleHideColumn(header.name)} className='HandleHideColumn'>
                        <i className="far fa-times-circle" ></i>
                      </span>
                      <span onClick={() => HandleAggregation(header.name)}>
                        <i className={header.clientAggrigationIcon}></i>
                      </span>
                      <span onClick={() => HandleFilter(header.name)} className='filterIcon' >
                        <Filter name={header.name} filterCheckBox={header.clientFilterHeaderCheckbox} />
                      </span>
                    </span>
                  </span>

                </th>) : null
              ))
              }
            </tr>
          </thead>
          <tbody>
            {!data || data.length === 0 ? <><div className='noData'>Wait...</div></> :
              data.slice(0, pageSize).map((row, index) => (

                <>
                  <tr className='tablerow'>
                    {config.map((header, index) => (!header.clientTableHideColumn ?
                      <td style={{ maxWidth: `${header.width + extra_header_width}px`, minWidth: `${header.width + extra_header_width}px` }} key={index}>
                        <span>
                          {CheckSpecialFields(header, row)}
                        </span>
                      </td> : null
                    ))}

                  </tr>

                </>
              ))}
          </tbody>
        </table>
      }</>
  )
}
export default Table2;






