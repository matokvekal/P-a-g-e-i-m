import React, { useState } from 'react';
import ConfigContextProvider from './context/ConfigContext';
import GlobalContextProvider from './context/GlobalContext';
import UploadFile from './components/UploadFile';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PrimarySearchAppBar from './components/layouts/PrimarySearchAppBar';
import Pageim from './components/Pageim';
import './App.css';
import Templates from './components/main/Templates';


function App() {
  const location = window.location.pathname;

  let currentDir = window.localStorage.getItem('AppDirection');
  if (currentDir == null || (currentDir !== 'rtl' && currentDir !== 'ltr'))
    currentDir = 'ltr'

  let screenView = 'table';
  const [AppDirection, setAppDirection] = useState(currentDir ? currentDir : 'ltr')
  const [screenType, setScreenType] = useState(screenView ? screenView : 'table')

  return (
    <div className={AppDirection}>
      <GlobalContextProvider>
        <Router>

          <Switch>
            <Route exact path="/" component={Templates} />
            <Route path="/Templates" component={Templates} />
          </Switch>
          <ConfigContextProvider>
            <PrimarySearchAppBar setAppDirection={setAppDirection} AppDirection={AppDirection} setScreenType={setScreenType} screenType={screenType} />
            <Route exact path='/UploadFile' component={UploadFile} />
            <Route exact path={location}><Pageim app={location} screenType={screenType} /> </Route>       
          </ConfigContextProvider>
        </Router>
      </GlobalContextProvider>
    </div>
  );
}

export default App;
