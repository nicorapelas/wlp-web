import React, { useContext, useEffect } from 'react'
import { format } from 'date-fns'
import { Context as YocoContext } from '../../../context/YocoContext'
import './userOfPayment.css'

const UserOfPayment = () => {
  const {
    state: { userOfPayment, userOfPaymentProps },
    fetchUserOfPayment,
    setUserOfPaymentProps,
  } = useContext(YocoContext)

  useEffect(() => {
    if (userOfPaymentProps) {
      fetchUserOfPayment(userOfPaymentProps)
    }
  }, [userOfPaymentProps])

  if (!userOfPayment) return null

  return (
    <div className="user-of-payment-container">
      <div className="user-of-payment-card">
        <div className="user-of-payment-header">
          <h3>User Details</h3>
          <button
            className="nav-button"
            onClick={() => setUserOfPaymentProps(null)}
          >
            Close
          </button>
        </div>
        <div className="user-details">
          <p>
            <span className="label">Username:</span>
            <span className="value font-mono">{userOfPayment.username}</span>
          </p>
          <p>
            <span className="label">Email:</span>
            <span className="value font-mono">{userOfPayment.email}</span>
          </p>
          <p>
            <span className="label">Email Status:</span>
            <span
              className={`status-badge ${userOfPayment.emailVerified ? 'verified' : 'unverified'}`}
            >
              {userOfPayment.emailVerified ? 'Verified' : 'Unverified'}
            </span>
          </p>
          <p>
            <span className="label">Created:</span>
            <span className="value">
              {format(new Date(userOfPayment.created), 'MMM dd, yyyy HH:mm')}
            </span>
          </p>
          <p>
            <span className="label">ID:</span>
            <span className="value font-mono">{userOfPayment._id}</span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default UserOfPayment
