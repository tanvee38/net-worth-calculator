import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import NetworthCalculator from './components/netWorthCalculator';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Net Worth Calculator</h1>
        </header>
        <NetworthCalculator/>
      </div>
    );
  }
}

export default App;
