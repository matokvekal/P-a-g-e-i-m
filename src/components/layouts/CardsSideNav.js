import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Button } from 'antd';
import { atom, useRecoilState, RecoilRoot } from 'recoil';
import CircularProgress from '../reusable/Progress';


const CardsSideNav = () => {
  // debugger
  const menuListAtom = atom({
    key: "menuList",
    default: '',
  });
  const [menuList, setMenuList] = useRecoilState(menuListAtom);
  const menuOpenClose = atom({
    key: "menuOpenClose",
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
          <div className="sidebar__text">
            Menu
          </div>
          <ul className="nav__list">

            {/* // menuList&& menuList.length > 0 ? menuList.sort((a, b) => (a.order > b.order) ? 1 : -1).map(item => ( */}

            {menuList && menuList.length > 0 ? menuList.filter(item => item.level == 0).map(item => (
              <>
                {item.hasChild == 1
                  ?
                  <>{/* TODO-- Sub menu is not comlitly developed*/}
                    <div class="subnav">
                      <li class="nav__item" onClick={() => openSubMenu(item.id)}>
                        {/* <a href={'/' + item.linkTo} className="nav__link" key={item.id * 11187} id='sub__menu'>{item.text}<i className="fas fa-caret-down"></i></a> */}
                        <a className="nav__link" key={item.id * 11187} id='sub__menu'>{item.text}<i className={activeSubMenu != item.id ? 'fas fa-caret-down' : 'fas fa-caret-up'}></i></a>
                      </li>
                      <div class={`subnav-content ${activeSubMenu == item.id ? 'active' : null}`}>
                        {menuList.filter(y => y.level == 1).filter(x => x.myParentId == item.id).map(subItem => (
                          <li class="nav__item" onClick={() => openSubMenu(item.id)}>
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