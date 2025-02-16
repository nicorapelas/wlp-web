import React, { useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { Context as YocoContext } from '../../context/YocoContext'
import { Context as CardsContext } from '../../context/CardsContext'
import './yocoPaymentProtal.css'

const YocoPaymentPortal = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const {
    state: { confirmPurchase, paymentTriggered },
    initiatePayment,
    setConfirmPurchase,
    setPaymentTriggered,
  } = useContext(YocoContext)

  const {
    state: { cardToBuy },
    setCardToBuy,
  } = useContext(CardsContext)

  useEffect(() => {
    if (!loading) {
      let timer = setTimeout(() => {
        navigate('/dashboard')
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [loading])

  useEffect(() => {
    console.log(`cardToBuy:`, cardToBuy)
    if (confirmPurchase && cardToBuy) {
      console.log(`let's go`)
      setPaymentTriggered(true)
    }
  }, [confirmPurchase, cardToBuy])

  useEffect(() => {
    if (paymentTriggered) {
      handleConfirmedPurchase()
    }
  }, [paymentTriggered])

  const navigate = useNavigate()

  const handleConfirmedPurchase = async () => {
    console.log(`at handleConfirmedPurchase`)

    setPaymentTriggered(false)
    const { productCode, price } = cardToBuy
    try {
      await handlePayment(productCode, price)
    } finally {
      setCardToBuy(null)
      setConfirmPurchase(false)
    }
  }

  const handlePayment = async (productCode, price) => {
    console.log(`im running...!`)
    try {
      setLoading(true)
      setError(null)

      const startTime = Date.now()
      localStorage.setItem('paymentStartTime', startTime)
      localStorage.setItem('paymentInProgress', 'true')

      const response = await initiatePayment({
        amountInCents: price,
        currency: 'ZAR',
        productCode: productCode,
      })

      if (response?.redirectUrl) {
        window.location.href = response.redirectUrl
      } else {
        setError('No redirect URL available')
        setLoading(false)
      }
    } catch (error) {
      console.error('Payment error:', error)
      setError(error.message || 'Failed to initialize payment')
      setLoading(false)
    }
  }

  return (
    <div className="payment-container">
      <h2>Make Payment</h2>
      {error && <div className="error-message">{error}</div>}
      <div className="payment-status">{loading ? 'Processing...' : ''}</div>
    </div>
  )
}

export default YocoPaymentPortal
