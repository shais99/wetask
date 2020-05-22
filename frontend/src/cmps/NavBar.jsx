import React from 'react'
import { Link } from 'react-router-dom'
import { ReactComponent as Logo } from '../logo.svg';

export default function NavBar() {
    return (
        <div className="nav-container">
            <Link to="/"> <img className="logo" src={require('../logo.svg')} alt=""/> </Link>
            {/* <Link to="/"> <Logo className="logo"/> </Link> */}
            {/* <Link to="/"><h1 className="logo"><span className="logo-we">we</span>task</h1></Link> */}
        </div>
    )
}
