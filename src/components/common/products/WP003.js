import React, { useContext } from 'react'

import { Context as CardsContext } from '../../../context/CardsContext'
import logo from '../../../assets/images/logo/logo-512.png'
import './wp000.css'

const WP003 = () => {
  const {
    state: { cardToBuy },
    setCardToBuy,
  } = useContext(CardsContext)

  const productDetails = [
    { label: 'Quantity', value: '10' },
    { label: 'productCode', value: 'WP003' },
    { label: 'Price', value: '380.00' },
    { label: 'PD', value: 'R38.00 each' },
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
    setCardToBuy({ productCode: 'WP003', price: 38000 })
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
          <span className={detail.label === 'Price' ? 'label-bold' : 'label'}>
            {detail.label}
          </span>
          <span className={detail.label === 'Price' ? 'value-bold' : 'value'}>
            {detail.value}
          </span>
        </div>
      ))
    } else {
      return (
        <div className="detail-row-confirm">
          <div>10 X</div>
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

export default WP003
