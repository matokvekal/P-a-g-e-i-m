import React, { useState, useEffect, useContext } from 'react';
import { ConfigContext } from '../../../context/ConfigContext';
import { pageimEndPoint } from '../../../Config';
import colors from './../../../assets/color.json';
import person from './../../../assets/person.png';
import israelFlag from './../../../assets/israelFlag.png';


import Stars from './Stars';
import { atom, useRecoilState } from 'recoil'
import usePagination from './../../../hooks/Pagination';
import CircularProgress from '../../reusable/Progress';
import deviceIdentity, { getApp } from '../../../helpers/Helpers';
import ClickItem from '../../../helpers/clickItem';
import card3 from './card3.css';
import useLogIn from '../../../helpers/LogIn';
import http from './http';
import WelcomeModal from '../../../helpers/WelcomeModal';
export const Card3 = (props) => {

  const [data, setData] = useState([]);
  const API_ENDPOINT = pageimEndPoint();
  const [tableFields, setTableFields] = useContext(ConfigContext);
  const [AppFields, setAppFields] = useState([]);
  const [errorMsg, setErrorMsg] = useState('Err card3');
  const [loader, setLoader] = useState(false);
  const { addLikeLogin, closeModal } = useLogIn();
  const hideCardModal = atom({
    key: "_HideCardModal",
    default: "",
  });
  const sortSelected = atom({
    key: "_sortSelected",
    default: '',
  });

  const isLogIn = atom({
    key: "_logIn",
    default: 'false',
  });

  const newSearch = atom({
    key: "_searchState",
    default: "",
  });


  const newFilter = atom({
    key: "_filterState",
    default: "",
  });
  const LikeChange = atom({
    key: "_likeChange",
    default: '',
  });

  const menuListAtom = atom({
    key: "_menuList",
    default: '',
  });
  const welcomeModal = atom({
    key: "_WelcomeModal",
    default: {
      formType: '',
      active: true,
      message: '<p></p>',
    },
  });
  const userSelectAll = atom({
    key: "_userSelectAll",
    default: "",
  });
  const userSelectcount = atom({
    key: "_userSelect",
    default: 0,
  });
  const Query = atom({
    key: "_critQuery",
    default: "",
  });
  const [anyQuery, setAnyQuery] = useRecoilState(Query);
  const standingVersion = 'new';
  const [userSelect, setUserSelect] = useRecoilState(userSelectcount);
  const [selectSelected, setSelectSelected] = useRecoilState(userSelectAll);
  const [selectedItems, setSelectedItems] = useState('');//user_select
  const [external, setExternal] = useState('');
  const [modalWelcome] = useRecoilState(welcomeModal);
  const [menuList, setMenuList] = useRecoilState(menuListAtom);
  const [login, setLogin] = useRecoilState(isLogIn);

  const [searchNew, setSearchNew] = useRecoilState(newSearch);
  const [filter, setFilter] = useRecoilState(newFilter);
  const [order_by] = useRecoilState(sortSelected);
  const [likeChange, setLikechange] = useRecoilState(LikeChange);
  const [popupCard, setPopupCard] = useRecoilState(hideCardModal);
  const { items, setItems, currentPage, itemsPerPage, mobilePage, setCurrentPage, setMobilePage } = usePagination();
  let app = props.app ? props.app : '';
  let APP = app ? app.substr(1) : '';
  APP = APP.toLowerCase();

  const handleClickFullName = name => {
    setAnyQuery('true');
    setSearchNew(name);
  }
  useEffect(() => {
    setExternal(selectSelected ? 'get_All' : '');
  }, [selectSelected])


  useEffect(() => {
   debugger
    if (!tableFields || tableFields.length === 0) {
      if (APP && localStorage['fields_' + APP]) {
        let data = JSON.parse(localStorage['fields_' + APP]);
        setTableFields(data);
        if (APP) {
          setAppFields(data.filter(x => x.application === APP));
        }
      };
    }
    else if (APP)
      setAppFields(tableFields.filter(x => x.application === APP));

    if (!tableFields || tableFields.length === 0) {
      // debugger
      localStorage.removeItem("fields");
    }
  }, [tableFields])


  debugger
  useEffect(() => {
    debugger
    // let temp=external;
    if (!app || app === '/' || app === '/Templates' || searchNew.length === 1)
      return
    if (!deviceIdentity())
      return
    setLoader(true);
    debugger
    const URL = `${API_ENDPOINT}/pageim/stateUpdate?appname=${APP}&search=${searchNew}&currentpage=${currentPage}&itemsperpage=${itemsPerPage}&order_by=${order_by}&external=${external}`;
    fetch(URL, {
      method: 'POST',
      headers: { Authorization: "Bearer " + localStorage['deviceIdentity'] },
    }
    )
      // http.Post(URL)
      .then(response => {
        return response.json()
      })
      .then(res => {

        if (res && res.res && res.res[0] && res.res[0].success === 'false') {
          console.log('Err in stateUpdate sp');
          return;
        }

        setUserSelect(res.user_select.length)
        // if (res.user_select.length > 0) {

        // }

        const newRes = res.res.map((item) => {
          if (res.user_select.find(({ rowId }) => rowId === item.id)) {
            item.selected = 'true';
            return item;
          }
          else {
            item.selected = false;
            return item;
          }
        });

        mobilePage
          ?
          setData(newRes ? [...data, ...newRes] : [...data])
          :
          setData(newRes ? newRes : null);
        setItems(res.total[0].totalRows);// react- in mobile page just add data insted of replace
        setLoader(false);
      })
      .catch((error) => {
        console.error('Error:', error);
      });


  }, [AppFields, searchNew, currentPage, itemsPerPage, mobilePage, order_by, external]);


  useEffect(() => {
    debugger
    const temp = likeChange.hasChange;
    if (!app || app === '/' || app === '/Templates' || filter.value === 'undefined' || filter.name === 'undefined' || !filter.value || !filter.name)
      return
    if (!deviceIdentity())
      return
    let data = filter;
    setLoader(true);
    const URL = `${API_ENDPOINT}/pageim/filterUpdate?appname=${APP}&checked=${filter.checked}&name=${filter.name}&value=${filter.value}&itemsperpage=${itemsPerPage}&external=${external}&sender=${filter.sender}`;
    //console.log(URL);
    fetch(URL, {
      method: 'POST',
      headers: { Authorization: "Bearer " + localStorage['deviceIdentity'] },
    }

    )
      .then(response => {
        //debugger
        return response.json()
      })
      .then(res => {
        debugger
        setCurrentPage(1);
        setMobilePage("");
        setData(res.res ? res.res : null); setItems(res.total[0].totalRows);
        setLoader(false);
      })
      .catch((error) => {
        console.error('Error:', error);
      });


  }, [filter, likeChange]);

  function handleClick(el) {
    debugger
    ClickItem('like', 'name', el['full_name'], el['id']);
  }


  const updateUserSelect = (res) => {///////////////////////


  }
  const manageUserSelect = (action, id) => {
    if (!APP || !deviceIdentity())
      return
    const URL = `${API_ENDPOINT}/pageim/user_select?appname=${APP}&id=${id}&action=${action}`;
    fetch(URL, {
      method: 'POST',
      headers: { Authorization: "Bearer " + localStorage['deviceIdentity'] },
    })
      .then(response => {
        return response.json();
      })
      .then(res => {


        if (res && res.res[0])
          setSelectedItems(res.res[0])
        console.log('test')

      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  const HandleSelect = el => event => {
    debugger
    if (!login) {
      closeModal();
      setPopupCard('');
      addLikeLogin(' Please login its simple, then select cards');
      return
    }
    else {
      debugger
      if (el['id'] && event.target) {
        if (el.selected && el.selected === 'true') {
          el.selected = 'false';
          manageUserSelect('unChecked', el['id'])
        }
        else {
          el.selected = 'true';
          manageUserSelect('checked', el['id'])
        }
        setData((x) => {
          const newData = data.map((item) => {
            if (item.id === el['id']) {
              return {

                ...item,
                selected: el.selected,
              }
            }
            else {
              return item;
            }
          });
          return newData;
        })
        let test = data;
      }
    }
  }

  function HandleLikes(el) {
    debugger
    closeModal();

    setPopupCard('');
    ClickItem('like', 'name', el['full_name'], el['id']);
    if (!login) {
      addLikeLogin(' Please login its simple, then you give abig LOVE');
      return
    }

    const array = JSON.parse(localStorage.getItem(APP + '_info')) || [];

    if (array.includes(el['id'])) {
      //toast you allredy like it
      return;
    }
    else
      if (el['likes'] && el['likes'] !== '')
        el['likes'] = Number(el['likes']) + 1;
      else
        el['likes'] = 1;


    array.push(el['id']);
    localStorage.setItem(APP + '_info', JSON.stringify(array));



    // let APP = window.location.pathname.toString();
    // APP = APP ? APP.substr(1).toLowerCase() : '';

    if (!APP || !deviceIdentity())
      return
    if (el['id']) {
      const URL = `${API_ENDPOINT}/pageim/likesUpdate?appname=${APP}&id=${el['id']}`;
      fetch(URL, {
        method: 'POST',
        headers: { Authorization: "Bearer " + localStorage['deviceIdentity'] },
      })
        .then(response => {
          return response.json();
        })
        .then(res => {
          if (res && res.success)
            setLikechange(Date.now());

        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }

  }
  // debugger

  return (
    <>
      <div style={{ 'z-index': '888' }}>{loader ? <CircularProgress /> : null}</div>
      <div className='WelcomeModal'>
        {menuList.filter(x => x.app === APP)[0].show_welcome === 'true' && <WelcomeModal />}
      </div>


      {!AppFields || AppFields.length === 0 || !data
        ?
        <span className='error'>Error occured : {errorMsg} <CircularProgress /></span>
        :
        <div className="cards__area">
          <div className="cards">
            {/* <div className="main_head_mobile"> */}
            <div class="Leaderboard__mobile lgphL main_head_mobileNew">
              <div class="Leaderboard__Rank-nnrug0-18 bdNual">
                <div class="Leaderboard__HeadLabel-nnrug0-29 kEksxf">
                  {menuList.filter(x => x.app === APP)[0].standing_header}
                </div>
              </div>
              <div class="Leaderboard__UserContainer-nnrug0-21 MnKPn">
              </div>
            </div>
            {/* <h1>{menuList.filter(x => x.app === APP)[0].standing_header}</h1> */}
            {/* </div> */}
            {data.map((el, index) => (
              <>
                {/*<!-- Mobile standing -->*/}
                {standingVersion === 'old' ?
                  <tr className='standing' key={index * 331} onClick={() => { setPopupCard(index) }}>
                    <td className='tdStanding pos' >
                      {AppFields.filter(x => x.standing_show === 1)[0] && AppFields.filter(x => x.standing_order === 999)[0] ? el[AppFields.filter(x => x.standing_order === 999)[0].name] : null}
                      {el['medal_image'] ? <img src={require(`./../../../assets/${el['medal_image']}.png`)} /> : null}
                    </td>
                    <td className='tdStanding branch hide'>
                      {el['image'] && <img src={require(`./../../../assets/${el['image']}.png`)} />}
                    </td>
                    {AppFields.filter(x => (x.standing_show === 1 && x.standing_order !== 999)).sort((a, b) => (a.standing_order > b.standing_order) ? 1 : -1).map((header, index1) => (
                      <td className={`tdStanding ${header.name}`} style={index1 === 7 && el['event_id'] ? { 'width': header.style_standing, backgroundColor: `rgb(${colors[el['event_id']].rgb.r},${colors[el['event_id']].rgb.g},${colors[el['event_id']].rgb.b})` } : { 'width': header.style_standing }}>{el[header.name] ? el[header.name] : null}</td>
                    ))}
                  </tr>
                  :
                  <tr className='standing' key={index * 331} onClick={() => { setPopupCard(index) }}>
                    <div className="Leaderboard allRow">
                      <div className="Leaderboard first">
                        <div className="Leaderboard side highlight">{el['pic'] ? el['pic'] : null}</div>
                        <div className="Leaderboard cup cimg">
                          {el['medal_image'] ? <img className="Leaderboard cimg" src={require(`./../../../assets/${el['medal_image']}.png`)} /> : null}
                        </div>
                      </div>
                      <div className="Leaderboard UserAvatar " >
                        <img width="20" height="20" src={require(`./../../../assets/bikesmall.png`)} />
                      </div>
                      <div className="Leaderboard data">

                        <div className="Leaderboard text">
                          <div className="Leaderboard name" >{el['full_name'] ? el['full_name'] : null}</div>
                          <div className="Leaderboard lowerText">
                            <span>
                              {el['special'] ? <span>{el['special']}<span className="special">/</span></span> : null}
                              {el['event_name'] ? <span>{el['event_name']}<span className="highlight">/</span></span> : null}
                              {el['branch'] ? <span>{el['branch']}<span className="highlight">/</span></span> : null}
                              {el['sub_branch'] ? <span>{el['sub_branch']}<span className="highlight">/</span></span> : null}
                              {el['category'] ? <span>{el['category']}</span> : null}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="Leaderboard year highlight">{el['year'] ? el['year'] : null}</div>
                    </div>
                  </tr>
                }

                <div className={popupCard === index ? 'card__item active' : data.length < 5 ? 'card__item card_item_width' : 'card__item'} id={popupCard === index ? 'popup' : null} data={index}>

                  {/*<!-- Card Header-->*/}
                  <div className="card__header" >
                    <div className="profile__img">
                      {el['image'] ? <img src={require(`./../../../assets/${el['image']}.png`)} /> : null}

                    </div>

                    <div className="name__trophy">
                      <div className="name__place">
                        <p>{AppFields.filter(x => x.cardHeaderPlace === 2)[0] && el[AppFields.filter(x => x.cardHeaderPlace === 2)[0].name] && `[${el[AppFields.filter(x => x.cardHeaderPlace === 2)[0].name]}]`}
                        </p>
                        <p className="user__place" >{AppFields.filter(x => x.cardHeaderPlace === 3)[0] ? el[AppFields.filter(x => x.cardHeaderPlace === 3)[0].name] : null}</p>
                        <p className="user__name" onDoubleClick={() => handleClickFullName(el['full_name'])}>{AppFields.filter(x => x.cardHeaderPlace === 1)[0] ? el[AppFields.filter(x => x.cardHeaderPlace === 1)[0].name] : null}</p>
                        <div className="trophy__quantity">
                          {el['medal_image'] ? <img src={require(`./../../../assets/${el['medal_image']}.png`)} /> : null}
                        </div>
                      </div>
                      <div className="race__name__year">
                        <p className="race__name">{AppFields.filter(x => x.cardHeaderPlace === 4)[0] ? el[AppFields.filter(x => x.cardHeaderPlace === 4)[0].name] : null}</p>
                        <p className="race__year">{AppFields.filter(x => x.cardHeaderPlace === 5)[0] ? el[AppFields.filter(x => x.cardHeaderPlace === 5)[0].name] : null}</p>
                      </div>

                    </div>
                    <div className="flag__status" >
                      {/* <i className={`fa fa-circle_${Number(el['clicks']) % 4}`}  aria-hidden="true" title={el['clicks'] + ' clicks'} style={{ color: !el['clicks'] ? 'white' : `rgb(${Number(colors[el['clicks']].rgb.r)},${Number(colors[el['clicks']].rgb.g)},${Number(colors[el['clicks']].rgb.b)})` }}></i> */}

                      <i className={`fa fa-circle fa-circle_${Number(el['clicks']) % 4}`} aria-hidden="true" title={el['clicks'] + ' clicks'} style={{ color: !el['clicks'] ? 'white' : `rgb(${Number(colors[el['clicks']].rgb.r)},${Number(colors[el['clicks']].rgb.g)},${Number(colors[el['clicks']].rgb.b)})` }}></i>
                      <img className="flag__img" src={israelFlag} alt="" />
                    </div>
                  </div>

                  {/*<!-- Card Content -->*/}
                  <div className="card__content">
                    {popupCard !== index ?
                      <>
                        <div className="left">
                          {AppFields.filter(x => (x.card_show === 1)).sort((a, b) => (a.card_order > b.card_order) ? 1 : -1).map((header, index1) => (
                            <>
                              {
                                header.card_show === 1 && el[header.name]
                                  ?
                                  <p>{header.label}:</p>
                                  :
                                  <p></p>
                              }
                            </>
                          ))}
                        </div>
                        <div className="right">
                          {AppFields.filter(x => (x.card_show === 1)).sort((a, b) => (a.card_order > b.card_order) ? 1 : -1).map((header, index2) => (
                            <>
                              {
                                header.card_show === 1 && el[header.name]
                                  ?
                                  <p>{el[header.name]}</p>
                                  :
                                  <p></p>
                              }
                            </>
                          ))}
                        </div>
                      </>
                      :
                      <>
                        {/*<!--POPUP  Card Content -->*/}
                        <div className="left">
                          {AppFields.filter(x => (x.popup_show === 1)).sort((a, b) => (a.popup_order > b.popup_order) ? 1 : -1).map((header, index1) => (
                            <>
                              {
                                header.popup_show === 1 && el[header.name]
                                  ?
                                  <p id={index1 * 117}>{header.label}:</p>
                                  :
                                  <p key={index1 * 117} ></p>
                              }
                            </>
                          ))}
                        </div>
                        <div className="right">
                          {AppFields.filter(x => (x.popup_show === 1)).sort((a, b) => (a.popup_order > b.popup_order) ? 1 : -1).map((header, index2) => (
                            <>
                              {
                                header.popup_show === 1 && el[header.name]
                                  ?
                                  header.name === 'rider_link' ?
                                    <a href={el[header.name]} className="fas share" key={index2 * 11187} target="blank">Link</a>
                                    :
                                    <p key={index2 * 114} >{el[header.name]}</p>

                                  :
                                  <p key={index2 * 114} ></p>
                              }
                            </>
                          ))}
                        </div>
                      </>}
                  </div>

                  <div className="card__footer">
                    <div className="icons">
                      <a href={`https://wa.me/?text=${window.location.href}`} target="_blank"><i className="fas fa-share-alt-square share"></i></a>


                      <input className='check' type="checkbox" value={el.id} name="user_select" onClick={e => HandleSelect(el)(e)} checked={el.selected === 'true' ? true : false} />
                    </div>
                    <div className="card__footer__main">

                      {popupCard === index
                        ?
                        <a className="close__button" href="#" onClick={() => { setPopupCard() }}><i className="fas fa-times close-btn"></i> Close</a>
                        :
                        <a className="more__button" href="#" onClick={() => { setPopupCard(index); handleClick(el) }}>More</a>
                      }

                      <div className="like__sec" onClick={() => HandleLikes(el)}>
                        <i className="fas fa-heart" style={{ color: `rgb(200,${Number(el['likes']) % 256},${Math.floor(Number(el['likes']) / 25)})` }}></i>
                        {el['likes'] && <p>{Number(el['likes']) > 0 ? el['likes'] : ''}</p>}

                      </div>

                      <div>

                        {
                          AppFields.filter(x => x.stars === 'up') && AppFields.filter(x => x.stars === 'down') && AppFields.filter(x => x.stars === 'down')[0] && AppFields.filter(x => x.stars === 'down')[0].name !== 0 ?
                            <Stars rating={(Number(el[AppFields.filter(x => x.stars === 'down')[0].name]) - Number(el[AppFields.filter(x => x.stars === 'up')[0].name]) + 1) * 100 / Number(el[AppFields.filter(x => x.stars === 'down')[0].name])} />
                            :
                            <Stars rating={0} />

                        }</div>

                      {el['top_image'] ? <img className='topStyle' src={require(`./../../../assets/${el['top_image']}.png`)} /> : null}
                    </div>
                  </div>


                </div>
              </>
            ))}




          </div>
        </div>
      }
    </>
  )
}
export default Card3;

