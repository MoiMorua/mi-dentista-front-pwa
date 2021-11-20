import React from 'react';
import logo from './logo.svg';
import './App.scss';
import Navbar from './components/Navbar/Navbar';
import AppRouter from './router/AppRouter';
import Sidebar from './components/Sidebar/Sidebar';
import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">      
        <header className="App-header">
          <Route path='' component={Navbar}/>          
        </header>
        {/* <aside className="App-sidebar">
          <Route path='' component={Sidebar}/>          
        </aside> */}
        <div className="App-container">
          <AppRouter />
        </div>
      </div>
    </Router>
  );
}

export default App;
