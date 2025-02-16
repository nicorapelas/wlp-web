import createDataContext from './createDataContext'
import ngrokApi from '../api/ngrok'

const yocoReducer = (state, action) => {
  switch (action.type) {
    case 'NETWORK_ERROR':
      return { ...state, networkError: action.payload }
    case 'SET_LOADING':
      return { ...state, loading: true }
    case 'CLEAR_LOADING':
      return { ...state, loading: false }
    case 'SET_ERROR':
      return { ...state, errorMessage: action.payload, loading: false }
    case 'CLEAR_ERROR':
      return { ...state, errorMessage: null }
    case 'SET_PAYMENT_DATA':
      return { ...state, paymentData: action.payload, loading: false }
    case 'CLEAR_PAYMENT_DATA':
      return { ...state, paymentData: null }
    case 'SET_CONFIRM_PURCHASE':
      return { ...state, confirmPurchase: action.payload }
    case 'SET_PAYMENT_TRIGGERED':
      return { ...state, paymentTriggered: action.payload }
    case 'SET_PAYMENT_HISTORY':
      return { ...state, paymentHistory: action.payload }
    case 'SET_ALL_PAYMENT_HISTORY':
      return { ...state, allPaymentHistory: action.payload, loading: false }
    case 'SET_USER_OF_PAYMENT':
      return { ...state, userOfPayment: action.payload, loading: false }
    case 'SET_USER_OF_PAYMENT_PROPS':
      return { ...state, userOfPaymentProps: action.payload }
    default:
      return state
  }
}

const clearError = (dispatch) => () => {
  dispatch({ type: 'CLEAR_ERROR' })
}

const initiatePayment = (dispatch) => async (paymentData) => {
  try {
    dispatch({ type: 'SET_LOADING' })
    const response = await ngrokApi.post('/payment/create-payment', paymentData)
    dispatch({
      type: 'SET_PAYMENT_DATA',
      payload: {
        ...response.data,
        paymentInitiated: true,
      },
    })
    return response.data
  } catch (error) {
    dispatch({ type: 'NETWORK_ERROR', payload: true })
  }
}

const setPaymentTriggered = (dispatch) => (value) => {
  dispatch({ type: 'SET_PAYMENT_TRIGGERED', payload: value })
}

const clearPaymentData = (dispatch) => () => {
  dispatch({ type: 'CLEAR_PAYMENT_DATA' })
}

const setConfirmPurchase = (dispatch) => (value) => {
  dispatch({ type: 'SET_CONFIRM_PURCHASE', payload: value })
}

const fetchPaymentHistory = (dispatch) => async (ownerId) => {
  try {
    const response = await ngrokApi.post('/payment/fetch-purchase-history', {
      ownerId,
    })
    dispatch({ type: 'SET_PAYMENT_HISTORY', payload: response.data })
  } catch (error) {
    dispatch({ type: 'NETWORK_ERROR', payload: true })
  }
}

// Admin actoins
const fetchAllPaymentHistory = (dispatch) => async () => {
  dispatch({ type: 'SET_LOADING' })
  try {
    const response = await ngrokApi.get('/payment/fetch-all-payments')
    dispatch({ type: 'SET_ALL_PAYMENT_HISTORY', payload: response.data })
  } catch (error) {
    dispatch({ type: 'NETWORK_ERROR', payload: true })
  }
}

const fetchUserOfPayment = (dispatch) => async (userId) => {
  dispatch({ type: 'SET_LOADING' })
  try {
    const response = await ngrokApi.post('/payment/fetch-user-of-payment', {
      userId,
    })
    dispatch({ type: 'SET_USER_OF_PAYMENT', payload: response.data })
  } catch (error) {
    dispatch({ type: 'NETWORK_ERROR', payload: true })
  }
}

const setUserOfPaymentProps = (dispatch) => (props) => {
  dispatch({ type: 'SET_USER_OF_PAYMENT_PROPS', payload: props })
}

export const { Context, Provider } = createDataContext(
  yocoReducer,
  {
    clearError,
    initiatePayment,
    clearPaymentData,
    setConfirmPurchase,
    setPaymentTriggered,
    fetchPaymentHistory,
    fetchAllPaymentHistory,
    fetchUserOfPayment,
    setUserOfPaymentProps,
    setUserOfPaymentProps,
  },
  {
    networkError: false,
    loading: false,
    errorMessage: null,
    paymentData: null,
    confirmPurchase: false,
    paymentTriggered: false,
    paymentHistory: [],
    allPaymentHistory: [],
    userOfPayment: null,
    userOfPaymentProps: null,
  },
)
