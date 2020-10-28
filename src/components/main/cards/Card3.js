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


  useEffect(() => {
    //debugger
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
      debugger
      localStorage.removeItem("fields");
    }
  }, [tableFields])



  useEffect(() => {
    // debugger
    if (!app || app === '/' || app === '/Templates' ||searchNew.length===1)
      return
    if (!deviceIdentity())
      return
    setLoader(true);
    const URL = `${API_ENDPOINT}/pageim/stateUpdate?appname=${APP}&search=${searchNew}&currentpage=${currentPage}&itemsperpage=${itemsPerPage}&order_by=${order_by}`;
    fetch(URL, {
      method: 'POST',
      headers: { Authorization: "Bearer " + localStorage['deviceIdentity'] },
    }
    )
      // http.Post(URL)
      .then(response => {
        //debugger
        return response.json()
      })
      .then(res => {
        // debugger
        if (res && res.res && res.res[0] && res.res[0].success === 'false') {
          console.log('Err in stateUpdate sp');
          return;
        }

        mobilePage
          ?
          setData(res.res ? [...data, ...res.res] : [...data])
          :
          setData(res.res ? res.res : null);
        setItems(res.total[0].totalRows);// react- in mobile page just add data insted of replace
        setLoader(false);
      })
      .catch((error) => {
        console.error('Error:', error);
      });


  }, [AppFields, searchNew, currentPage, itemsPerPage, mobilePage, order_by]);


  useEffect(() => {
    const temp = likeChange.hasChange;
    if (!app || app === '/' || app === '/Templates' || filter.value == 'undefined' || filter.name == 'undefined' || !filter.value || !filter.name)
      return
    if (!deviceIdentity())
      return
    let data = filter;
    setLoader(true);
    const URL = `${API_ENDPOINT}/pageim/filterUpdate?appname=${APP}&checked=${filter.checked}&name=${filter.name}&value=${filter.value}&itemsperpage=${itemsPerPage}`;
    console.log(URL);
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
        //debugger
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
    ClickItem('like', 'name', el['full_name'], el['id']);
  }


  function HandleLikes(el) {
    closeModal();
    // setPopupCard('');
    //debugger
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
      if (el['likes'] && el['likes'] != '')
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


  return (
    <>

      {loader ? <CircularProgress /> : null}
      {!AppFields || AppFields.length === 0 || !data
        ?
        <span className='error'>Error occured : {errorMsg} <CircularProgress /></span> :


        <div className="cards__area">

          <div className="cards">
            <div className="main_head_mobile">
              {/* <h1>ISRAEL CYCLING RACES RESULTS</h1> */}
              <h1>{menuList.filter(x => x.app === APP)[0].standing_header}</h1>
            </div>
            {data.map((el, index) => (
              <>
                {/*<!-- Mobile standing -->*/}
                <tr className='standing' key={index * 331} onClick={() => { setPopupCard(index) }}>
                  <td className='tdStanding pos' >
                    {/* {el['pic']} */}
                    {AppFields.filter(x => x.standing_show === 1)[0] && AppFields.filter(x => x.standing_order === 999)[0] ? el[AppFields.filter(x => x.standing_order === 999)[0].name] : null}
                    {el['medal_image'] ? <img src={require(`./../../../assets/${el['medal_image']}.png`)} /> : null}
                  </td>
                  <td className='tdStanding branch'>
                    {el['image'] ? <img src={require(`./../../../assets/${el['image']}.png`)} /> : null}

                  </td>
                  {AppFields.filter(x => (x.standing_show === 1 && x.standing_order !== 999)).sort((a, b) => (a.standing_order > b.standing_order) ? 1 : -1).map((header, index1) => (
                    <td className={`tdStanding ${el[header.name]}`} style={{ 'width': header.style_standing }}>{el[header.name] ? el[header.name] : null}</td>

                  ))}


                </tr>
                <div className={popupCard === index ? 'card__item active' : data.length < 5 ? 'card__item card_item_width' : 'card__item'} id={popupCard === index ? 'popup' : null} data={index}>

                  {/*<!-- Card Header-->*/}
                  <div className="card__header" >
                    <div className="profile__img">
                      {el['image'] ? <img src={require(`./../../../assets/${el['image']}.png`)} /> : null}

                    </div>

                    <div className="name__trophy">
                      <div className="name__place">
                        <p>({AppFields.filter(x => x.cardHeaderPlace === 2)[0] ? el[AppFields.filter(x => x.cardHeaderPlace === 2)[0].name] : null})</p>
                        <p className="user__place" >{AppFields.filter(x => x.cardHeaderPlace === 3)[0] ? el[AppFields.filter(x => x.cardHeaderPlace === 3)[0].name] : null}</p>
                        <p className="user__name">{AppFields.filter(x => x.cardHeaderPlace === 1)[0] ? el[AppFields.filter(x => x.cardHeaderPlace === 1)[0].name] : null}</p>
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
                      <i className="fa fa-circle" aria-hidden="true" title={el['clicks'] + ' clicks'} style={{ color: !el['clicks'] ? 'white' : `rgb(${Number(colors[el['clicks']].rgb.r)},${Number(colors[el['clicks']].rgb.g)},${Number(colors[el['clicks']].rgb.b)})` }}></i>
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
                                  <p>{header.label}:</p>
                                  :
                                  <p></p>
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
                                  <p>{el[header.name]}</p>
                                  :
                                  <p></p>
                              }
                            </>
                          ))}
                        </div>
                      </>}
                  </div>

                  <div className="card__footer">
                    <div className="icons">
                      <a href={`https://wa.me/?text=${window.location.href}`} target="_blank"><i className="fas fa-share-alt-square share"></i></a>
                      <input className="check" type="checkbox" name="completed" id="" />

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
                        <p>{Number(el['likes']) > 0 ? el['likes'] : ''}</p>

                      </div>
                      <div>

                        {
                          AppFields.filter(x => x.Stars === 'up') && AppFields.filter(x => x.stars === 'down') && AppFields.filter(x => x.stars === 'down')[0].name !== 0 ?
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

