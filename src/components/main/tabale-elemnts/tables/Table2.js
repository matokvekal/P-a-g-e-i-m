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
import { editRow } from './../../../../services/editRowService';
import { makeStyles } from '@material-ui/core/styles';
import 'antd/dist/antd.css';
import { Pagination } from 'antd';

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
  // const extra_header_width = 80;
  const [AppFields, setAppFields] = useState([]);
  const [errorMsg, setErrorMsg] = useState('');
  const [tableFields, setTableFields] = useContext(ConfigContext);



  useEffect(() => {
    if (!tableFields || tableFields.length === 0) {
      if (!localStorage['fields'] || localStorage['fields'].length === 0)
        tableFields = JSON.parse(localStorage['fields']);
    }
    if (tableFields) {
      setAppFields(tableFields.filter(x => x.application === APP));
    }

  }, [tableFields])

  const [trigerFetch, setTrigerFetch] = useState([]);
  const [rowInEditMode, setRowInEditMode] = useState('');
  const [rowBeforeEdit, setRowBeforeEdit] = useState('');
  const [x, fx] = useState(0)
  const [checked, setChecked] = useState();
  const [newRow, setNewRow] = useState('');
  const [icons, setIcons] = useState([]);
  const { global } = useContext(GlobalContext);
  let appPermissionEdit = false;
  let appPermissionDel = false;
  if (appPermission) {
    appPermissionEdit = appPermission.toLowerCase().includes('all') || appPermission.toLowerCase().includes('edit');
    appPermissionDel = appPermission.toLowerCase().includes('all') || appPermission.toLowerCase().includes('del');
  }



  const HandleAggregation = (field) => {

    let h = AppFields.filter(x => x.name === field)[0];
    if (!h.clientAggregation) {
      h.clientAggrigationIcon = 'fa fa-check-square';
      h.clientAggregation = field;
    }
    else {
      h.clientAggrigationIcon = 'far fa-square';
      h.clientAggregation = false;
    }
    setTrigerFetch('HandleAggregation' + Date.now());
  }
  const saveRow = async e => {
    const res = editRow(newRow)
  }
  const HandleFilter = (field) => {

    let h = AppFields.filter(x => x.name === field)[0];
    if (!h.clientFilter) {
      h.clientFilter = field;
      h.clientFilterIconColor = 'colorRed';
    }
    else {
      h.clientFilter = false;
      h.clientFilterIconColor = 'colorWhite';
    }
    setTrigerFetch('HandleFilter' + Date.now());
  }

  const HandleHideColumn = (field) => {
    let h = AppFields.filter(x => x.name === field)[0];
    h.clientTableHideColumn = true;
    setTrigerFetch('HandleHideColumn' + Date.now());
  }



  const HandleSort = (field) => {
    let h = AppFields.filter(x => x.name === field)[0];
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
    setTrigerFetch('HandleSort' + Date.now());
  }

  const handleDragStart = e => {

    const { id } = e.target;
    e.dataTransfer.setData("data", id);
    setTrigerFetch('handleDragStart' + Date.now());
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
    s: 'abc',
  });


  const handleChange = (event) => {

    setNewRow(newRow);
    if (event.target.type === 'checkbox')
      newRow[event.target.name] = event.target.checked ? 1 : 0;
    else //include text or textarea
      newRow[event.target.name] = event.target.value;
    setNewRow(newRow);
    setState({ ...state, newRow });
  };

  const clickCancel = () => {
    setRowInEditMode({});
    setNewRow({ ...state, newRow });
  }
  const clickDelete = (row) => {
  }
  const clickSave = () => {

    saveRow();

    setNewRow({ ...state, newRow });
    setRowInEditMode({ ...state, newRow });
    setTrigerFetch('clickSave' + Date.now());

  }
  const clickEdit = (row) => {
    setRowBeforeEdit({ ...row });
    setNewRow({ ...row });
    setRowInEditMode({ ...row });
  }

  // const CheckSpecialFields = (header, row) => {
  //   if (rowInEditMode === row && header.is_edit && header.is_edit === 1) {
  //     if (header.type === 'textarea')
  //       return <textarea value={row[header.name]} />
  //     else if (header.type === 'select')
  //       return <h3 value={`${row[header.name]}  select not ready yet`} />
  //     else if (header.type === 'multiSelect')
  //       return <h3 value={`${row[header.name]}  muly select not ready yet`} />
  //     else if (header.type === 'number')
  //       return <input type='number' value={row[header.name]} />
  //     else if (header.type === 'stars')
  //       return <Stars stars={row[header.name]} />
  //     else if (header.type === 'checkBox') {
  //       return <Checkbox name={header.name} checked={newRow[header.name] && newRow[header.name] === 1 ? true : false} onChange={handleChange} />
  //     }
  //     else return <input value={row[header.name]} />
  //   }
  //   else {
  //     if (header.type === 'stars')
  //       return <Stars stars={row[header.name]} />
  //     else if (header.type === 'checkBox')
  //       return <Checkbox disabled checked={row[header.name] && row[header.name] === 1} />
  //     else
  //       return <span>{row[header.name]}</span>
  //   }
  // }

  const handleChangeOrder = (target_id, source_id) => {

    let order = 1;
    if (AppFields && AppFields.length > 0) {
      let newOrder = AppFields.filter(x => x.clientId === target_id)[0].order;
      for (let header of AppFields) {
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
    setTrigerFetch('handleChangeOrder');
  }


  useEffect(() => {
    if (app === '/' || app === '/Templates')
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
        .then(response => {
          debugger
          return response.json()
        })
        .then(res => {
          debugger
          return setData(res)
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }

  }, [AppFields, trigerFetch, global]);




  return (
    <>
      {!AppFields || AppFields.length === 0 ?
        <span className='error'>Error occured : {errorMsg}</span> :
        <table id="main" className="display" >
          <thead>
            <tr>
              {AppFields.sort((a, b) => (a.order > b.order) ? 1 : -1).map((header, index1) => (!header.clientTableHideColumn ?
                (header.name === 'action'
                  ?
                  <th
                    id={header.clientId}
                    draggable={header.dragable}
                    onDragStart={handleDragStart}
                    onDragOver={HandleOnDragOver}
                    onDragEnter={handleDragEnter}
                    onDrop={handleDrop}
                    // style={{ maxWidth: `300px`, minWidth: `140px` }}
                    key={index1}>

                    <span
                      className='header-item header-label'>
                      {header.label}
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
                    // style={{ maxWidth: `${header.width + extra_header_width}px`, minWidth: `${header.width + extra_header_width}px` }}
                    key={index1}>



                    <span className='header-item header-label' onClick={() => header.can_sort === 1 ? HandleSort(header.name) : ''}>
                      {header.label}
                    </span>
                    {header.can_sort === 1 ? <span className="header-item sort-icon " onClick={() => HandleSort(header.name)} >
                      <i className={header.clientSortIcon}>
                        <span className='sort-order'>{header.clientSortOrder}</span>
                      </i>
                    </span> : null
                    }
                    <span onClick={() => HandleHideColumn(header.name)} className='header-item HandleHideColumn'>
                      <i className="far fa-times-circle" ></i>
                    </span>
                    <span onClick={() => HandleAggregation(header.name)} className='header-item'>
                      <i className={header.clientAggrigationIcon}></i>
                    </span>
                    <span onClick={() => HandleFilter(header.name)} className='header-item filterIcon' >
                      <Filter name={header.name} filterCheckBox={header.clientFilterHeaderCheckbox} />
                    </span>

                  </th>) : null
              ))
              }
            </tr>
          </thead>
          <tbody>
            {!data || data.length === 0 ? <tr className='noData'>Wait...</tr> :
              data.slice(0, pageSize).map((row, index2) => (
                <>
                  <tr className='tablerow' key={index2} >
                    {AppFields.map((header, index3) => (!header.clientTableHideColumn ?
                      header.name === 'action'
                        ?
                        <td key={header + index3}>

                          {(rowInEditMode.id === row.id)
                            ?
                            <span>
                              <a href='#!' className={`btn btn-sm `} onClick={() => clickCancel()}>
                                <i className="fas fa-times"></i>
                              </a>
                              <a href='#!' className={`btn btn-sm `} onClick={() => clickSave()}>
                                <i className="fas fa-check" aria-hidden="true"></i>
                              </a>
                            </span>
                            :
                            <span>
                              <a href='#!' className={`btn btn-sm ${appPermissionDel ? '' : "disabled"}`} onClick={() => clickDelete(row)}>
                                <i className="fas fa-trash"></i>
                              </a>
                              <a href='#!' className={`btn btn-sm ${appPermissionEdit ? '' : "disabled"}`} onClick={() => clickEdit(row)}>
                                <i className="fas fa-edit"></i>
                              </a>
                            </span>
                          }

                        </td>
                        :
                        <td key={header + index3}>
                          <>{/**row in edit mode **/}
                            {(rowInEditMode.id === row.id)
                              ?/**header can edit**/
                              (header.is_edit && header.is_edit === 1)
                                ?
                                (header.type === 'textarea')
                                  ?
                                  <textarea value={newRow[header.name]} name={header.name} onChange={handleChange} />
                                  :
                                  (header.type === 'checkBox')
                                    ?
                                    <Checkbox name={header.name} checked={newRow[header.name] === 1 ? true : false} onChange={handleChange} />
                                    :
                                    (header.type === 'stars')
                                      ?
                                      <Stars stars={row[header.name]} />
                                      :
                                      <input name={header.name} value={newRow[header.name]} onChange={handleChange} />
                                :   /**row in edit mode  but header can not edit **/

                                (header.type === 'checkBox')
                                  ?
                                  <Checkbox disabled checked={newRow[header.name] && row[header.name] === 1} />
                                  :
                                  <span>{newRow[header.name]}</span>


                              : /**row in view mode  **/

                              (header.type === 'checkBox')
                                ?
                                <Checkbox disabled checked={row[header.name] && row[header.name] === 1} />
                                :
                                (header.type === 'stars')
                                  ?
                                  <Stars stars={row[header.name]} />
                                  :
                                  <span>{row[header.name]}</span>
                            }
                          </>
                        </td> : null
                    ))}
                  </tr>
                  
                </>
              ))}
            <div >     <Pagination style={{display: "flex"}}size="small" total={50} showSizeChanger showQuickJumper /></div>

          </tbody>

        </table>
      }</>
  )
}
export default Table2;
