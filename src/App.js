import React, { useState } from 'react';
import ConfigContextProvider from './context/ConfigContext';
import UploadFile from './components/UploadFile';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import PersistentDrawerLeft from './components/layouts/PersistentDrawerLeft';
import Pageim from './components/Pageim';
import './App.css';


function App() {


  let currentDir = window.localStorage.getItem('AppDirection');
  if (currentDir == null || (currentDir !== 'rtl' && currentDir !== 'ltr'))
    currentDir = 'ltr'
  const [AppDirection, setAppDirection] = useState(currentDir ? currentDir : 'ltr')

  return (
    <div className={AppDirection}>

      <Router>
        <PersistentDrawerLeft setAppDirection={setAppDirection} AppDirection={AppDirection} />
        <Route exact path='/UploadFile' component={UploadFile} />
        <ConfigContextProvider>
          <Route exact path='/Pageim' component={Pageim} />
        </ConfigContextProvider>
      </Router>
    </div>
  );
}

export default App;
