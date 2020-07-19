import React, { useState, useEffect } from 'react';
import ConfigContextProvider from './context/ConfigContext';
import MenuContextProvider from './context/MenuContext';
import GlobalContextProvider from './context/GlobalContext';
import PrimarySearchAppBar from './components/layouts/PrimarySearchAppBar';
import './App.css';
import UploadFile from './components/UploadFile';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Pageim from './components/Pageim';
import './App.css';
import Templates from './components/main/Templates';
import toDoWatsApp from './components/main/external/toDoWatsApp';
// import { getFields } from './services/getFields-old';
import { pageimEndPoint } from './Config';

// import RouterApp from './components/main/RouterApp';

function App() {
  console.log('at App.js')

  const [renderCounter, setRenderCounter] = useState([])
  const API_ENDPOINT = pageimEndPoint();
  const [menu, setMenu] = useState([]);
  const location = window.location.pathname;
  const [freeUserToken] = useState(null)

  let currentDir = window.localStorage.getItem('AppDirection');
  if (currentDir == null || (currentDir !== 'rtl' && currentDir !== 'ltr'))
    currentDir = 'ltr';




  useEffect(() => {
    console.log('at useEffect App.js')
      if (!localStorage['freeUserToken'] || localStorage['freeUserToken'] === null || localStorage['freeUserToken'] === "undefined") {
        console.log('no user token App.js')
      }
      else {

        const URL = `${API_ENDPOINT}/public/menu/data`;
        fetch(URL, {
          method: 'POST',
          headers: { Authorization: "Bearer " + localStorage['freeUserToken'] }
        }
        )
          .then(response => response.json())
          .then(data => setMenu(data))
          .catch((error) => {
            console.error('Error:', error);
          });
      }
    // }
    // setTrigerFetch('');
  }, []);

  let screenView = 'table';
  const [AppDirection, setAppDirection] = useState(currentDir ? currentDir : 'ltr');
  const [screenType, setScreenType] = useState(screenView ? screenView : 'table');
  return (
    <div className={AppDirection}>

      <GlobalContextProvider>
        <MenuContextProvider>
          <Router>
          <ConfigContextProvider>
            <Switch>
              <Route exact path="/" component={Templates} />
              <Route path="/Templates" component={Templates} />
            </Switch>
            <Route path="/toDoWatsApp" component={toDoWatsApp}/>
          
              <PrimarySearchAppBar setAppDirection={setAppDirection} AppDirection={AppDirection} setScreenType={setScreenType} screenType={screenType} />
              <Switch>
                {(menu && menu.length > 0) ? menu.map((item, index) => (
                  <Route exact path={'/' + item.app}><Pageim app={'/' + item.app} appPermission={item.permission} screenType={screenType} key={index} /> </Route>
                )) : console.log('menu error')}
              </Switch>
            </ConfigContextProvider>
          </Router>
        </MenuContextProvider>
      </GlobalContextProvider>
    </div>
  );
}

export default App;
