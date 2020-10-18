import React, { useState, useEffect, useContext } from 'react';
import { ConfigContext } from '../../../context/ConfigContext';
import { pageimEndPoint } from '../../../Config';
import colors from './../../../assets/color.json';
import person from './../../../assets/person.png';
import israelFlag from './../../../assets/israelFlag.png';
import trophy from './../../../assets/trophy.png';
import club_flag from './../../../assets/club_flag.png';
import cyclocrossbike from './../../../assets/cyclocrossbike.png';
import trackbike from './../../../assets/trackbike.png';
import mtbbike from './../../../assets/mtbbike.png';
import roadbike from './../../../assets/roadbike.png';
import medal2 from './../../../assets/medal2.png';
import medal3 from './../../../assets/medal3.png';
import Stars from './Stars';
import { atom, useRecoilState } from 'recoil'
import usePagination from './../../../hooks/Pagination';
import CircularProgress from '../../reusable/Progress';
import deviceIdentity, { getApp } from '../../../helpers/Helpers';
import ClickItem from '../../../helpers/clickItem';
// import UpdateLikes from './UpdateLikes';
//import HandleLikes from '../../../helpers/addLike';
// import { red } from '@material-ui/core/colors';
import useLogIn from '../../../helpers/LogIn';
import http from './http';

export const Card3 = (props) => {
  const [data, setData] = useState([]);
  const API_ENDPOINT = pageimEndPoint();
  const [tableFields, setTableFields] = useContext(ConfigContext);
  const [AppFields, setAppFields] = useState([]);
  const [errorMsg, setErrorMsg] = useState('Err card3');
  const [loader, setLoader] = useState(false);
  const { addLikeLogin } = useLogIn();
  // const {AddLike}=HandleLikes();
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
      if (localStorage['fields']) {
        let data = JSON.parse(localStorage['fields']);
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
    //debugger
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
        return response.json()
      })
      .then(res => {
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
    //debugger
    const temp = likeChange.hasChange;
    // const temp = likeChange.likes + likeChange.id;
    //debugger
    if (app === '/' || app === '/Templates' || filter.value == 'undefined' || filter.name == 'undefined' || !filter.value || !filter.name)
      return
    if (!deviceIdentity())
      return
    //debugger
    let data = filter;
    setLoader(true);
    const URL = `${API_ENDPOINT}/pageim/filterUpdate?appname=${APP}&checked=${filter.checked}&name=${filter.name}&value=${filter.value}&itemsperpage=${itemsPerPage}`;


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
    //debugger
    ClickItem('like', 'name', el['full_name'], el['id']);
  }


  function HandleLikes(el) {
    //debugger
    ClickItem('like', 'name', el['full_name'], el['id']);
    if (!login) {
      addLikeLogin(' Please register, then you give abig Heart');
      return
    }
    //---------------------------------------------------------------------
    var array = [];
    if (!localStorage['info']) {
      el['likes'] = 1;
    }
    else {
      //debugger
      array = JSON.parse(localStorage.getItem('info')) || [];
      if (array.length > 500)
        array = [];
      if (!array.includes(el['id'])) {
        el['likes'] = Number(el['likes']) + 1;
      }
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
                  <td className='tdStanding pos' ><span>{el['pic']}</span>
                    {el['pic'] === '1'
                      ?
                      <img className="img_trophy" src={trophy} alt="medal" />
                      :
                      el['pic'] === '2'
                        ?
                        <img className="img_trophy" src={medal2} alt="medal" />
                        :
                        el['pic'] === '3'
                          ?
                          <img className="img_trophy" src={medal3} alt="medal" />
                          : null
                    }
                  </td>
                  <td className='tdStanding branch'>
                    {/* <img src={israelFlag} className="img_flag" alt="" /> */}
                    {el['branch'] === 'כביש'
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
                    }

                  </td>
                  <td className='tdStanding full_name' >{el['full_name']}</td>
                  <td className='tdStanding club'>{el['club']}</td>
                  <td className='tdStanding race_name'>{el['race_name']}</td>
                  <td className='tdStanding year'>{el['year']}</td>
                  <td className='tdStanding category'>{el['category']}</td>
                  <td className='tdStanding total_tm'>{el['total_tm']}</td>
                  <td className='tdStanding diff'>{el['diff']}</td>
                </tr>
                <div className={popupCard === index ? 'card__item active' : data.length < 5 ? 'card__item card_item_width' : 'card__item'} id={popupCard === index ? 'popup' : null} data={index}>

                  {/*<!-- Card Header-->*/}
                  <div className="card__header" >
                    <div className="profile__img">
                      <img src={person} alt="" />
                    </div>

                    <div className="name__trophy">
                      <div className="name__place">
                        <p>({el['total_finish_cat']})</p>
                        <p className="user__place" >{el['pic']}</p>
                        <p className="user__name">{el['full_name']}</p>
                        <div className="trophy__quantity">
                          {el['pic'] === '1'
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
                          }
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

                    <div className="left">
                      {AppFields.filter(x => (x.card_show_list === 1)).slice(0, popupCard !== index ? 7 : 100).sort((a, b) => (a.card_order > b.card_order) ? 1 : -1).map((header, index1) => (
                        <>
                          {
                            header.card_show_list === 1 && el[header.name]
                              ?
                              <p>{header.label}:</p>
                              :
                              <p></p>
                          }
                        </>
                      ))}
                    </div>
                    <div className="right">
                      {AppFields.filter(x => (x.card_show_list === 1)).slice(0, popupCard !== index ? 7 : 100).sort((a, b) => (a.card_order > b.card_order) ? 1 : -1).map((header, index2) => (
                        <>
                          {
                            header.card_show_list === 1 && el[header.name]
                              ?
                              <p>{el[header.name]}</p>
                              :
                              <p></p>
                          }
                        </>
                      ))}
                    </div>
                  </div>

                  <div className="card__footer">
                    <div className="icons">
                      <a href={`https://wa.me/?text=${window.location.href}`} target="_blank"><i className="fas fa-share-alt-square share"></i></a>
                      <input className="check" type="checkbox" name="completed" id="" />
                      {/* <p>{(Number(el['total_finish_cat'])- Number(el['pic'])+ 1) * 100 / Number(el['total_finish_cat'])}</p>
                      <p>{el['pic']}</p> */}
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

                      </div>{
                        el['pic'] && el['pic'] != '' ?
                          <Stars rating={(Number(el['total_finish_cat']) - Number(el['pic']) + 1) * 100 / Number(el['total_finish_cat'])} />
                          :
                          <Stars rating={0} />

                      }


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

