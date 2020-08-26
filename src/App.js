import React, { useState, useEffect } from 'react';
import ConfigContextProvider from './context/ConfigContext';
import MenuContextProvider from './context/MenuContext';
import GlobalContextProvider from './context/GlobalContext';
// import PrimarySearchAppBar from './components/layouts/PrimarySearchAppBar';
// import './App.css';
import UploadFile from './components/UploadFile';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Pageim from './components/Pageim';
import Templates from './components/main/Templates';
import TodoWatsApp from './components/main/external/TodoWatsApp';
import DynamicComponent from './components/main/DynamicComponent';
import { pageimEndPoint } from './Config';
import { url } from './helpers/Helpers';
import { RecoilRoot } from "recoil";
import CardsHeader from './components/layouts/CardsHeader';
import CardsSideNav from './components/layouts/CardsSideNav';
import CardsFilter from './components/layouts/CardsFilter';
import CardsSort from './components/layouts/CardsSort';
import CardsChat from './components/layouts/CardsChat';
import CardsFooter from './components/layouts/CardsFooter';
const colorPalet = [];
colorPalet.basic = {
  '--color-primary': '#f89514',
  '--bg-primary': '#3ebedf',
  '--text': '#16191a',
  '--text-second': '#ffffff',
  '--hover': '#81ecec',
  '--hover-text-color': '#1c3183',
  '--share-icon': '#4cd137',
  '--rating': '#01ac89',
  '--active-off': '#d69c30',
  '--active-on': '#4cd137',
  '--trophy': '#60bdaa',
  '--header-footer-color': '#2271cc',
  '--underline': '#576574',
  '--header-footer-icon': '#8395a7',
  '--header-footer-text-color': '#ecf0f1',
  '--color-danger': '#aaca1b',
}
colorPalet.tryit = {
  '--color-primary': '#1a89f1',
  '--bg-primary': '#3ebedf',
  '--text': '#16191a',
  '--text-second': '#ffffff',
  '--hover': '#81ecec',
  '--hover-text-color': '#1c3183',
  '--share-icon': '#4cd137',
  '--rating': '##F4FF81',
  '--active-off': '#d69c30',
  '--active-on': '#4cd137',
  '--trophy': '#60bdaa',
  '--header-footer-color': '#4A148C',
  '--underline': '#00B0FF',
  '--header-footer-icon': '#1DE9B6',
  '--header-footer-text-color': '#ecf0f1',
  '--color-danger': '#aaca1b',
}


function App() {
  //aaca1b #f89514;
  let set = 'tryit';
  function setColor(set) {
    const color = colorPalet[set];

    for (let key in color) {
      document.documentElement.style.setProperty(key, color[key]);
    }
  }


  const [renderCounter, setRenderCounter] = useState([])
  const API_ENDPOINT = pageimEndPoint();
  const [menuList, setMenuList] = useState([]);
  const location = window.location.pathname;
  const [freeUserToken] = useState(null)

  let currentDir = window.localStorage.getItem('AppDirection');
  if (currentDir == null || (currentDir !== 'rtl' && currentDir !== 'ltr'))
    currentDir = 'ltr';




  useEffect(() => {
    let APP = window.location.pathname.toString();
    APP= APP?APP.substr(1).toLowerCase():'';
    if (!localStorage['freeUserToken'] || localStorage['freeUserToken'] === null || localStorage['freeUserToken'] === "undefined") {
      console.log('no user token App.js')
    }
    else {
      const URL = `${API_ENDPOINT}/applications/menuApplications?appname=races`;
      //const URL=url('public','menu','data');
      //const URL = `${API_ENDPOINT}/public/menu/data`;
      // const URL = `${API_ENDPOINT}/applications/menuApplications?appname=menu`;
      fetch(URL, {
        method: 'GET',
        headers: { Authorization: "Bearer " + localStorage['freeUserToken'] },
      }
      )
        .then(response => {
          // debugger 
          return response.json()
        })
        .then(data => {
          // debugger

          return setMenuList(data.appsresult[1])
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }

  }, []);

  let screenView = 'table';
  const [AppDirection, setAppDirection] = useState(currentDir ? currentDir : 'ltr');
  const [screenType, setScreenType] = useState(screenView ? screenView : 'table');
  return (
    <>
      <div className="total__content">

        <main>
          <div className="whole__content" id="blur">
          
            <GlobalContextProvider>
              <Router>
                <ConfigContextProvider>
                  <Switch>
                    <Route exact path="/" component={Templates} />
                    <Route path="/Templates" component={Templates} />
                  </Switch>
                  <RecoilRoot>
                    <Route path="/TodoWatsApp" component={TodoWatsApp} />
              
                  <CardsSideNav />
                  <CardsHeader />
                  <CardsFilter />
                  <CardsSort />
                 
                  <Switch>
                    {(menuList && menuList.length > 0) ? menuList.map((item, index) => (
                      item.mainApp === 'pageim'
                        ?
                        <Route exact path={'/' + item.app}><Pageim app={'/' + item.app} appPermission={item.permission} screenType={screenType} key={index} /> </Route>
                        :
                        <Route exact path={'/' + item.name}><DynamicComponent html={item.html} /> </Route>
                    )) : console.log('menu error')}
                  </Switch>
                  <CardsFooter />
                  <CardsChat />
                  </RecoilRoot>

                </ConfigContextProvider>
              </Router>
              {/*</MenuContextProvider>*/}
            </GlobalContextProvider>
           
          
          </div>
        </main>
      </div>
   
      <script src="./main.js"></script>
    </>
  );
}

export default App;
