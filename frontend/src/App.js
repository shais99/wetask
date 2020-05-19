import React from 'react';
import { Switch, Route } from 'react-router-dom'
import './style/global.scss';
// import HomePage from './pages/HomePage'
import NavBar from './cmps/NavBar'


function App() {
  return (
    <div className="app">
      <NavBar />
      <main>
        {/* <Switch>
          <Route component={HomePage} path="/" />
        </Switch> */}
      </main>
    </div>
  );
}

export default App;