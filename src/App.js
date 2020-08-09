import React, { useState, useEffect } from 'react';
import ConfigContextProvider from './context/ConfigContext';
import MenuContextProvider from './context/MenuContext';
import GlobalContextProvider from './context/GlobalContext';
import PrimarySearchAppBar from './components/layouts/PrimarySearchAppBar';
import './App.css';
import UploadFile from './components/UploadFile';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Pageim from './components/Pageim';
import Templates from './components/main/Templates';
import TodoWatsApp from './components/main/external/TodoWatsApp';
import DynamicComponent from './components/main/DynamicComponent';
import { pageimEndPoint } from './Config';
import {url} from './helpers/Helpers';
import { RecoilRoot } from "recoil";



function App() {
  
  const [renderCounter, setRenderCounter] = useState([])
  const API_ENDPOINT = pageimEndPoint();
  const [menuList, setMenuList] = useState([]);
  const location = window.location.pathname;
  const [freeUserToken] = useState(null)

  let currentDir = window.localStorage.getItem('AppDirection');
  if (currentDir == null || (currentDir !== 'rtl' && currentDir !== 'ltr'))
    currentDir = 'ltr';




  useEffect(() => {
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
          headers: { Authorization: "Bearer " + localStorage['freeUserToken'] }
        }
        )
        .then(response => {
          // debugger 
          return response.json()})
        .then(data =>{
          // debugger
          //return  setMenuList(data)})
          return setMenuList(data.appsresult[0])})
          .catch((error) => {
            console.error('Error:', error);
          });
      }

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
            <RecoilRoot>
            <Route path="/TodoWatsApp" component={TodoWatsApp}/>
            </RecoilRoot>
              <PrimarySearchAppBar  setAppDirection={setAppDirection} AppDirection={AppDirection} setScreenType={setScreenType} screenType={screenType} />
              <Switch>
                {(menuList && menuList.length > 0 ) ? menuList.map((item, index) => (
                  item.mainApp==='pageim'
                  ?
                  <Route exact path={'/' + item.name}><Pageim app={'/' + item.name} appPermission={item.permission} screenType={screenType} key={index} /> </Route>
                  :
                  <Route exact path={'/' + item.name}><DynamicComponent html={item.html}/> </Route>
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
