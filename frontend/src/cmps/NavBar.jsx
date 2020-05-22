import React from 'react'
import { Link,NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { logout } from '../store/actions/userActions';

function NavBar(props) {
    const user = props.loggedInUser
    function onLogout() {
        props.logout()
    }
    return (
        <div className="nav-container">
            <div className="container flex space-between align-center">
                <Link to="/"><h1 className="logo"><span className="logo-we">we</span>task</h1></Link>
                <ul className="main-nav clean-list flex">
                    <li><NavLink exact to="/">Home</NavLink></li>
                    {user && <li><NavLink to="/boards">Boards</NavLink></li>}
                    {user && <li><NavLink to="/profile">Profile</NavLink></li>}
                    {user && <li><Link to="/" onClick={onLogout}>Logout</Link></li>}
                    {!user && <li><NavLink to="/login">Login</NavLink></li>}
                    {!user && <li><NavLink to="/signup">Signup</NavLink></li>}
                </ul>
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        loggedInUser: state.user.loggedInUser
    };
};
const mapDispatchToProps = {
    logout
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);