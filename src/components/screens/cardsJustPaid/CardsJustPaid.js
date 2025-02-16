import React, { useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaCopy, FaShareAlt } from 'react-icons/fa'

import { Context as CardsContext } from '../../../context/CardsContext'
import LoaderFullScreen from '../../common/loaders/fullScreenLoader/LoaderFullScreen'
import './cardsJustPaid.css'

const CardsJustPaid = () => {
  const navigate = useNavigate()

  const [cardsJustPaid, setCardsJustPaid] = useState([])

  const {
    state: { loading, userCards },
    fetchUsersCards,
  } = useContext(CardsContext)

  useEffect(() => {
    fetchUsersCards()
  }, [])

  useEffect(() => {
    if (userCards.length > 0) {
      // Get the most recent purchase date
      const mostRecentDate = userCards.reduce((latest, card) => {
        return latest > card.purchasedAt ? latest : card.purchasedAt
      }, '')

      // Filter cards to only show the most recent purchase(s)
      const recentCards = userCards
        .filter((card) => card.purchasedAt === mostRecentDate)
        .map((card) => ({
          product: card.product,
          cardNumber: card.cardNo,
          password: card.password,
          batchId: card.batchId,
          purchasedAt: new Date(card.purchasedAt).toLocaleString(),
        }))

      setCardsJustPaid(recentCards)
    }
  }, [userCards])

  const handleBackToDashboard = () => {
    navigate('/dashboard')
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

  if (loading) {
    return <LoaderFullScreen />
  }

  return (
    <div className="cards-paid-container">
      <div className="cards-paid-actions">
        <button className="nav-button" onClick={handleBackToDashboard}>
          Back to Dashboard
        </button>
      </div>

      <div className="cards-paid-header">
        <h2>Payment Successful!</h2>
        <p>Here are your newly purchased cards:</p>
      </div>

      {cardsJustPaid.map((card, index) => (
        <div key={index} className="card-section">
          <div className="card-main-info">
            <div className="product-info">
              <span className="label">Product:</span>
              <span className="value">{card.product}</span>
            </div>
            <div className="card-number-info">
              <span className="label">Card Number:</span>
              <span className="value font-mono">{card.cardNumber}</span>
            </div>
            <div className="password-info">
              <span className="label">Password:</span>
              <span className="value font-mono">{card.password}</span>
            </div>
            <div className="batch-info">
              <span className="label">Batch ID:</span>
              <span className="value font-mono">{card.batchId}</span>
            </div>
            <div className="purchase-info">
              <span className="label">Purchased At:</span>
              <span className="value">{card.purchasedAt}</span>
            </div>
          </div>
          <div className="card-actions">
            <button
              className="action-button"
              onClick={() => handleCopyCard(card)}
            >
              <FaCopy className="button-icon" /> Copy
            </button>
            <button
              className="action-button"
              onClick={() => handleShareCard(card)}
            >
              <FaShareAlt className="button-icon" /> Share
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default CardsJustPaid
