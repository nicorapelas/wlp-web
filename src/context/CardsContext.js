import ngrokApi from '../api/ngrok'
import createDataContext from './createDataContext'

// Reducer
const CardsReducer = (state, action) => {
  switch (action.type) {
    case 'LOADING':
      return { ...state, loading: true, error: null }
    case 'NETWORK_ERROR':
      return { ...state, networkError: true, loading: false }
    case 'ADD_ERROR':
      return { ...state, error: action.payload, loading: false }
    case 'FETCH_CARDS':
      return { ...state, cards: action.payload, loading: false }
    case 'ADD_CARDS':
      return {
        ...state,
        cards: [...state.cards, ...action.payload],
        loading: false,
        error: null,
      }
    case 'CLEAR_ERROR':
      return { ...state, error: null }
    case 'SET_CARD_TO_BUY':
      return { ...state, cardToBuy: action.payload }
    case 'FETCH_CARD_OWNER':
      return { ...state, cardOwner: action.payload, loading: false }
    case 'FETCH_USER_CARDS':
      return { ...state, userCards: action.payload, loading: false }
    case 'FETCH_CARDS_OWING':
      return { ...state, cardsOwing: action.payload, loading: false }
    case 'SET_CARDS_OWING':
      return { ...state, cardsOwing: action.payload, loading: false }
    case 'SET_MY_CARD_TO_VIEW':
      return { ...state, myCardToView: action.payload, loading: false }
    default:
      return state
  }
}

// Actions
const fetchCards = (dispatch) => async () => {
  dispatch({ type: 'LOADING' })
  try {
    const response = await ngrokApi.get('/cards')
    if (response.data.error) {
      dispatch({ type: 'ADD_ERROR', payload: response.data.error })
      return
    }
    dispatch({ type: 'FETCH_CARDS', payload: response.data })
  } catch (error) {
    dispatch({ type: 'ADD_ERROR', payload: 'Could not fetch cards' })
  }
}

const createCardBatch = (dispatch) => async (cards) => {
  dispatch({ type: 'LOADING' })
  try {
    const response = await ngrokApi.post('/cards/batch', { cards })
    if (response.data.error) {
      let errorMessage = response.data.error
      if (response.data.duplicates) {
        errorMessage += '\n' + response.data.duplicates.join('\n')
      }
      dispatch({ type: 'ADD_ERROR', payload: errorMessage })
      return null
    }

    dispatch({ type: 'ADD_CARDS', payload: response.data })
    return response.data
  } catch (error) {
    dispatch({
      type: 'ADD_ERROR',
      payload: error.response?.data?.error || 'Failed to create card batch',
    })
    console.log(error)
    return null
  }
}

const clearError = (dispatch) => async () => {
  dispatch({ type: 'CLEAR_ERROR' })
}

const setCardToBuy = (dispatch) => async (data) => {
  dispatch({ type: 'SET_CARD_TO_BUY', payload: data })
}

const fetchUsersCards = (dispatch) => async () => {
  dispatch({ type: 'LOADING' })
  try {
    const response = await ngrokApi.get('/cards/fetch-user-cards')
    dispatch({ type: 'FETCH_USER_CARDS', payload: response.data })
  } catch (error) {
    dispatch({ type: 'NETWORK_ERROR', payload: true })
  }
}

// Admin Action
const fetchCardOwner = (dispatch) => async (ownerId) => {
  dispatch({ type: 'LOADING' })
  try {
    const response = await ngrokApi.post('/cards/fetch-card-owner', { ownerId })
    dispatch({ type: 'FETCH_CARD_OWNER', payload: response.data })
  } catch (error) {
    dispatch({ type: 'NETWORK_ERROR', payload: true })
  }
}

const fetchCardsOwing = (dispatch) => async () => {
  dispatch({ type: 'LOADING' })
  try {
    const response = await ngrokApi.get('/cards/fetch-cards-owing')
    dispatch({ type: 'FETCH_CARDS_OWING', payload: response.data })
  } catch (error) {
    dispatch({ type: 'NETWORK_ERROR', payload: true })
  }
}

const settleCardsOwing = (dispatch) => async (cardOwed) => {
  dispatch({ type: 'LOADING' })
  try {
    const response = await ngrokApi.post('/cards/settle-cards-owing', cardOwed)
    if (response.data.error) {
      dispatch({ type: 'ADD_ERROR', payload: response.data.error })
      return
    }
    dispatch({ type: 'SET_CARDS_OWING', payload: response.data })
  } catch (error) {
    dispatch({ type: 'NETWORK_ERROR', payload: true })
  }
}

const setMyCardToView = (dispatch) => async (cardId) => {
  dispatch({ type: 'SET_MY_CARD_TO_VIEW', payload: cardId })
}

export const { Provider, Context } = createDataContext(
  CardsReducer,
  {
    fetchCards,
    createCardBatch,
    clearError,
    setCardToBuy,
    fetchCardOwner,
    fetchUsersCards,
    fetchCardsOwing,
    settleCardsOwing,
    setMyCardToView,
  },
  {
    cards: [],
    availableCards: [],
    loading: false,
    error: null,
    cardToBuy: null,
    cardOwner: null,
    userCards: [],
    cardsOwing: [],
    networkError: false,
    myCardToView: null,
  },
)
