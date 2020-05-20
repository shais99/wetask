import React from 'react'
import { Link } from 'react-router-dom'

export default function NavBar() {
    return (
        <div className="nav-container">
            <Link to="/"><h1 className="logo"><span className="logo-we">we</span>task</h1></Link>
        </div>
    )
}
