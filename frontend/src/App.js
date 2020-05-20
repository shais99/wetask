import React from 'react';
import { Switch, Route } from 'react-router-dom'
import './style/global.scss';
import HomePage from './pages/HomePage'
import LoginSignup from './pages/LoginSignup'
import Boards from './pages/Boards'
import BoardDetails from './pages/BoardDetails'
import UserProfile from './pages/UserProfile'
import CardDetails from './pages/CardDetails'
import NavBar from './cmps/NavBar'


function App() {
  return (
    <div className="app">
      <NavBar />
      <main>
        <Switch>
          <Route component={UserProfile} path="/user/:userId" />
          <Route component={CardDetails} path="/boards/:boardId/card/:cardId" />
          <Route component={BoardDetails} path="/boards/:boardId" />
          <Route component={Boards} path="/boards" />
          <Route component={LoginSignup} path="/signup" />
          <Route component={HomePage} path="/" />
        </Switch>
      </main>
    </div>
  );
}

export default App;