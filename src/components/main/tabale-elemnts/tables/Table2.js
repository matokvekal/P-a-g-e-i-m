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
  let app = props.app ? props.app : '';
  let APP = app ? app.substr(1) : '';
  APP = APP.toLowerCase();
  const appPermission = props.appPermission;
  const [sortOrder, setSortOrder] = useState(0);
  const [filter, setFilter] = useState(<Filter />)
  const [data, setData] = useState([]);
  const API_ENDPOINT = pageimEndPoint();
  const [pageSize, setPageSize] = useState(100);
  const extra_header_width = 80;
  const [fields, setFields] = useState([]);
  const [errorMsg, setErrorMsg] = useState('');
  const { tableFields } = useContext(ConfigContext);
  const appFields = tableFields.filter(x => x.application === APP);
  const [trigerFetch, setTrigerFetch] = useState([]);
  const [rowInEditMode, setRowInEditMode] = useState('');
  const [currentHeader, setCurrentHeader] = useState('')
  const[checked,setChecked]=useState();
  const [newRow, setNewRow] = useState('');
  let appPermissionEdit = false;
  let appPermissionDel = false;
  if (appPermission) {
    appPermissionEdit = appPermission.toLowerCase().includes('all') || appPermission.toLowerCase().includes('edit');
    appPermissionDel = appPermission.toLowerCase().includes('all') || appPermission.toLowerCase().includes('del');
  }

  useEffect(() => {
    if (appFields)
      setFields(appFields);
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
    }
    else {
      h.clientFilter = false;
      h.clientFilterIconColor = 'colorWhite';
    }
  }

  const HandleHideColumn = (field) => {
    setTrigerFetch('HandleHideColumn');
    let h = fields.filter(x => x.name === field)[0];
    h.clientTableHideColumn = true;
  }



  const HandleSort = (field) => {
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
    setTrigerFetch('HandleSort' + field + h.clientSortIcon);
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
  }

  const [state, setState] = React.useState({
    a: true,
  });
 
  const handleChange = (event) => {
    newRow[event.target.name] = newRow[event.target.name] && newRow[event.target.name] === 1 ? 0 : 1;
    setNewRow(newRow);
    setState({ ...state,  });
  };
  const clickEdit = (row) => {
    setRowInEditMode(row);
    setNewRow(row);
  }

  const CheckSpecialFields = (header, row) => {
    console.log('in CheckSpecialFields')
    debugger
    if (rowInEditMode === row && header.is_edit && header.is_edit === 1) {

      if (header.type === 'textarea')
        return <textarea value={row[header.name]} />
      else if (header.type === 'select')
        return <h3 value={`${row[header.name]}  select not ready yet`} />
      else if (header.type === 'multiSelect')
        return <h3 value={`${row[header.name]}  muly select not ready yet`} />
      else if (header.type === 'number')
        return <input type='number' value={row[header.name]} />
      else if (header.type === 'stars')
        return <Stars stars={row[header.name]} />
      else if (header.type === 'checkBox') {
        return <Checkbox name={header.name} checked={newRow[header.name] && newRow[header.name] === 1 ? true : false} onChange={handleChange} />
      }
      else return <input value={row[header.name]} />
    }
    else {
      if (header.type === 'stars')
        return <Stars stars={row[header.name]} />
      else if (header.type === 'checkBox')
        return <Checkbox disabled checked={row[header.name] && row[header.name] === 1} />
      else
        return <span>{row[header.name]}</span>
    }
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
    if (!localStorage["freeUserToken"] || localStorage["freeUserToken"] === null || localStorage["freeUserToken"] === "undefined") {
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




  return (
    <>
      {!fields ?
        <span className='error'>Error occured : {errorMsg}</span> :
        <table id="main" className="display" >
          <thead>
            <tr>
              {fields.sort((a, b) => (a.order > b.order) ? 1 : -1).map((header, index1) => (!header.clientTableHideColumn ?
                (header.name === 'action'
                  ?
                  <th
                    id={header.clientId}
                    draggable={header.dragable}
                    onDragStart={handleDragStart}
                    onDragOver={HandleOnDragOver}
                    onDragEnter={handleDragEnter}
                    onDrop={handleDrop}
                    style={{ maxWidth: `150px`, minWidth: `140px` }}
                    key={index1}>
                    <span className='header-unit' >
                      <span
                        style={{ Width: `120px` }} className='header-data'>
                        {header.label}
                      </span>
                    </span>
                  </th>
                  :
                  <th
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
                        style={{ Width: `${header.width}px` }} className='header-data' onClick={() => header.can_sort === 1 ? HandleSort(header.name) : ''}>
                        {header.label}
                      </span>
                      <span className='header-action' >
                        {header.can_sort === 1 ? <span className="sort-icon" onClick={() => HandleSort(header.name)} >
                          <i className={header.clientSortIcon}>
                            <span className='sort-order'>{header.clientSortOrder}</span>
                          </i>
                        </span> : null
                        }
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
                  <tr className='tablerow' key={index2} >
                    {fields.map((header, index3) => (!header.clientTableHideColumn ?
                      header.name === 'action'
                        ?
                        <td style={{ maxWidth: `125px` }} key={header + index3}>
                          <span>
                            <a href='#!' className={`btn btn-sm ${appPermissionDel ? '' : "disabled"}`}>
                              <i className="fas fa-trash"></i>
                            </a>
                            <a href='#!' className={`btn btn-sm ${appPermissionEdit ? '' : "disabled"}`} onClick={() => clickEdit(row)}>
                              <i className="fas fa-edit"></i>
                            </a>
                          </span>
                        </td>
                        :
                        <td style={{ maxWidth: `${header.width + extra_header_width}px`, minWidth: `${header.width + extra_header_width}px` }} key={header + index3}>
                          <span>
                            {(rowInEditMode === row && header.is_edit && header.is_edit === 1)
                              ?
                              (header.type === 'textarea')
                                ?
                                <textarea value={newRow[header.name]} />
                                :
                                (header.type === 'checkBox')
                                  ?
                                  /*   {<Checkbox name={header.name}  checked={newRow[header.name] && newRow[header.name] === 1} onChange={event=>{console.log(newRow[header.name]);let checked=event.target.checked;newRow[header.name]= checked ? 1 : 0; setNewRow(newRow)}} />}*/

                                  <Checkbox name={header.name}  checked={newRow[header.name]} onChange={handleChange} />
                                  :
                                  <input value={newRow[header.name]} />
                              :


                              (header.type === 'checkBox')
                                ?
                                <Checkbox disabled checked={row[header.name] && row[header.name] === 1} />
                                :
                                <span>{row[header.name]}</span>
                            }
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






