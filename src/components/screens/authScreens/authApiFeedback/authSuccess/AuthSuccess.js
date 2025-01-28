import React, { useState, useContext, useEffect } from 'react'
import { IoIosCloseCircle } from 'react-icons/io'

import { Context as AuthContext } from '../../../../../context/AuthContext'
import './authSuccess.css'

const AuthSuccess = () => {
  const [successMessage, setSuccessMessage] = useState('')

  const {
    state: { apiMessage },
    clearApiMessage,
  } = useContext(AuthContext)

  useEffect(() => {
    if (apiMessage) {
      const { success } = apiMessage
      setSuccessMessage(success)
    }
  }, [apiMessage])

  const renderContent = () => {
    return (
      <div className="auth-success-container" onClick={clearApiMessage}>
        <div className="auth-success-content">{successMessage}</div>
        <IoIosCloseCircle className="auth-success-icon" />
      </div>
    )
  }

  return renderContent()
}

export default AuthSuccess
