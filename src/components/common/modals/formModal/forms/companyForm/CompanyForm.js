import React, { useState, useContext, useEffect } from 'react'

import { Context as AuthContext } from '../../../../../../context/AuthContext'
import './companyForm.css'

const CompanyForm = () => {
  const [company, setCompany] = useState('')
  const [error, setError] = useState('')

  const {
    state: { loading, user },
    updateUsersInfo,
  } = useContext(AuthContext)

  useEffect(() => {
    if (user) {
      const { company } = user
      if (company) {
        setCompany(company)
      }
    }
  }, [user])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!company.trim()) {
      setError('Company name is required')
      return
    }
    updateUsersInfo({ company })
    setCompany('')
    setError('')
  }

  const renderForm = () => {
    return (
      <form onSubmit={handleSubmit} className="company-form">
        {loading ? (
          <div>Updating...</div>
        ) : (
          <>
            <div className="form-group">
              <label htmlFor="company">Company Name</label>
              <input
                type="text"
                id="company"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className={`form-input ${error ? 'error' : ''}`}
                placeholder="Enter company name"
              />
              {error && <span className="error-message">{error}</span>}
            </div>
            <button type="submit" className="submit-button">
              Submit
            </button>
          </>
        )}
      </form>
    )
  }

  return renderForm()
}

export default CompanyForm
