import React from 'react';
import ConfigContextProvider from './context/ConfigContext';
import UploadFile from './components/UploadFile';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import PersistentDrawerLeft from './components/layouts/PersistentDrawerLeft';
import Pageim from './components/Pageim';


function App() {
  return (
    <div className="App">
   
    <Router>
    <PersistentDrawerLeft />
      <Route exact path='/UploadFile' component={UploadFile} />
      <ConfigContextProvider>
      <Route exact path='/Pageim' component={Pageim} />
      </ConfigContextProvider>
      </Router>
    </div>
  );
}

export default App;
