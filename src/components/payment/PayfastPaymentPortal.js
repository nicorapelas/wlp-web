import React, { useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { Context as PayfastContext } from '../../context/PayfastContext'
import { Context as CardsContext } from '../../context/CardsContext'
import './payfastPaymentPortal.css'

const PayfastPaymentPortal = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [formRef] = useState(React.createRef())

  const {
    state: { confirmPurchase, paymentTriggered },
    initiatePayment,
    setConfirmPurchase,
    setPaymentTriggered,
  } = useContext(PayfastContext)

  const {
    state: { cardToBuy },
    setCardToBuy,
  } = useContext(CardsContext)

  const navigate = useNavigate()

  useEffect(() => {
    if (!loading) {
      let timer = setTimeout(() => {
        navigate('/dashboard')
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [loading])

  useEffect(() => {
    if (confirmPurchase && cardToBuy) {
      setPaymentTriggered(true)
    }
  }, [confirmPurchase, cardToBuy])

  useEffect(() => {
    if (paymentTriggered) {
      handleConfirmedPurchase()
    }
  }, [paymentTriggered])

  const handleConfirmedPurchase = async () => {
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
    try {
      setLoading(true)
      setError(null)

      const response = await initiatePayment({
        amountInCents: price,
        currency: 'ZAR',
        productCode: productCode,
        description: `Purchase of ${productCode}`,
      })
      if (response?.paymentData && response?.redirectUrl) {
        const form = formRef.current
        if (!form) {
          console.error('Form reference is null!')
          return
        }

        form.innerHTML = ''
        form.method = 'POST'
        form.enctype = 'application/x-www-form-urlencoded'

        // Add all payment data fields
        Object.entries(response.paymentData).forEach(([key, value]) => {
          const input = document.createElement('input')
          input.type = 'hidden'
          input.name = key
          input.value = String(value)
          form.appendChild(input)
        })

        form.action = response.redirectUrl

        form.submit()
      } else {
        console.error('Invalid response:', response)
        setError('Invalid payment data received')
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

      {/* Hidden form for Payfast submission */}
      <form ref={formRef} method="POST" style={{ display: 'none' }} />
    </div>
  )
}

export default PayfastPaymentPortal
