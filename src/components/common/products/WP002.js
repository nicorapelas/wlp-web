import React, { useContext } from 'react'

import { Context as CardsContext } from '../../../context/CardsContext'
import logo from '../../../assets/images/logo/logo-512.png'
import './wp000.css'

const WP002 = () => {
  const {
    state: { cardToBuy },
    setCardToBuy,
  } = useContext(CardsContext)

  const productDetails = [
    { label: 'Quantity', value: '5' },
    { label: 'productCode', value: 'WP002' },
    { label: 'Price', value: '200.00' },
    { label: 'PD', value: 'R40.00 each' },
    { label: 'Brand:', value: 'WATCHLISTPRO' },
    { label: 'Service Type:', value: 'VOD' },
    { label: 'Charging Type:', value: 'Recharge card' },
    { label: 'Period Plan:', value: 'Monthly' },
    { label: 'Mobile & Web Session:', value: '1' },
    { label: 'CDN service:', value: 'Not include CDN' },
    { label: 'Network type:', value: 'OTT' },
    { label: 'Product:', value: 'Watchlistpro Monthly' },
  ]

  const handleBuyNowClick = () => {
    setCardToBuy({ productCode: 'WP002', price: 20000 })
  }

  const renderBuyButton = () => {
    if (!cardToBuy) {
      return (
        <button className="coupon-button" onClick={handleBuyNowClick}>
          Buy Now
        </button>
      )
    } else {
      const formattedPrice = (cardToBuy.price / 100).toFixed(2)
      return <button className="coupon-button">Price: R{formattedPrice}</button>
    }
  }

  const renderProductDetails = () => {
    if (!cardToBuy) {
      return productDetails.map((detail, index) => (
        <div key={index} className="detail-row">
          <span
            className={
              detail.label === 'Price' ? 'detail-label-bold' : 'detail-label'
            }
          >
            {detail.label}
          </span>
          <span
            className={
              detail.label === 'Price' ? 'detail-value-bold' : 'detail-value'
            }
          >
            {detail.value}
          </span>
        </div>
      ))
    } else {
      return (
        <div className="detail-row-confirm">
          <div>5 X</div>
          <div>1 month WP</div>
          <div>CDN service, NOT included</div>
        </div>
      )
    }
  }

  return (
    <div className="product-card">
      <div className="product-image">
        <img src={logo} alt="Watchlist Pro Logo" />
      </div>
      <div className="product-details">
        {renderProductDetails()}
        {renderBuyButton()}
      </div>
    </div>
  )
}

export default WP002
