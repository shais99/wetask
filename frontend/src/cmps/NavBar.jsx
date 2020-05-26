import React, { Component } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { logout, signup } from '../store/actions/userActions';
import { getRandomColor, makeId } from '../services/utilService'


class NavBar extends Component {

    state = {
        isScroll: false
    }

    componentDidMount() {
        this.scrollEvent()
    }

    componentWillUnmount() {
        window.document.removeEventListener('scroll', this.handleScroll)
    }

    scrollEvent() {
        window.document.addEventListener('scroll', this.handleScroll)
    }

    get isHomepage() {
        return this.props.location.pathname === '/'
    }

    handleScroll = () => {
        let body = document.body
        let theDocument;
        theDocument = document.documentElement
        theDocument = (theDocument.clientHeight) ? theDocument : body;

        if (theDocument.scrollTop === 0) this.setState({ isScroll: false })
        else this.setState({ isScroll: true })
    }

    onLogout = async () => {
        await this.props.logout()

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
        const user = this.props.loggedInUser

        return (
            <div className={`nav-container ${(this.state.isScroll || !this.isHomepage) ? 'scrolled' : ''}`} style={(this.isHomepage) ? {marginTop: '10px'} : {}}>
                <div className={`${(this.isHomepage) ? 'container' : ''}`}>
                    <div className="nav-content flex space-between align-center">
                        <Link to="/"><h1 className="logo"><span className="logo-we">we</span>task</h1></Link>
                        <ul className="main-nav clean-list flex">
                            <li><NavLink exact to="/">Home</NavLink></li>
                            {user && <li><NavLink to="/boards">Boards</NavLink></li>}
                            {user && <li><NavLink to="/profile">Profile</NavLink></li>}
                            {user?.isGuest && <li><NavLink to="/signup">Signup</NavLink></li>}
                            {user?.isGuest && <li><NavLink to="/login">Login</NavLink></li>}
                            {!user?.isGuest && <li><Link to="/" onClick={this.onLogout}>Logout</Link></li>}
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        loggedInUser: state.user.loggedInUser
    };
};
const mapDispatchToProps = {
    logout,
    signup
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);