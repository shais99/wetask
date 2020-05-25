import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import './style/global.scss';
import HomePage from './pages/HomePage'
import LoginSignup from './pages/LoginSignup'
import Boards from './pages/Boards'
import BoardDetails from './pages/BoardDetails'
import UserProfile from './pages/UserProfile'
import NavBar from './cmps/NavBar'
import { signup } from './store/actions/userActions';
import { connect } from 'react-redux'
import { makeId, getRandomColor } from './services/utilService'


class App extends Component {

  componentDidMount() {
    if (this.props.loggedInUser) return;
    this.guestSignup()
  }

  guestSignup() {
    const userCred = {
      username: `Guest-${makeId(4)}`,
      password: '123456',
      fullname: `Guesty McGuest-${makeId(4)}`,
      imgUrl: 'https://res.cloudinary.com/shaishar9/image/upload/v1590398852/tgfntq8ghkaxjpo9seqa.jpg',
      isGuest: true,
      bgColor: getRandomColor()
    }
    this.props.signup(userCred)
  }

  render() {
    return (
      <div className="app">
        <Route component={NavBar} path="/" />
        <main className="main-content top-p">
          <Switch>
            <Route component={UserProfile} path="/user/:userId" />
            <Route component={BoardDetails} path="/boards/:boardId" />
            <Route component={Boards} path="/boards" />
            <Route component={UserProfile} path="/profile" />
            <Route component={LoginSignup} path="/login" />
            <Route component={LoginSignup} path="/signup" />
            <Route component={HomePage} path="/" />
          </Switch>
        </main>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loggedInUser: state.user.loggedInUser
  };
};
const mapDispatchToProps = {
  signup
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
