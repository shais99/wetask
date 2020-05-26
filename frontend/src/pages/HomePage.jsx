import React from 'react'
import { Link } from 'react-router-dom'

export default function HomePage() {
    return (
        <>
            <section className="home-container hero-container">
                <div className="hero-cta flex space-between align-center">
                    <div className="hero-content">
                        <div className="hero-txt">This is very good website for tasks, we are the best!</div>
                        <Link to="/boards/EXAMPLE_BOARD_ID" className="hero-btn">Try wetask now</Link>
                    </div>
                    <img src="assets/img/hero-img.svg" alt="" className="hero-img" />
                </div>
            </section>
        </>
    )
}
