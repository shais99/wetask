import React from 'react'
import { Link } from 'react-router-dom'

export default function NavBar() {
    return (
        <header className="main-header">
            <Link to="/"><h1 className="logo">Taski</h1></Link>
        </header>
    )
}
