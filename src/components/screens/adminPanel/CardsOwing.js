import React, { useEffect, useContext } from 'react'

import NetworkChecker from '../../common/NetworkChecker'
import { Context as CardsContext } from '../../../context/CardsContext'

const CardsOwing = () => {
  const {
    state: { loading, error, cardsOwing },
    clearError,
    fetchCardsOwing,
    settleCardsOwing,
  } = useContext(CardsContext)

  useEffect(() => {
    fetchCardsOwing()
  }, [])

  useEffect(() => {
    const run = setTimeout(() => {
      clearError()
    }, 5000)
    return () => clearTimeout(run)
  }, [error])

  const handleSettle = (cardOwed) => {
    settleCardsOwing(cardOwed)
  }

  const renderError = () => {
    if (error) {
      return (
        <div className="cards-owing-error" onClick={clearError}>
          {error}
        </div>
      )
    }
  }

  if (loading) return <div className="cards-owing-loading">Loading...</div>

  if (cardsOwing.length === 0)
    return <div className="cards-owing-empty">No cards owing</div>

  return (
    <>
      <NetworkChecker />
      <div className="cards-owing-container">
        <h3>Cards Owing</h3>
        {renderError()}
        <div className="cards-owing-grid">
          {cardsOwing.map((card) => (
            <div key={card._id} className="cards-owing-card">
              <div className="cards-owing-details">
                <p>
                  Number of Cards:{' '}
                  <span className="font-mono">{card.numberOfCards}</span>
                </p>
                <p>
                  Owed To: <span className="font-mono">{card.owedTo}</span>
                </p>
                <p>Created: {new Date(card.createdAt).toLocaleDateString()}</p>
              </div>
              <button
                className="settle-button"
                onClick={() => handleSettle(card)}
              >
                Settle
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default CardsOwing
