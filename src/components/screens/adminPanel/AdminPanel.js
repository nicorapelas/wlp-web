import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import { Context as AuthContext } from '../../../context/AuthContext'
import NetworkChecker from '../../common/NetworkChecker'
import CardsOwing from './CardsOwing'
import '../dashboard/dashboard.css'

const AdminPanel = () => {
  const { signout } = useContext(AuthContext)

  const navigate = useNavigate()

  const handleSignout = () => {
    navigate('/login')
    signout()
  }

  return (
    <>
      <NetworkChecker />
      <div className="card-info">
        <CardsOwing />
        <div className="info-section">
          <div className="admin-panel-header">
            <h4>Admin Panel</h4>
            <button className="signout-button" onClick={handleSignout}>
              Sign Out
            </button>
          </div>
          <div className="admin-panel-container">
            <div
              className="admin-card"
              onClick={() => navigate('/payment-history')}
            >
              <h3>Payment History</h3>
              <p>View and manage all payment transactions</p>
            </div>
            <div
              className="admin-card"
              onClick={() => navigate('/cards-admin')}
            >
              <h3>Cards Admin</h3>
              <p>Manage card inventory and settings</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AdminPanel
