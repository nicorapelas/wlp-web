import React, { useContext, useEffect } from 'react'
import { format } from 'date-fns'
import { useNavigate } from 'react-router-dom'
import Loader from '../../common/loaders/fullScreenLoader/LoaderFullScreen'
import { Context as CardContext } from '../../../context/CardsContext'
import '../dashboard/dashboard.css'

const MyCards = () => {
  const navigate = useNavigate()

  const {
    state: { userCards, loading },
    fetchUsersCards,
  } = useContext(CardContext)

  useEffect(() => {
    fetchUsersCards()
  }, [])

  if (loading) {
    return <Loader />
  }

  const handleBackButtonPress = () => {
    navigate('/dashboard')
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
                <th>Card No</th>
                <th>Product</th>
                <th>Purchase Date</th>
                <th>Password</th>
              </tr>
            </thead>
            <tbody>
              {userCards.map((card) => (
                <tr key={card._id}>
                  <td className="font-mono text-sm">{card.cardNo}</td>
                  <td>{card.product}</td>
                  <td className="text-sm">
                    {format(
                      new Date(card.purchasedAt || card.createdAt),
                      'MMM dd, yyyy HH:mm',
                    )}
                  </td>
                  <td className="font-mono text-sm">{card.password}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default MyCards
