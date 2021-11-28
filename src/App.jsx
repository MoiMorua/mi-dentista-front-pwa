import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.scss';
import Navbar from './components/Navbar/Navbar';
import AppRouter from './router/AppRouter';
import Sidebar from './components/Sidebar/Sidebar';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider,useDispatch, useSelector } from 'react-redux';
import {useLocation} from 'react-router-dom';
import {store} from './store';

function App() {  
  

  return (
    <Provider store={store}>
      <Router>
        <div className="App">      
          <header className="App-header">
            <Route  path='' component={Navbar}/>          
          </header>          
          <div className="App-container">
            <AppRouter />
          </div>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
