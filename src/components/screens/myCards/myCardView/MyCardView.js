import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaCopy, FaShareAlt } from 'react-icons/fa'

import { Context as CardsContext } from '../../../../context/CardsContext'
import '../../cardsJustPaid/cardsJustPaid.css'

const MyCardView = () => {
  const navigate = useNavigate()

  const {
    state: { myCardToView },
    setMyCardToView,
  } = useContext(CardsContext)

  const handleBackToDashboard = () => {
    navigate('/my-cards')
    setMyCardToView(null)
  }

  const handleCopyCard = async (card) => {
    const textToCopy = `Card Number: ${card.cardNumber}\nPassword: ${card.password}`
    try {
      await navigator.clipboard.writeText(textToCopy)
      alert('Card details copied to clipboard!')
    } catch (err) {
      console.error('Failed to copy:', err)
      alert('Failed to copy card details. Please try again.')
    }
  }

  const handleShareCard = async (card) => {
    const shareText = `Card Number: ${card.cardNumber}\nPassword: ${card.password}`
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${card.product} Card Details`,
          text: shareText,
        })
      } catch (error) {
        if (error.name !== 'AbortError') {
          console.error('Error sharing:', error)
          // Fallback for when sharing fails
          alert('Unable to share. You can copy the details instead.')
        }
      }
    } else {
      // Fallback for browsers that don't support Web Share API
      alert(
        'Sharing is not supported on this browser. You can copy the details instead.',
      )
    }
  }

  if (!myCardToView) return null
  const { product, cardNo, password, batchId, purchasedAt } = myCardToView
  return (
    <div className="cards-paid-container">
      <div className="cards-paid-actions">
        <button className="nav-button" onClick={handleBackToDashboard}>
          Back
        </button>
      </div>
      <div className="cards-paid-header">
        <h2>Card Details</h2>
      </div>
      <div className="card-section">
        <div className="card-main-info">
          <div className="product-info">
            <span className="label">Product:</span>
            <span className="value">{product}</span>
          </div>
          <div className="card-number-info">
            <span className="label">Card Number:</span>
            <span className="value font-mono">{cardNo}</span>
          </div>
          <div className="password-info">
            <span className="label">Password:</span>
            <span className="value font-mono">{password}</span>
          </div>
          <div className="batch-info">
            <span className="label">Batch ID:</span>
            <span className="value font-mono">{batchId}</span>
          </div>
          <div className="purchase-info">
            <span className="label">Purchased At:</span>
            <span className="value">{purchasedAt}</span>
          </div>
        </div>
        <div className="card-actions">
          <button
            className="action-button"
            onClick={() => handleCopyCard(myCardToView)}
          >
            <FaCopy className="button-icon" /> Copy
          </button>
          <button
            className="action-button"
            onClick={() => handleShareCard(myCardToView)}
          >
            <FaShareAlt className="button-icon" /> Share
          </button>
        </div>
      </div>
    </div>
  )
}

export default MyCardView
