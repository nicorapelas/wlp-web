import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import NetworkChecker from '../../common/NetworkChecker'
import { Context as CardsContext } from '../../../context/CardsContext'
import LoaderFullScreen from '../../common/loaders/fullScreenLoader/LoaderFullScreen'
import CardsList from './CardsList'
import CardDetails from './CardDetails'
import './cardsAdmin.css'

const CardsAdmin = () => {
  const {
    state: { cards, loading, error },
    fetchCards,
    clearError,
  } = useContext(CardsContext)

  const [activeTab, setActiveTab] = useState('list')
  const [selectedCard, setSelectedCard] = useState(null)

  const navigate = useNavigate()

  useEffect(() => {
    fetchCards()
  }, [])

  useEffect(() => {
    const clearErrorTimeout = setTimeout(() => {
      clearError()
    }, 5000)
    return () => clearTimeout(clearErrorTimeout)
  }, [error])

  if (loading) {
    return <LoaderFullScreen />
  }

  const handleBackButtonPress = () => {
    navigate('/admin-panel')
  }

  return (
    <>
      <NetworkChecker />
      <div className="cards-admin-container">
        <button className="nav-button" onClick={handleBackButtonPress}>
          Back
        </button>
        <h2>Cards Management</h2>
        {error && <div className="alert alert-danger">{error}</div>}

        {activeTab === 'list' && (
          <CardsList
            cards={cards}
            onViewDetails={(card) => {
              setSelectedCard(card)
              setActiveTab('details')
            }}
          />
        )}

        {activeTab === 'details' && (
          <CardDetails
            card={selectedCard}
            onBack={() => {
              setSelectedCard(null)
              setActiveTab('list')
            }}
          />
        )}
      </div>
    </>
  )
}

export default CardsAdmin
