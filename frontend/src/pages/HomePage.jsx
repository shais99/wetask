import React from 'react'
import { Link } from 'react-router-dom'

export default function HomePage() {
    return (
        <>
            <section className="home-container hero-container">
                <div className="hero-cta flex space-between align-center">
                    <div className="hero-content">
                        <div className="hero-txt">With wetask - You Can Start Working - With Confidence!</div>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam dolorem molestias qui? Voluptates provident ratione harum architecto saepe nisi eligendi.
                        </p>
                        <Link to="/boards/5ece0b6d695f8047ac641f74" className="hero-btn">Try now</Link>
                    </div>
                    <img src="assets/img/hero-img.svg" alt="" className="hero-img" />
                </div>
            </section>

            <section className="home-container second-container flex align-center">
                <img src="assets/img/home-second-img.svg" alt="" className="hero-img" />
                <div className="content ">
                    <div className="txt-title">Lorem ipsum dolor sit amet</div>
                    <p>
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Rem facilis exercitationem veniam laboriosam quidem optio unde beatae quia, sed repellat blanditiis aspernatur consectetur quos placeat magni ipsa dolorem architecto tempora! Debitis beatae blanditiis tempore nesciunt dignissimos eius, minima harum sed, adipisci nihil, placeat fuga quos perspiciatis totam qui incidunt. Consectetur!
                    </p>
                </div>
            </section>
        </>
    )
}
