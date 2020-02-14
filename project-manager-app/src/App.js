import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, Link }  from 'react-router-dom';
import SettingsIcon from '@material-ui/icons/Settings';

import Projects from './components/Projects'
import Actions from './components/Actions'




function App() {
  return (
    <div className="App">
      <header className="App-header">

        <SettingsIcon className="App-logo"  />
        <h1>Project Manager</h1>
        <Link to='/' >Home</Link>
        <Link to='/projects' >Project</Link>
        <Link to='/actions' >Actions</Link>


        <Route path='/projects' component={Projects}/>
        <Route path='/actions' component={Actions}/>
      </header>
    </div>
  );
}

export default App;
