import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Button } from 'antd';
import { atom, useRecoilState, RecoilRoot } from 'recoil';
import CircularProgress from '../reusable/Progress';
import './cardsSideNav.css';
import useLogIn from './../../helpers/LogIn';
// import LogOff from '../../helpers/LogOff';
// import LoginModal from '../../helpers/LoginModal';
// import Login from  '../../helpers/LogIn';
// import LogIn from '../../helpers/LogIn';
// import SmsAuth from './../main/smsVerification/SmsAuth';

const CardsSideNav = () => {

  // debugger
  const menuListAtom = atom({
    key: "_menuList",
    default: '',
  });
  const isLogIn = atom({
    key: "_logIn",
    default: 'false',
  });
  const [login, setLogin] = useRecoilState(isLogIn);
  const {handleLogin}=useLogIn();
  // const [handleLogin,sethandleLogin]=useState(isLogIn);
  // const loginModal = atom({
  //   key: "LoginModal",
  //   default: {
  //     formType: '',
  //     active: false,
  //     message: '<p></p>',
  //   },
  // });
  // const [modalLogin, setModalLogin] = useRecoilState(loginModal);
  // useEffect(() => {
  //   if (localStorage["isLogin"] && localStorage["isLogin"] === 'true')
  //     setLogin('true');
  //   else
  //     setLogin('false');
  // }, [])

  // function handleLogin() {
  //   debugger
  //   if (login === true) {
  //     setLogin(false);
  //     localStorage["isLogin"] = 'false';
  //     LogOff();
  //   }
  //   else
  //   {
  //     // setLogin(true);
  //     // localStorage["isLogin"] = 'true';
  //       if (localStorage['login_trys'] && Number(localStorage['login_trys']) >= 3
  //       && localStorage['login_last_try'] && localStorage['login_last_try'] < (Date.now() - 20 * 60 * 1000)) {
  //         setModalLogin({ active: true, message: <p>To meny trys, wait 20 minutes</p>, formType: 'message' });
  //     }
  //           else
  //       setModalLogin({ active: true, message: <p>test</p>, formType: 'message' });
  //   }
    

  // }

  const [menuList, setMenuList] = useRecoilState(menuListAtom);

  const menuOpenClose = atom({
    key: "_menuOpenClose",
    default: '',
  });
  const [activeSubMenu, setActiveSubMenu] = useState('');
  const openSubMenu = function (id) {
    setActiveSubMenu(x => x == id ? null : id);
  }

  const [menuToggle, setMenuToggle] = useRecoilState(menuOpenClose);
  return (
    <>
      <header>
        <nav className={`sidebar  ${menuToggle}`}>

          <div className='navheader'>
            <div className='loginout' onClick={()=>handleLogin('Thanks for login, please insert your name and mobile number')}>
              <i className={`fa fa-sign-in ${login ? 'hide' : ''}`} aria-hidden="true"></i>
              <i className={`fa fa-sign-out ${login ? '' : 'hide'}`} aria-hidden="true"></i>
            </div>
            <div className="sidebar__text">
              Menu
            </div>
          </div>
          <ul className="nav__list">

            {/* // menuList&& menuList.length > 0 ? menuList.sort((a, b) => (a.order > b.order) ? 1 : -1).map(item => ( */}

            {menuList && menuList.length > 0 ? menuList.filter(item => item.level == 0).map(item => (
              <>
                {item.hasChild == 1
                  ?
                  <>{/* TODO-- Sub menu is not comlitly developed*/}
                    <div className="subnav">
                      <li className="nav__item" onClick={() => openSubMenu(item.id)}>
                        {/* <a href={'/' + item.linkTo} className="nav__link" key={item.id * 11187} id='sub__menu'>{item.text}<i className="fas fa-caret-down"></i></a> */}
                        <a className="nav__link" key={item.id * 11187} id='sub__menu'>{item.text}<i className={activeSubMenu != item.id ? 'fas fa-caret-down' : 'fas fa-caret-up'}></i></a>
                      </li>
                      <div className={`subnav-content ${activeSubMenu == item.id ? 'active' : null}`}>
                        {menuList.filter(y => y.level == 1).filter(x => x.myParentId == item.id).map(subItem => (
                          <li className="nav__item" onClick={() => openSubMenu(item.id)}>
                            <a href={'/' + item.linkTo} className="nav__link" key={item.id * 11993} ><i className="fas fa-caret-right"></i>{subItem.text}</a>
                          </li>

                        ))}
                      </div>
                    </div>
                  </>
                  :
                  <>
                    <li className="nav__item" key={item.id * 997} >
                      <a href={'/' + item.linkTo} className="nav__link" key={item.id * 11187}>{item.text}</a>
                    </li>

                  </>
                }

              </>
            )) : <CircularProgress />
            }
          </ul>
        </nav>
      </header>


    </>
  )

}
export default CardsSideNav;