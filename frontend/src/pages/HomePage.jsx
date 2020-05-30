import React from 'react'
import { Link } from 'react-router-dom'

export default function HomePage() {
    return (
        <>
            <section className="home-container hero-container flex align-center">
                <div className="hero-cta flex space-between align-center">
                    <div className="hero-content">
                        <div className="hero-txt">Work made easy</div>
                        <p>
                            Using cutting edge technologies and a great understanding of positive work principles, wework balances the best of both worlds for your team's success!
                        </p>
                        <Link to="/boards/5ecf72e3145b296860281f54" className="hero-btn">Try now</Link>
                    </div>
                    <img src="assets/img/hero-img.svg" alt="" className="hero-img" />
                </div>
            </section>

            <section className="home-container second-container flex align-center">
                <img src="assets/img/home-second-img.svg" alt="" className="hero-img" />
                <div className="content ">
                    <div className="txt-title">A work community like never before</div>
                    <p>
                        Getting a lot of great information upfront is great - but its what information you get that counts.
                        With features like our 'Time Estimation' system for better development financial tracking, you can feel safe your seeing it all - and with 20/20 vision.
                    </p>
                </div>
            </section>
        </>
    )
}
