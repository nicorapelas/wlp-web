import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { Context as AuthContext } from '../../context/AuthContext'
import { Context as CardsContext } from '../../context/CardsContext'

const NetworkChecker = () => {
  const {
    state: { networkError: authNetworkError },
  } = useContext(AuthContext)

  const {
    state: { networkError: cardsNetworkError },
  } = useContext(CardsContext)

  const navigate = useNavigate()

  useEffect(() => {
    if (authNetworkError || cardsNetworkError) {
      navigate('/network-error')
    }
  }, [authNetworkError, cardsNetworkError])

  return null
}

export default NetworkChecker
