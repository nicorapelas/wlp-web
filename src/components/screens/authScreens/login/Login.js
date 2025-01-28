import React, { useState, useContext } from 'react'

import logo from '../../../../assets/images/logo/logo-512.png'
import LoaderFullScreen from '../../../common/loaders/fullScreenLoader/LoaderFullScreen'
import AuthError from '../authApiFeedback/authError/AuthError'
import AuthSuccess from '../authApiFeedback/authSuccess/AuthSuccess'
import { Context as AuthContext } from '../../../../context/AuthContext'
import './login.css'

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const {
    state: { loading, apiMessage, errorMessage },
    login,
    clearErrorMessage,
    clearApiMessage,
  } = useContext(AuthContext)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleOnFocus = () => {
    clearErrorMessage()
    clearApiMessage()
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    login(formData)
  }

  const renderForm = () => {
    return (
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Username</label>
          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            onFocus={handleOnFocus}
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            onFocus={handleOnFocus}
          />
        </div>
        <button type="submit" className="signup-button">
          Login
        </button>
      </form>
    )
  }

  const headerSelector = () => {
    if (apiMessage) {
      return <AuthSuccess />
    }
    if (errorMessage) {
      return <AuthError error={errorMessage} />
    }
    return <div className="auth-title">Hello installer</div>
  }

  const renderContent = () => {
    if (loading) {
      return <LoaderFullScreen />
    }
    return (
      <div className="signup-container">
        <img src={logo} alt="logo" className="auth-logo" />
        {headerSelector()}
        {renderForm()}
      </div>
    )
  }

  return renderContent()
}

export default Login
