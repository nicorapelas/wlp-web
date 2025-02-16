import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import { Context as CardsContext } from '../../../../context/CardsContext'
import { Context as YocoContext } from '../../../../context/YocoContext'
import WP001 from '../../../common/products/WP001'
import WP002 from '../../../common/products/WP002'
import WP003 from '../../../common/products/WP003'
import './cardToBuyConfirm.css'

const CardToBuyConfirm = () => {
  const {
    state: { cardToBuy },
    setCardToBuy,
  } = useContext(CardsContext)

  const { setConfirmPurchase } = useContext(YocoContext)

  const navigate = useNavigate()

  const renderSelectedCard = () => {
    switch (cardToBuy.productCode) {
      case 'WP001':
        return <WP001 />
      case 'WP002':
        return <WP002 />
      case 'WP003':
        return <WP003 />
      default:
        return null
    }
  }

  const handleCancel = () => {
    setCardToBuy(null)
  }

  const handleConfirm = () => {
    setConfirmPurchase(true)
    navigate('/checkout')
  }

  return (
    <div className="card-confirm-overlay">
      <div className="card-confirm-container">
        <div className="card-confirm-content">
          <div className="card-confirm-title">Confirm Purchase</div>
          <div className="card-confirm-product">{renderSelectedCard()}</div>
          <div className="card-confirm-actions">
            <button className="btn btn-confirm" onClick={handleConfirm}>
              Confirm
            </button>
            <button className="btn btn-cancel" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CardToBuyConfirm
