import React from 'react';
import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import AppRouter from './router/AppRouter';

function App() {
  return (
    <div className="App">      
      <Navbar />
      <div className="App-container">        
        <AppRouter />
      </div>
    </div>
  );
}

export default App;
