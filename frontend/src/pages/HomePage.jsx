import React from 'react'
import { Link } from 'react-router-dom'

export default function HomePage() {
    return (
        <>
            <section className="home-container hero-container">
                <div className="hero-cta flex space-between align-center">
                    <div className="hero-content">
                        <div className="hero-txt">With wetask - You Can Start Working - With Confidence!</div>
                        <Link to="/boards/5ece0b6d695f8047ac641f74" className="hero-btn">Try now</Link>
                    </div>
                    <img src="assets/img/hero-img.svg" alt="" className="hero-img" />
                </div>
            </section>
        </>
    )
}
