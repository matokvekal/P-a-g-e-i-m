/* eslint-disable no-unused-expressions */
import React, { useState, useEffect, useContext } from 'react';
import moment from 'moment';
import Actions from './Actions';
import './Table2.css';
import { GlobalContext } from '../../../../context/GlobalContext';
import { pageimEndPoint } from '../../../../Config';
import Filter from './Filter';
import Stars from './Stars';
import Checkbox from '@material-ui/core/Checkbox';
import { ConfigContext } from '../../../../context/ConfigContext';





export const Table2 = (props) => {
  // console.log('at Table2',props)
  // debugger
  let app = props.app ? props.app : '';
   let APP = app ? app.substr(1) : '';
   APP = APP.toLowerCase();
  // const { global } = useContext(GlobalContext);
  const [sortOrder, setSortOrder] = useState(0);

 

  
  const [filter, setFilter] = useState(<Filter />)
  const [data, setData] = useState([]);
  const API_ENDPOINT = pageimEndPoint();
  const [pageSize, setPageSize] = useState(100);
  const extra_header_width = 80;
  const [fields, setFields] = useState([]);
  const [errorMsg, setErrorMsg] = useState('');
  const { tableFields } = useContext(ConfigContext);
  const appFields=tableFields.filter(x => x.application === APP);

  const [trigerFetch, setTrigerFetch] = useState([]);

//   useEffect(() => {
//     console.log('at table2 before get fields',fields)
//       if ((!localStorage['fields']|| localStorage['fields']==='[]') && localStorage['freeUserToken'] ) {
//         const URL = `${API_ENDPOINT}/public/fields/data`;
//         console.log('at table2 do get fields',fields)
//         fetch(URL, {
//           method: 'POST',
//           headers: { Authorization: "Bearer " + localStorage['freeUserToken'] }
//         })
//           .then(response => response.json())
//           .then(res => setFields(res.filter(x => x.application === APP),console.log('at table2 sec func',res)))
//           .catch((error) => {
//             console.error('Error: at table2', error);
//           });
//       }
//       else{
//         setFields(JSON.parse(localStorage['fields']).filter(x => x.application === APP));
//         console.log('at table2 parse  field from localstorage',fields);
//       }
//     console.log('fields at table2rows',fields)
//     for (let row of fields) {
//       row.clienSort = false;
//       row.clientSortOrder = null;
//       row.clientSortIcon = null;
//       row.clientSortDirection = null;
//       row.clientHide = false;
//       row.clientAggregation = false;
//       row.clientAggrigationIcon = 'far fa-square';
//       row.clientFilter = false;
//       row.clientFilterIconColor = 'colorWhite';
//       row.clientTableHideColumn = false;
//       row.clientId = 'Id_' + row.name;
//       row.dragable = true;
//       row.clientFilterHeaderCheckbox = false;
//       }

// }, []);

useEffect(() => {
  // console.log('appFields at table2',appFields)
  if(appFields)
  setFields(appFields);
//  if ((localStorage['fields']&&  localStorage['fields']!=='[]'))
//      setFields(JSON.parse(localStorage['fields']).filter(x => x.application === APP));

}, [])

const HandleAggregation = (field) => {
  setTrigerFetch('HandleAggregation');
  let h = fields.filter(x => x.name === field)[0];
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
  let h = fields.filter(x => x.name === field)[0];
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
  let h = fields.filter(x => x.name === field)[0];
  h.clientTableHideColumn = true;
}



const HandleSort = (field) => {
  setTrigerFetch('HandleSort');
  let h = fields.filter(x => x.name === field)[0];

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
  if (fields && fields.length > 0) {
    let newOrder = fields.filter(x => x.clientId === target_id)[0].order;
    for (let header of fields) {
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
  if (app === '/')
    return
  if ( !localStorage["freeUserToken"] || localStorage["freeUserToken"] === null || localStorage["freeUserToken"] === "undefined") {
    console.log('no freeUserToken table2')
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

}, [fields, trigerFetch, global]);
// }, [fields, trigerFetch, global]);



return (
  <>
    {!fields ?
      <span className='error'>Error occured : {errorMsg}</span> :
      <table id="main" className="display" >
        <thead>
          <tr>
            {fields.sort((a, b) => (a.order > b.order) ? 1 : -1).map((header, index1) => (!header.clientTableHideColumn ?
              (<th data-type="numeric"
                id={header.clientId}
                draggable={header.dragable}
                onDragStart={handleDragStart}
                onDragOver={HandleOnDragOver}
                onDragEnter={handleDragEnter}
                onDrop={handleDrop}
                style={{ maxWidth: `${header.width + extra_header_width}px`, minWidth: `${header.width + extra_header_width}px` }}
                key={index1}>
                <span className='header-unit' key={index1 * 999}>
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
          {!data ? <tr className='noData'>Wait...</tr> :
            data.slice(0, pageSize).map((row, index2) => (
              <>
                <tr className='tablerow' key={index2}>
                  {fields.map((header, index3) => (!header.clientTableHideColumn ?
                    <td style={{ maxWidth: `${header.width + extra_header_width}px`, minWidth: `${header.width + extra_header_width}px` }} key={index3}>
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






