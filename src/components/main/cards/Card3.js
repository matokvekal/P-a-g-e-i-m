import React, { useState, useEffect, useContext } from 'react';
import { ConfigContext } from '../../../context/ConfigContext';
import { pageimEndPoint } from '../../../Config';
import Checkboxes from './cards-extra';
import person from './../../../assets/person.png';
// import trophy from './../../../assets/trophy.png';
import quantity from './../../../assets/quantity.png';
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
import { RecoilRoot } from "recoil";
import { atom, useRecoilState, useSetRecoilState, useRecoilValue } from 'recoil'
import usePagination from './../../../hooks/Pagination';
import CircularProgress from '../../reusable/Progress';
import deviceIdentity from '../../../helpers/Helpers';



export const Card3 = (props) => {
  const [data, setData] = useState([]);
  const API_ENDPOINT = pageimEndPoint();
  const [trigerFetch, setTrigerFetch] = useState([]);
  const [tableFields, setTableFields] = useContext(ConfigContext);
  const [AppFields, setAppFields] = useState([]);
  const [errorMsg, setErrorMsg] = useState('Err card3');
  const [loader, setLoader] = useState(false);
  const hideCardModal = atom({
    key: "HideCardModal",
    default: "",
  });
  const sortSelected = atom({
    key: "sortSelected",
    default: '',
  });
  const [popupCard, setPopupCard] = useRecoilState(hideCardModal);
  const [responsItems, setResponseItems] = useState(1500);
  const { items, setItems, currentPage, itemsPerPage, mobilePage, setCurrentPage, setMobilePage } = usePagination();
  // let APP = window.location.pathname.toString();
  //   APP= APP?APP.substr(1).toLowerCase():'';
  let app = props.app ? props.app : '';
  let APP = app ? app.substr(1) : '';
  APP = APP.toLowerCase();

  const newSearch = atom({
    key: "searchState",
    default: "",
  });
  const [searchNew, setSearchNew] = useRecoilState(newSearch);

  const newFilter = atom({
    key: "filterState",
    default: "",
  });
  const [filter, setFilter] = useRecoilState(newFilter);

  const [order_by] = useRecoilState(sortSelected);

  const [likeChange, setLikechange] = useState('');

  const updateLike = (id) => {
    //debugger
    if (app === '/' || app === '/Templates' || !id)
      return
    if (!deviceIdentity())
      return
    if (id) {
      const URL = `${API_ENDPOINT}/pageim/likesUpdate?appname=${APP}&id=${id}`;
      fetch(URL, {
        method: 'POST',
        headers: { Authorization: "Bearer " + localStorage['deviceIdentity'] },
      }

      )
        .then(response => {
          return response.json();
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }
  }

  function addLike(el) {
    if (!localStorage['registeredUser']) {
      alert('please register, its simple, then give a big like!');
      return
    }
    //debugger
    let updateSucceed = false;
    var array = [];
    if (!localStorage['info']) {
      array.push(el['id']);
      el['likes'] = 1;
      localStorage.setItem('info', JSON.stringify(array));
      updateLike(el['id']);
      setLikechange(new Date().getTime());
    }
    else {
      array = JSON.parse(localStorage.getItem('info')) || [];
      if (!array.includes(el['id'])) {
        el['likes'] = Number(el['likes']) + 1;
        array.push(el['id']);
        localStorage.setItem('info', JSON.stringify(array));
        updateLike(el['id']);
        setLikechange(new Date().getTime());
        //goto server
      }

    }
  }

  useEffect(() => {
    //debugger
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
    // debugger
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
      .then(response => {
        //debugger
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




  return (
    <>
      {loader ? <CircularProgress /> : null}
      {!AppFields || AppFields.length === 0 || !data
        ?
        <span className='error'>Error occured : {errorMsg} <CircularProgress /></span> :


        <div className="cards__area">

          <div className="cards">
            <div class="main_head_mobile">
              <h1>ISRAEL CYCLING RACES RESULTS</h1>
            </div>
            {data.map((el, index) => (
              <>
                {/*<!-- Mobile standing -->*/}
                <tr className='standing' key={index * 331}>
                  <td className='tdStanding pos'><span>{el['pos']}</span>
                    {/* <img className="img_trophy" src={el['pos'] === '1' ? 'trophy' : el['pos'] === '2' ? 'medal2' : el['pos'] === '3' ? 'medal3' : null} alt="" /> */}
                    {el['pos'] === '1'
                            ?
                            <img className="img_trophy" src={trophy} alt="medal" />
                            :
                            el['pos'] === '2'
                              ?
                              <img className="img_trophy" src={medal2} alt="medal" />
                              :
                              el['pos'] === '3'
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
                              <img className="img_bike"  src={mtbbike} alt="mtbbike" />
                              :
                              el['branch'] === 'מסלול'
                                ?
                                <img className="img_bike"  src={trackbike} alt="trackbike" />
                                : 
                                el['branch'] === 'סיקלוקרוס'
                                ?
                                <img className="img_bike"  src={cyclocrossbike} alt="cyclocrossbike" />
                                : null
                          }
                 
                  </td>
                  <td className='tdStanding full_name' onClick={() => { setPopupCard(index) }}>{el['full_name']}</td>
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
                        <p className="user__place" >{el['pos']}</p>
                        <p className="user__name">{el['full_name']}</p>
                        <div className="trophy__quantity">
                          {el['pos'] === '1'
                            ?
                            <img className="trophy" src={trophy} alt="" />
                            :
                            el['pos'] === '2'
                              ?
                              <img className="quantity" src={medal2} alt="" />
                              :
                              el['pos'] === '3'
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
                    <div className="flag__status">
                      <i className="fa fa-circle" aria-hidden="true"></i>
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

                    </div>
                    <div className="card__footer__main">

                      {popupCard === index
                        ?
                        <a className="close__button" href="#" onClick={() => { setPopupCard() }}><i className="fas fa-times close-btn"></i> Close</a>
                        :
                        <a className="more__button" href="#" onClick={() => { setPopupCard(index) }}>More</a>
                      }
                      <div className="like__sec" onClick={() => addLike(el)}>
                        <i className="fas fa-heart"></i>
                        <p>{Number(el['likes']) > 0 ? el['likes'] : ''}</p>

                      </div>
                      <Stars rating={(el['total_finish_cat'] - el['pic'] + 1) * 100 / el['total_finish_cat']} />


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

