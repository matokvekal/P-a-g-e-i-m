/* eslint-disable no-unused-expressions */
import React, { useState, useEffect, useContext } from 'react';
import moment from 'moment';
import './Table2.css';
//import socketIOClient from 'socket.io-client';
import { ConfigContext } from '../../../../context/ConfigContext';
import { GlobalContext } from '../../../../context/GlobalContext';
import { pageimEndPoint } from '../../../../Config';
// import Checkbox from '@material-ui/core/Checkbox';
// import { ListItem } from '@material-ui/core';
import Filter from './Filter';



export const Table2 = () => {
  const { global } = useContext(GlobalContext);
  const [sortOrder, setSortOrder] = useState(0);
  const { config } = useContext(ConfigContext);
  const [filter, setFilter] = useState(<Filter />)
  const [data, setData] = useState([]);
  const API_ENDPOINT = pageimEndPoint();
  const [pageSize, setPageSize] = useState(100);
  const extra_header_width = 80;
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ order: 'Last Name' })
  };

  const [trigerFetch, setTrigerFetch] = useState([]);
  useEffect(() => {
    //debugger
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
    console.log('from handleDragStart  fieldId' + id)
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
  {/*get*/ }
  useEffect(() => {
    //debugger
    fetch(`${API_ENDPOINT}/rows`)
      .then(response => response.json())
      .then(data => setData(data.res))
    setTrigerFetch('');
  }, [config, trigerFetch,global]);

  // useEffect(() => {
  //   console.log("global in use efect", global);
  // }, [global]);

  return (
    <>
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
                <span className='header-unit'>
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
          {data.slice(0, pageSize).map((el, index) => (
            <>
              <tr>
                {config.map((header, index) => (!header.clientTableHideColumn ?
                  <td style={{ maxWidth: `${header.width + extra_header_width}px`, minWidth: `${header.width + extra_header_width}px` }}
                    key={index}>
                    {el[header.name]}
                  </td> : null
                ))}
              </tr>
            </>
          ))}
        </tbody>
      </table>
    </>
  )
}
export default Table2;






