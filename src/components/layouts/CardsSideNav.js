import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { atom, useRecoilState, RecoilRoot } from 'recoil';
import CircularProgress from '../reusable/Progress';
import './cardsSideNav.css';
import useLogIn from './../../helpers/LogIn';


const CardsSideNav = () => {

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