import React, { useContext, useEffect } from 'react'
import { Context as CardsContext } from '../../../context/CardsContext'
import { cardsData } from './cardBatchToUpload/cardBatchToUpload'

const CardsList = ({ cards, onViewDetails }) => {
  const { createCardBatch } = useContext(CardsContext)

  const createNewCardBatch = async () => {
    const cardsWithBatch = cardsData.cards.map((card) => ({
      ...card,
      batchId: `BATCH-${Date.now()}`,
    }))

    await createCardBatch(cardsWithBatch)
  }

  const formatDate = (date) => {
    return date ? new Date(date).toLocaleString() : '-'
  }

  return (
    <div className="cards-list">
      <div className="cards-list-header">
        <h3>Cards List</h3>
        <div className="header-actions">
          <button className="btn btn-primary" onClick={createNewCardBatch}>
            Create New Card Batch
          </button>
        </div>
      </div>

      <div className="stats-row">
        <div className="stat-box">
          <label>Total Cards</label>
          <span>{cards.length}</span>
        </div>
        <div className="stat-box">
          <label>Available</label>
          <span>
            {cards.filter((card) => card.status === 'created').length}
          </span>
        </div>
        <div className="stat-box">
          <label>Sold</label>
          <span>{cards.filter((card) => card.status === 'sold').length}</span>
        </div>
      </div>

      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th>Batch ID</th>
              <th>Product</th>
              <th>Card No.</th>
              <th>Password</th>
              <th>Status</th>
              <th>Purchesed At</th>
              <th>Created At</th>
              <th>Updated At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {cards.map((card) => (
              <tr key={card._id}>
                <td>
                  <span className="batch-id">{card.batchId}</span>
                </td>
                <td>{card.product}</td>
                <td>{card.cardNo}</td>
                <td>{card.password}</td>
                <td>
                  <span className={`status-badge ${card.status}`}>
                    {card.status}
                  </span>
                </td>
                <td>{formatDate(card.purchasedAt)}</td>
                <td>{formatDate(card.createdAt)}</td>
                <td>{formatDate(card.updatedAt)}</td>
                <td>
                  <button
                    className="btn btn-sm btn-info me-2"
                    onClick={() => onViewDetails(card)}
                  >
                    Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default CardsList
