import React, { useContext, useEffect, useState } from 'react'
import { format } from 'date-fns'
import { useNavigate } from 'react-router-dom'
import { FaInfoCircle } from 'react-icons/fa'

import NetworkChecker from '../../common/NetworkChecker'
import Loader from '../../common/loaders/fullScreenLoader/LoaderFullScreen'
import { Context as CardContext } from '../../../context/CardsContext'
import '../dashboard/dashboard.css'

const MyCards = () => {
  const navigate = useNavigate()

  const {
    state: { userCards, loading, networkError },
    fetchUsersCards,
    setMyCardToView,
  } = useContext(CardContext)

  useEffect(() => {
    fetchUsersCards()
  }, [])

  useEffect(() => {
    if (networkError) {
      navigate('/network-error')
    }
  }, [networkError])

  if (loading) {
    return <Loader />
  }

  const handleBackButtonPress = () => {
    navigate('/dashboard')
  }

  const handleRowClick = (card) => {
    setMyCardToView(card)
    navigate('/my-card-view')
  }

  if (!userCards || !Array.isArray(userCards) || userCards.length === 0) {
    return (
      <div className="card-info">
        <button className="nav-button" onClick={handleBackButtonPress}>
          Back
        </button>
        <div className="info-section">
          <h4>My Cards</h4>
          <p style={{ color: '#ffff' }}>No cards available.</p>
        </div>
      </div>
    )
  }

  if (!userCards || userCards.length === 0) {
    return (
      <div className="card-info">
        <button className="nav-button" onClick={handleBackButtonPress}>
          Back
        </button>
        <div className="info-section">
          <h4>My Cards</h4>
          <p style={{ color: '#ffff' }}>No cards available.</p>
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
          <h4>My Cards</h4>
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th></th>
                  <th>Purchase Date</th>
                  <th>Password</th>
                  <th>Card No</th>
                  <th>Product</th>
                </tr>
              </thead>
              <div className="my-cards-header-spacer"></div>
              <tbody>
                {userCards
                  .sort((a, b) => {
                    const dateA = new Date(a.purchasedAt || a.createdAt)
                    const dateB = new Date(b.purchasedAt || b.createdAt)
                    return dateB - dateA
                  })
                  .map((card) => (
                    <tr key={card._id}>
                      <div className="view-button-container">
                        <button
                          className="view-button"
                          onClick={() => handleRowClick(card)}
                        >
                          View
                        </button>
                      </div>
                      <td className="text-sm">
                        {format(
                          new Date(card.purchasedAt || card.createdAt),
                          'MMM dd, yyyy HH:mm',
                        )}
                      </td>
                      <td className="font-mono text-sm">{card.password}</td>
                      <td className="font-mono text-sm">{card.cardNo}</td>
                      <td>{card.product}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  )
}

export default MyCards
