import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { Context as AuthContext } from '../../../context/AuthContext'
import { Context as CardsContext } from '../../../context/CardsContext'
import WP001 from '../../common/products/WP001'
import WP002 from '../../common/products/WP002'
import WP003 from '../../common/products/WP003'
import CardToBuyConfirm from './cardToBuyConfirm/CardToBuyConfirm'
import './dashboard.css'

const Dashboard = () => {
  const { signout, setIsAuthChecked } = useContext(AuthContext)
  const {
    state: { cardToBuy },
  } = useContext(CardsContext)

  const navigate = useNavigate()

  const handleMyCardsPress = () => {
    navigate('/my-cards')
  }

  const handleSignout = () => {
    signout()
    setIsAuthChecked(false)
  }

  const renderContent = () => {
    if (cardToBuy) {
      return <CardToBuyConfirm />
    }
    return (
      <div className="dashboard-container">
        <div className="dashboard-buttons-container">
          <button className="nav-button" onClick={handleMyCardsPress}>
            My Cards
          </button>
          <button className="signout-button" onClick={handleSignout}>
            Sign Out
          </button>
        </div>
        <main className="dashboard-content">
          <WP001 />
          <WP002 />
          <WP003 />
        </main>
      </div>
    )
  }

  return renderContent()
}

export default Dashboard
