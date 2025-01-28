import React from 'react'

import logo from '../../../assets/images/logo/logo-home.png'
import background from '../../../assets/images/background/a-1.png'
import './home.css'

const Home = () => {
  return (
    <div className="home-container">
      <header className="home-header">
        <div className="logo-container">
          <img src={logo} alt="logo" />
        </div>
        {/* <div className="nav-buttons">
          <button className="nav-btn">Button 1</button>
          <button className="nav-btn">Button 2</button>
          <button className="nav-btn">Button 3</button>
        </div> */}
      </header>

      <main className="main-content">
        <div className="text-overlay">
          <h1>Welcome to Watchlist Pro</h1>
          <div className="content-wrapper">
            <p className="main-description">
              Watchlist Pro is a powerful, user-friendly, and versatile
              application designed for individuals and professionals who need to
              efficiently manage and track their interests across various
              domains. Whether you're a movie enthusiast, a stock market
              investor, a gamer, or a professional monitoring trends, Watchlist
              Pro provides a centralized platform to organize, monitor, and act
              on your watchlists with ease.
            </p>

            <div className="features-section">
              <h2>Key Features:</h2>
              <ul>
                <li>
                  <strong>Customizable Watchlists</strong>
                  <p>
                    Create multiple watchlists tailored to different categories
                    with a sleek, intuitive interface.
                  </p>
                </li>
                <li>
                  <strong>Real-Time Updates</strong>
                  <p>Receive real-time updates for items in your watchlist.</p>
                </li>
                <li>
                  <strong>Smart Recommendations</strong>
                  <p>
                    AI-powered algorithms analyze your watchlist to suggest
                    similar items.
                  </p>
                </li>
                <li>
                  <strong>Cross-Platform Synchronization</strong>
                  <p>
                    Seamlessly access your watchlists across multiple devices.
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <img src={background} alt="Main background" className="main-image" />
      </main>
    </div>
  )
}

export default Home
