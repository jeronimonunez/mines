import React from "react";
import logo from './images/logo.svg';
import Matrix from './components/Matrix';
import Toolbar from './components/Toolbar';
import './styling/App.css';

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        Mines
      </header>
      <main className="App-main">
        <Matrix />
        <Toolbar />
      </main>
    </div>
  );
}

export default App;
