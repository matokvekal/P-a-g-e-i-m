import React, { useState } from 'react';
import ConfigContextProvider from './context/ConfigContext';
import GlobalContextProvider from './context/GlobalContext';

import UploadFile from './components/UploadFile';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import PrimarySearchAppBar from './components/layouts/PrimarySearchAppBar';
import Pageim from './components/Pageim';
import './App.css';


function App() {

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
          <ConfigContextProvider>
            <PrimarySearchAppBar setAppDirection={setAppDirection} AppDirection={AppDirection} setScreenType={setScreenType} screenType={screenType} />

            <Route exact path='/UploadFile' component={UploadFile} />

            <Route exact path='/Pageim'><Pageim screenType={screenType} /> </Route>
          </ConfigContextProvider>
        </Router>
      </GlobalContextProvider>
    </div>
  );
}

export default App;
