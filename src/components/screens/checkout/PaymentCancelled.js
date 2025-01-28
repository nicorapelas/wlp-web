import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import './paymentResult.css'

const PaymentCancelled = () => {
  const navigate = useNavigate()
  const [countdown, setCountdown] = useState(5)
  const [cancelReason, setCancelReason] = useState('')

  // Log component mount and get cancellation reason
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const reason = params.get('reason')
    setCancelReason(reason)
  }, [])

  // Handle countdown in separate effect
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  // Handle navigation in separate effect
  useEffect(() => {
    if (countdown <= 0) {
      navigate('/dashboard')
    }
  }, [countdown, navigate])

  const getCancelMessage = () => {
    switch (cancelReason) {
      case 'user_back':
        return "Payment was cancelled using the browser's back button."
      case 'browser_back':
        return 'Payment was cancelled using the back button.'
      default:
        return 'Payment was cancelled.'
    }
  }

  return (
    <div className="payment-result-container">
      <div className="payment-result-content">
        <h2>Payment Cancelled</h2>
        <p>{getCancelMessage()}</p>
        <p>Redirecting in {countdown} seconds...</p>
      </div>
    </div>
  )
}

export default PaymentCancelled
