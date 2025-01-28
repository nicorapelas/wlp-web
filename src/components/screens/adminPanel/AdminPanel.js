import React from 'react'
import { useNavigate } from 'react-router-dom'

import CardsOwing from './CardsOwing'
import '../dashboard/dashboard.css'

const AdminPanel = () => {
  const navigate = useNavigate()

  return (
    <div className="card-info">
      <CardsOwing />
      <div className="info-section">
        <h4>Admin Panel</h4>
        <div className="admin-panel-container">
          <div
            className="admin-card"
            onClick={() => navigate('/payment-history')}
          >
            <h3>Payment History</h3>
            <p>View and manage all payment transactions</p>
          </div>
          <div className="admin-card" onClick={() => navigate('/cards-admin')}>
            <h3>Cards Admin</h3>
            <p>Manage card inventory and settings</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminPanel
