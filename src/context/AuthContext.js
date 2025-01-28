import ngrokApi from '../api/ngrok'
import createDataContext from './createDataContext'

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOADING':
      return { ...state, loading: true }
    case 'CLOSE_FORM_MODAL':
      return { ...state, closeFormModal: true }
    case 'CLOSE_FORM_MODAL_RESET':
      return { ...state, closeFormModal: false }
    case 'ADD_API_MESSAGE':
      return { ...state, apiMessage: action.payload, loading: false }
    case 'CLEAR_API_MESSAGES':
      return { ...state, apiMessage: '' }
    case 'ADD_ERROR':
      return { ...state, errorMessage: action.payload, loading: false }
    case 'CLEAR_ERROR_MESSAGE':
      return { ...state, errorMessage: '' }
    case 'SET_IS_AUTH_CHECKED':
      return { ...state, isAuthChecked: action.payload }
    case 'SIGN_IN':
      return { errorMessage: '', token: action.payload, loading: false }
    case 'SIGN_OUT':
      return {
        ...state,
        token: null,
        user: null,
        errorMessage: '',
        loading: false,
      }
    case 'FETCH_USER':
      return { ...state, user: action.payload, loading: false }
    case 'CREATE_USERS_DEVICE':
      return { ...state, usersDevice: action.payload }
    case 'SET_INTRO_AFFILIATE_CODE':
      return { ...state, introAffiliateCode: action.payload }
    case 'ADD_AFFILIATE_INFO':
      return { ...state, affiliateInfo: action.payload, loading: false }
    case 'CLEAR_AFFILIATE_INFO':
      return { ...state, affiliateInfo: action.payload }
    case 'ADD_AFFILIATES':
      return { ...state, affiliates: action.payload, loading: false }
    case 'CLEAR_AFFILIATES':
      return { ...state, affiliates: action.payload }
    case 'ADD_USERS_INFO_CONTENT':
      return { ...state, usersInfoContent: action.payload }
    default:
      return state
  }
}

const fetchUser = (dispatch) => async () => {
  dispatch({ type: 'LOADING' })
  try {
    const response = await ngrokApi.get('/auth/user/fetch-user')
    if (response.data.error) {
      dispatch({ type: 'ADD_ERROR', payload: response.data.error })
      return
    } else {
      dispatch({ type: 'FETCH_USER', payload: response.data })
      return
    }
  } catch (error) {
    await ngrokApi.post('/error', { error: error })
    return
  }
}

//   const [isAuthChecked, setIsAuthChecked] = useState(false)

const setIsAuthChecked = (dispatch) => (value) => {
  dispatch({ type: 'SET_IS_AUTH_CHECKED', payload: value })
}

const tryLocalSignin = (dispatch) => async () => {
  try {
    const token = localStorage.getItem('token')
    if (token) {
      dispatch({ type: 'SIGN_IN', payload: token })
    }
  } catch (err) {
    console.log('Error checking local token:', err)
  }
}

const register =
  (dispatch) =>
  async ({ fullName, email, password, password2, introAffiliateCode, HR }) => {
    dispatch({ type: 'LOADING' })
    try {
      const response = await ngrokApi.post('/auth/user/register', {
        fullName,
        email,
        password,
        password2,
        affiliatceIntroCode: introAffiliateCode,
        HR,
      })
      if (response.data.error)
        dispatch({ type: 'ADD_ERROR', payload: response.data.error })
      if (response.data.success)
        dispatch({ type: 'ADD_API_MESSAGE', payload: response.data })
    } catch (err) {
      await ngrokApi.post('/error', { error: err })
    }
  }

const resendVerificationEmail =
  (dispatch) =>
  async ({ email }) => {
    dispatch({ type: 'LOADING' })
    try {
      const response = await ngrokApi.post(
        '/auth/user/resend-verification-email',
        { email },
      )
      dispatch({ type: 'ADD_API_MESSAGE', payload: response.data })
      return
    } catch (err) {
      await ngrokApi.post('/error', { error: err })
    }
  }

const login =
  (dispatch) =>
  async ({ email, password }) => {
    dispatch({ type: 'LOADING' })
    try {
      const response = await ngrokApi.post('/auth/user/login', {
        email,
        password,
      })
      if (response.data.error) {
        dispatch({
          type: 'ADD_ERROR',
          payload: response.data.error,
        })
      } else {
        localStorage.setItem('token', response.data.token)
        dispatch({ type: 'SIGN_IN', payload: response.data.token })
      }
    } catch (err) {
      await ngrokApi.post('/error', { error: err })
      return
    }
  }

const signout = (dispatch) => async () => {
  localStorage.removeItem('token')
  dispatch({ type: 'SIGN_OUT' })
  window.location.reload()
}

const forgotPassword =
  (dispatch) =>
  async ({ email }) => {
    dispatch({ type: 'LOADING' })
    try {
      const response = await ngrokApi.post('/auth/user/forgot', { email })
      if (response.data.error) {
        dispatch({ type: 'ADD_ERROR', payload: response.data.error })
      }
      if (response.data.success) {
        dispatch({ type: 'ADD_API_MESSAGE', payload: response.data })
      }
    } catch (error) {
      await ngrokApi.post('/error', { error: error })
    }
  }

// NOTE
const acceptTermsAndConditions = (dispatch) => async (value) => {
  dispatch({ type: 'LOADING' })
  try {
    const response = await ngrokApi.post('/auth/user/term-conditions', {
      accepted: value,
    })
    dispatch({ type: 'FETCH_USER', payload: response.data })
    return
  } catch (error) {
    await ngrokApi.post('/error', { error: error })
    return
  }
}

const clearApiMessage = (dispatch) => () => {
  dispatch({ type: 'CLEAR_API_MESSAGES' })
}

const clearErrorMessage = (dispatch) => () => {
  dispatch({ type: 'CLEAR_ERROR_MESSAGE' })
}

const createDeviceInfo = (dispatch) => async (data) => {
  try {
    const response = await ngrokApi.post('/auth/device', data)
    dispatch({ type: 'CREATE_USERS_DEVICE', payload: response.data })
    return
  } catch (error) {
    await ngrokApi.post('/error', { error: error })
    return
  }
}

const increaseUserVisitCount = (dispatch) => async () => {
  try {
    await ngrokApi.patch('/auth/user/visit-count')
    return
  } catch (error) {
    await ngrokApi.post('/error', { error: error })
    return
  }
}

const setIntroAffiliateCode = (dispatch) => (code) => {
  dispatch({ type: 'SET_INTRO_AFFILIATE_CODE', payload: code })
}

// Admin use only
const createAffiliate = (dispatch) => async (email) => {
  dispatch({ type: 'LOADING' })
  try {
    const response = await ngrokApi.patch('/auth/user/create-affiliate', email)
    if (response.data.error) {
      dispatch({ type: 'ADD_ERROR', payload: response.data.error })
    }
    if (response.data.success) {
      dispatch({ type: 'ADD_API_MESSAGE', payload: response.data.success })
    }
    return
  } catch (error) {
    await ngrokApi.post('/error', { error: error })
    return
  }
}

// Admin use only
const fetchAffiliateInfo = (dispatch) => async (email) => {
  dispatch({ type: 'LOADING' })
  try {
    const response = await ngrokApi.post(
      '/auth/user/fetch-affiliate-info',
      email,
    )
    if (response.data.error) {
      dispatch({ type: 'ADD_ERROR', payload: response.data.error })
      return
    }
    dispatch({ type: 'ADD_AFFILIATE_INFO', payload: response.data })
    return
  } catch (error) {
    await ngrokApi.post('/error', { error: error })
    return
  }
}

const clearAffiliateInfo = (dispatch) => () => {
  dispatch({ type: 'CLEAR_AFFILIATE_INFO', payload: null })
}

const fetchAllAffiliates = (dispatch) => async () => {
  dispatch({ type: 'LOADING' })
  try {
    const response = await ngrokApi.get('/auth/user/fetch-affiliates')
    if (response.data.error) {
      dispatch({ type: 'ADD_ERROR', payload: response.data.error })
    }
    dispatch({ type: 'ADD_AFFILIATES', payload: response.data })
  } catch (error) {
    await ngrokApi.post('/error', { error: error })
    return
  }
}

const clearAffiliates = (dispatch) => () => {
  dispatch({ type: 'CLEAR_AFFILIATES', payload: null })
}

const applyToIntro = (dispatch) => async () => {
  try {
    await ngrokApi.patch('/auth/user/apply-to-intro')
    return
  } catch (error) {
    await ngrokApi.post('/error', { error: error })
    return
  }
}

const deleteAccount = (dispatch) => async () => {
  dispatch({ type: 'LOADING' })
  try {
    const response = await ngrokApi.delete('/auth/user/delete-account')
    dispatch({ type: 'ADD_API_MESSAGE', payload: response.data })
    return
  } catch (error) {
    await ngrokApi.post('/error', { error: error })
    return
  }
}

const fetchUsersInfoContent = (dispatch) => async () => {
  dispatch({ type: 'LOADING' })
  try {
    const response = await ngrokApi.get('/users-info')
    if (response.data.error) {
      dispatch({ type: 'ADD_ERROR', payload: response.data.error })
      return
    }
    dispatch({ type: 'ADD_USERS_INFO_CONTENT', payload: response.data })
    return
  } catch (error) {
    await ngrokApi.post('/error', { error: error })
    return
  }
}

// HR only Actions
const updateUsersInfo = (dispatch) => async (data) => {
  dispatch({ type: 'LOADING' })
  try {
    const response = await ngrokApi.patch(
      '/auth/user/hr/update-users-info',
      data,
    )
    dispatch({ type: 'FETCH_USER', payload: response.data })
    dispatch({ type: 'CLOSE_FORM_MODAL' })
    return
  } catch (error) {
    await ngrokApi.post('/error', { error: error })
    return
  }
}

const closeFormModalReset = (dispatch) => () => {
  dispatch({ type: 'CLOSE_FORM_MODAL_RESET' })
}

export const { Provider, Context } = createDataContext(
  authReducer,
  {
    register,
    resendVerificationEmail,
    login,
    signout,
    clearApiMessage,
    clearErrorMessage,
    setIsAuthChecked,
    tryLocalSignin,
    forgotPassword,
    fetchUser,
    acceptTermsAndConditions,
    createDeviceInfo,
    increaseUserVisitCount,
    createAffiliate,
    fetchAffiliateInfo,
    setIntroAffiliateCode,
    clearAffiliateInfo,
    fetchAllAffiliates,
    clearAffiliates,
    applyToIntro,
    deleteAccount,
    fetchUsersInfoContent,
    closeFormModalReset,
    // HR only
    updateUsersInfo,
  },
  {
    token: null,
    user: null,
    errorMessage: null,
    apiMessage: null,
    loading: false,
    closeFormModal: false,
    isAuthChecked: false,
    usersDevice: null,
    introAffiliateCode: null,
    affiliateInfo: null,
    affiliates: null,
    usersInfoContent: null,
  },
)

// set introAffiliateCode to null after submit
