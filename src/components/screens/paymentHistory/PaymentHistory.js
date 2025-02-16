import React, { useContext, useEffect } from 'react'
import { format } from 'date-fns'
import { useNavigate } from 'react-router-dom'

import NetworkChecker from '../../common/NetworkChecker'
import Loader from '../../common/loaders/fullScreenLoader/LoaderFullScreen'
import { Context as YocoContext } from '../../../context/YocoContext'
import UserOfPayment from './UserOfPayment'
import '../dashboard/dashboard.css'

const PaymentHistory = () => {
  const navigate = useNavigate()

  const {
    state: { allPaymentHistory, loading, userOfPaymentProps },
    fetchAllPaymentHistory,
    setUserOfPaymentProps,
  } = useContext(YocoContext)

  useEffect(() => {
    fetchAllPaymentHistory()
  }, [])

  if (loading) {
    return <Loader />
  }

  if (userOfPaymentProps) {
    return <UserOfPayment />
  }

  const handleBackButtonPress = () => {
    navigate('/admin-panel')
  }

  const handleShowUser = (userId) => {
    setUserOfPaymentProps(userId)
  }

  const calculateTotalPayments = () => {
    if (!Array.isArray(allPaymentHistory)) return '0.00'
    return allPaymentHistory
      .reduce((total, payment) => {
        if (payment.status === 'succeeded') {
          return total + payment.amount / 100
        }
        return total
      }, 0)
      .toFixed(2)
  }

  if (
    !allPaymentHistory ||
    !Array.isArray(allPaymentHistory) ||
    allPaymentHistory.length === 0
  ) {
    return (
      <div className="card-info">
        <button className="nav-button" onClick={handleBackButtonPress}>
          Back
        </button>
        <div className="info-section">
          <h4>Payment History</h4>
          <p style={{ color: '#ffff' }}>No payment history available.</p>
        </div>
      </div>
    )
  }

  return (
    <>
      <NetworkChecker />
      <div className="card-info">
        <button className="nav-button" onClick={handleBackButtonPress}>
          Back
        </button>
        <div className="info-section">
          <h4>Payment History</h4>
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Product</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(allPaymentHistory) &&
                  allPaymentHistory.map((payment) => (
                    <tr key={payment._id}>
                      <td className="font-mono text-sm">{payment.orderId}</td>
                      <td>{payment.productCode}</td>
                      <td className="text-sm">
                        {payment.currency} {(payment.amount / 100).toFixed(2)}
                      </td>
                      <td className="text-sm">
                        <span
                          className={`status-${payment.status.toLowerCase()}`}
                        >
                          {payment.status}
                        </span>
                      </td>
                      <td className="text-sm">
                        {format(
                          new Date(payment.createdAt),
                          'MMM dd, yyyy HH:mm',
                        )}
                      </td>
                      <td>
                        <button
                          className="show-user-btn"
                          onClick={() => handleShowUser(payment._user)}
                        >
                          Show User
                        </button>
                      </td>
                    </tr>
                  ))}
                <tr className="total-row">
                  <td colSpan="2" className="text-right">
                    <strong>Total Successful Payments:</strong>
                  </td>
                  <td className="text-sm">
                    <strong>
                      {(Array.isArray(allPaymentHistory) &&
                        allPaymentHistory[0]?.currency) ||
                        'ZAR'}{' '}
                      {calculateTotalPayments()}
                    </strong>
                  </td>
                  <td colSpan="3"></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  )
}

export default PaymentHistory
