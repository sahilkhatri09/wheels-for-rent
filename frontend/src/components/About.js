import React from 'react'
import './About.css'
import logo from '../images/logo.png'
export default function About() {
    return (
        <>
            <section class="about-section">
                <div class="about-container">
                    <img class="about-image" src={logo} alt="About Us" />
                    <div class="about-content">
                        <h2 class="about-heading">Welcome to Wheels-for-Rent</h2>
                        <p class="about-text">Ride with Style, Freedom & Joy!</p>
                        <p class="about-text">We are a premier online platform for renting 2 wheelers and 4 wheelers for your daily travel needs. Explore the open roads with our well-maintained and stylish vehicles, and experience the thrill of the ride like never before.</p>
                        <p class="about-text">Our mission is to provide convenient, affordable, and reliable rental solutions, and make your travel experience memorable and hassle-free. Join us and let's embark on an exciting journey together!</p>
                    </div>
                </div>
            </section>
        </>
    )
}
