import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { Context as AuthContext } from '../../../context/AuthContext'
import { Context as CardsContext } from '../../../context/CardsContext'
import './networkError.css'

const NetworkError = () => {
  const [showMessage, setShowMessage] = useState(false)

  const navigate = useNavigate()

  const {
    state: { networkError: authNetworkError },
    signout,
  } = useContext(AuthContext)

  const {
    state: { networkError: cardsNetworkError },
  } = useContext(CardsContext)

  useEffect(() => {
    if (authNetworkError || cardsNetworkError) {
      setShowMessage(true)
      let run = setTimeout(() => {
        navigate('/login')
        signout()
      }, 7000)
      return () => clearTimeout(run)
    }
  }, [authNetworkError, cardsNetworkError])

  const renderContent = () => {
    if (!showMessage) return null
    return (
      <div className="network-error-container">
        <div className="network-error-content">
          <div className="network-error-icon">⚠️</div>
          <h1>Network Error</h1>
          <p>
            Unable to connect to the server. Please check your connection and
            try again.
          </p>
        </div>
      </div>
    )
  }

  return renderContent()
}

export default NetworkError
