import React, { useState, useEffect, useContext } from 'react';
import { ConfigContext } from '../../../context/ConfigContext';
import { pageimEndPoint } from '../../../Config';
import colors from './../../../assets/color.json';
import person from './../../../assets/person.png';
import israelFlag from './../../../assets/israelFlag.png';
// import cup from './../../../assets/cup.png';
// import club_flag from './../../../assets/club_flag.png';
// import cyclocrossbike from './../../../assets/cyclocrossbike.png';
// import trackbike from './../../../assets/trackbike.png';
// import mtbbike from './../../../assets/mtbbike.png';
// import roadbike from './../../../assets/roadbike.png';
// import medal2 from './../../../assets/medal2.png';
// import medal3 from './../../../assets/medal3.png';
// import top10 from './../../../assets/top10_3.png';
// import top20 from './../../../assets/TOP20_1.png';

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

    if (!tableFields || tableFields.length === 0)
      localStorage.removeItem("fields");
  }, [tableFields])



  useEffect(() => {
    if (app === '/' || app === '/Templates')
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
        debugger
        return response.json()
      })
      .then(res => {
        debugger
        if (res && res.res && res.res[0] && res.res[0].success === false)
          console.log('Err in stateUpdate sp');

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
    if (app === '/' || app === '/Templates' || filter.value == 'undefined' || filter.name == 'undefined' || !filter.value || !filter.name)
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
        debugger
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
    ClickItem('like', 'name', el['full_name'], el['id']);
  }


  function HandleLikes(el) {
    closeModal();
    // setPopupCard('');
    debugger
    setPopupCard('');
    ClickItem('like', 'name', el['full_name'], el['id']);
    if (!login) {
      addLikeLogin(' Please login its simple, then you give abig LOVE');
      return
    }

    const array = JSON.parse(localStorage.getItem('info')) || [];

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
    localStorage.setItem('info', JSON.stringify(array));



    let APP = window.location.pathname.toString();
    APP = APP ? APP.substr(1).toLowerCase() : '';

    if (!deviceIdentity())
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
              <h1>ISRAEL CYCLING RACES RESULTS</h1>
            </div>
            {data.map((el, index) => (
              <>
                {/*<!-- Mobile standing -->*/}
                <tr className='standing' key={index * 331} onClick={() => { setPopupCard(index) }}>
                  <td className='tdStanding pos' >
                    {el['pic']}
                    {el['medal_image'] ? <img src={require(`./../../../assets/${el['medal_image']}.png`)} /> : null}
                  </td>
                  <td className='tdStanding branch'>
                    {el['image'] ? <img src={require(`./../../../assets/${el['image']}.png`)} /> : null}
                    {/* {el['top_image']?<img className="top_image" src={el['top_image']} alt={el['top_image']} />:null} */}
                    {/* {el['top_image']?<img className="top_image" src={require(`./../../../assets/${el['top_image']}.jpg`)}/>:el['medal_image']} */}

                    {/* <img src={israelFlag} className="img_flag" alt="" /> */}
                    {/* {el['branch'] === 'כביש'
                      ?
                      <img className="img_bike" src={roadbike} alt="roadbik />
                      :
                      el['branch'] === 'הרים'
                        ?
                        <img className="img_bike" src={mtbbike} alt="mtbbike" />
                        :
                        el['branch'] === 'מסלול'
                          ?
                          <img className="img_bike" src={trackbike} alt="trackbike" />
                          :
                          el['branch'] === 'סיקלוקרוס'
                            ?
                            <img className="img_bike" src={cyclocrossbike} alt="cyclocrossbike" />
                            : null
                    } */}
                  </td>
                  {AppFields.filter(x => (x.standing_show === 1)).sort((a, b) => (a.standing_order > b.standing_order) ? 1 : -1).map((header, index1) => (
                    <td className={`tdStanding ${el[header.name]}`} style={{ 'width': header.style_standing }}>{el[header.name] ? el[header.name] : null}</td>

                  ))}

                  {/* {el['branch'] === 'מסלול'
                    ?
                    <>
                      <td className='tdStanding full_name' >{el['full_name']}</td>
                      <td className='tdStanding club'>{el['club']}</td>
                      <td className='tdStanding race_name'>{el['race_name']}</td>
                      <td className='tdStanding year'>{el['year']}</td>
                      <td className='tdStanding category'>{el['category']}</td>
                      <td className='tdStanding total_tm'>{el['total_tm']}</td>
                      <td className='tdStanding diff'>{el['lung']}</td>
                    </>
                    :
                    <>
                      <td className='tdStanding full_name' >{el['full_name']}</td>
                      <td className='tdStanding club'>{el['club']}</td>
                      <td className='tdStanding race_name'>{el['race_name']}</td>
                      <td className='tdStanding year'>{el['year']}</td>
                      <td className='tdStanding category'>{el['category']}</td>
                      <td className='tdStanding total_tm'>{el['total_tm']}</td>
                      <td className='tdStanding diff'>{el['diff']}</td>
                    </>
                  } */}
                </tr>
                <div className={popupCard === index ? 'card__item active' : data.length < 5 ? 'card__item card_item_width' : 'card__item'} id={popupCard === index ? 'popup' : null} data={index}>

                  {/*<!-- Card Header-->*/}
                  <div className="card__header" >
                    <div className="profile__img">
                      {el['image'] ? <img src={require(`./../../../assets/${el['image']}.png`)} /> : null}
                      {/* <img src={person} alt="" /> */}
                      {/* {el['branch'] === 'כביש'
                        ?
                        <img className="img_bike" src={roadbike} alt="roadbike" />
                        :
                        el['branch'] === 'הרים'
                          ?
                          <img className="img_bike" src={mtbbike} alt="mtbbike" />
                          :
                          el['branch'] === 'מסלול'
                            ?
                            <img className="img_bike" src={trackbike} alt="trackbike" />
                            :
                            el['branch'] === 'סיקלוקרוס'
                              ?
                              <img className="img_bike" src={cyclocrossbike} alt="cyclocrossbike" />
                              : null
                      } */}
                    </div>

                    <div className="name__trophy">
                      <div className="name__place">
                        <p>({el['total_finish_cat']})</p>
                        <p className="user__place" >{el['pic']}</p>
                        <p className="user__name">{el['full_name']}</p>
                        <div className="trophy__quantity">
                          {/* {el['medal_image'] ? <img className="medal_image" src={el['medal_image']} alt={el['medal_image']} /> : null} */}
                          {el['medal_image'] ? <img src={require(`./../../../assets/${el['medal_image']}.png`)} /> : null}
                          {/* {el['pic'] === '1'
                            ?
                            <img className="trophy" src={trophy} alt="" />
                            :
                            el['pic'] === '2'
                              ?
                              <img className="quantity" src={medal2} alt="" />
                              :
                              el['pic'] === '3'
                                ?
                                <img className="quantity" src={medal3} alt="" />
                                : null
                          } */}
                          <p className="race__branch">{el['branch'] + ' ,'}</p>
                          <p className="race__category">{el['category'] + ' '}</p>
                        </div>
                      </div>
                      <div className="race__name__year">
                        <p className="race__name">{el['race_name']}</p>
                        <p className="race__year">{el['year']}</p>
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
                          {/* {AppFields.filter(x => (x.card_show === 1)).slice(0, popupCard !== index ? 7 : 100).sort((a, b) => (a.card_order > b.card_order) ? 1 : -1).map((header, index1) => ( */}
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
                          el['pic'] && el['pic'] != '' ?
                            <Stars rating={(Number(el['total_finish_cat']) - Number(el['pic']) + 1) * 100 / Number(el['total_finish_cat'])} />
                            :
                            <Stars rating={0} />

                        }</div> 
                      
                         {el['top_image'] ? <img className='topStyle' src={require(`./../../../assets/${el['top_image']}.png`)} /> : null}
                      {/* {el['pic'] && Number(el['pic']) > 0 && Number(el['pic']) <= 10 && <div><img className="top10" src={top10} alt="top10" /></div>}
                      {el['pic'] && Number(el['pic']) > 0 && Number(el['pic']) > 10 && Number(el['pic']) <= 20 && <div><img className="top10" src={top20} alt="top20" /></div>} */}
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

