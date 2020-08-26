import React from 'react';




const CardsSideNav=()=>{

return(
   <>
        <header>
  <nav className="sidebar">
            <div className="sidebar__text">
              Catagory
                </div>
            <ul className="nav__list">
              <li className="nav__item">
                <a href="#" className="nav__link">All Hardware</a>
              </li>
              <li className="nav__item">
                <a href="#" className="nav__link">Audio Computers</a>
              </li>
              <li className="nav__item">
                <a href="#" className="nav__link">Soundgrid Servers</a>
              </li>
              <li className="nav__item">
                <a href="#" className="nav__link">Computer Servers</a>
              </li>
              <li className="nav__item">
                <a href="#" className="nav__link">Soundgrid Connect Combos</a>
              </li>
              <li className="nav__item">
                <a href="#" className="nav__link">All Soundgrid Interface</a>
              </li>
              <li className="nav__item">
                <a href="#" className="nav__link">Soundgrid Interfaces htmlFor Live Sound</a>
              </li>
              <li className="nav__item">
                <a href="#" className="nav__link">Soundgrid Interfaces htmlFor the Studio</a>
              </li>
              <li className="nav__item">
                <a href="#" className="nav__link">eMotion LV1 Live Mixer Combos</a>
              </li>
              <li className="nav__item">
                <a href="#" className="nav__link">DiGiGrid Interfaces</a>
              </li>
              <li className="nav__item">
                <a href="#" className="nav__link">DiGiGrid Specials</a>
              </li>
            </ul>
          </nav>
          </header>
          <div className="sub__menu">
                    <div className="catagory" id="catagory">    
                        <div className="sub__catagory__1">
                            <input type="checkbox" id="A"/>
                            <label htmlFor="A">Catagory 1</label>
                            <ul className="sub__catagory">
                                <li className="cat__item">
                                    <input type="checkbox" id="sub__1"/>
                                    <label htmlFor="sub__1">Sub Catagory 1-1</label>
                                </li>
                                <li className="cat__item">
                                    <input type="checkbox" id="sub__2"/>
                                    <label htmlFor="sub__1">Sub Catagory 1-2</label>
                                </li>
                            </ul>
                        </div>
                        <div className="sub__catagory__2">
                            <input type="checkbox" id="B"/>
                            <label htmlFor="B">Catagory 2</label>
                            <ul className="sub__catagory">
                                <li className="cat__item">
                                    <input type="checkbox" id="sub__2"/>
                                    <label htmlFor="sub__2">Sub Catagory 2-1</label>
                                </li>
                                <li className="cat__item">
                                    <input type="checkbox" id="sub__2"/>
                                    <label htmlFor="sub__2">Sub Catagory 2-2</label>
                                </li>
                                <li className="cat__item">
                                    <input type="checkbox" id="sub__2"/>
                                    <label htmlFor="sub__2">Sub Catagory 2-3</label>
                                </li>
                            </ul>
                        </div>
                        <div className="sub__catagory__3">
                            <input type="checkbox" id="C"/>
                            <label htmlFor="C">Catagory 3</label>
                            <ul className="sub__catagory">
                                <li className="cat__item">
                                    <input type="checkbox" id="sub__3"/>
                                    <label htmlFor="sub__1">Sub Catagory 3-1</label>
                                </li>
                                <li className="cat__item">
                                    <input type="checkbox" id="sub__3"/>
                                    <label htmlFor="sub__1">Sub Catagory 3-2</label>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

   </>
)

}
export default CardsSideNav;