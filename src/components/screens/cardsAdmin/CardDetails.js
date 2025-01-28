import React, { useContext, useEffect } from 'react'

import CardOwner from './cardOwner/CardOwner'
import PurchaseHistory from './purchaseHistory/PurchaseHistory'
import { Context as CardsContext } from '../../../context/CardsContext'
import { Context as YocoContext } from '../../../context/YocoContext'
import './cardsAdmin.css'

const CardDetails = ({ card, onBack }) => {
  const {
    state: { cardOwner },
    fetchCardOwner,
  } = useContext(CardsContext)

  const {
    state: { paymentHistory },
    fetchPaymentHistory,
  } = useContext(YocoContext)

  console.log(paymentHistory)

  useEffect(() => {
    if (card.purchasedBy) {
      fetchCardOwner(card.purchasedBy)
    }
  }, [card])

  useEffect(() => {
    if (cardOwner) {
      fetchPaymentHistory(cardOwner._id)
    }
  }, [cardOwner])

  if (!card) return null

  const formatDate = (date) => {
    return date ? new Date(date).toLocaleString() : '-'
  }

  return (
    <div className="card-details">
      <div className="card-details-header">
        <h3>Card Details</h3>
        <button className="btn btn-secondary" onClick={onBack}>
          Back to List
        </button>
      </div>

      <div className="card-info">
        <div className="info-section">
          <h4>Basic Information</h4>
          <div className="info-row">
            <label>Batch ID:</label>
            <span>{card.batchId}</span>
          </div>
          <div className="info-row">
            <label>Product:</label>
            <span>{card.product}</span>
          </div>
          <div className="info-row">
            <label>Product Code:</label>
            <span>{card.productCode}</span>
          </div>
          <div className="info-row">
            <label>Card Number:</label>
            <span>{card.cardNo}</span>
          </div>
          <div className="info-row">
            <label>Password:</label>
            <span>{card.password}</span>
          </div>
        </div>

        <div className="info-section">
          <h4>Status Information</h4>
          <div className="info-row">
            <label>Status:</label>
            <span className={`status-badge ${card.status}`}>{card.status}</span>
          </div>
        </div>

        <div className="info-section">
          <h4>Timestamps</h4>
          <div className="info-row">
            <label>Created At:</label>
            <span>{formatDate(card.createdAt)}</span>
          </div>
          <div className="info-row">
            <label>Updated At:</label>
            <span>{formatDate(card.updatedAt)}</span>
          </div>
        </div>
        {card.purchasedBy && (
          <>
            <div className="info-row">
              <label>Purchased At:</label>
              <span>{formatDate(card.purchasedAt)}</span>
            </div>
          </>
        )}
        <CardOwner owner={cardOwner} />
        <PurchaseHistory paymentHistory={paymentHistory} />
      </div>
    </div>
  )
}

export default CardDetails
