import React, { useState, useContext, useEffect } from 'react'
import { IoIosCloseCircle } from 'react-icons/io'

import { Context as AuthContext } from '../../../../../context/AuthContext'
import './authError.css'

const AuthError = ({ error }) => {
  const [errorMessage, setErrorMessage] = useState('')

  const { clearErrorMessage } = useContext(AuthContext)

  useEffect(() => {
    if (error) {
      const { email, password, notVerified } = error
      setErrorMessage(email || password || notVerified)
    }
  }, [error])

  const renderContent = () => {
    return (
      <div className="auth-error-container" onClick={clearErrorMessage}>
        <div className="auth-error-content">{errorMessage}</div>
        <IoIosCloseCircle className="auth-error-icon" />
      </div>
    )
  }

  return renderContent()
}

export default AuthError
