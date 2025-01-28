import ngrokApi from '../api/ngrok'
import createDataContext from './createDataContext'

// Reducer
const CommonReducer = (state, action) => {
  switch (action.type) {
    case 'SET_FORM_MODAL_SHOW':
      return { ...state, formModalShow: action.payload }
    case 'SET_FORM_SELECTED':
      return { ...state, formSelected: action.payload }
    case 'FETCH_CV_TO_VIEW':
      return { ...state, curriculumVitae: action.payload, loading: false }
    case 'SET_MEDIA_MODAL_SHOW':
      return { ...state, mediaModalShow: action.payload }
    case 'SET_MEDIA_SELECTED':
      return { ...state, mediaSelected: action.payload }
    default:
      return state
  }
}

// Actions
const setFormModalShow = (dispatch) => (value) => {
  dispatch({ type: 'SET_FORM_MODAL_SHOW', payload: value })
}

const setFormSelected = (dispatch) => (value) => {
  dispatch({ type: 'SET_FORM_SELECTED', payload: value })
}

const fetchCV_ToView = (dispatch) => async (id) => {
  dispatch({ type: 'LOADING' })
  try {
    const response = await ngrokApi.post('/api/curriculum-vitae/view', id)
    if (response.data.error) {
      dispatch({ type: 'ADD_ERROR', payload: response.data.error })
      return
    }
    dispatch({
      type: 'FETCH_CV_TO_VIEW',
      payload: response.data.curriculumVitae,
    })
    return
  } catch (error) {
    console.log(error)
    return
  }
}

const setMediaModalShow = (dispatch) => (value) => {
  dispatch({ type: 'SET_MEDIA_MODAL_SHOW', payload: value })
}

const setMediaSelected = (dispatch) => (data) => {
  dispatch({ type: 'SET_MEDIA_SELECTED', payload: data })
}

export const { Provider, Context } = createDataContext(
  CommonReducer,
  {
    setFormModalShow,
    setFormSelected,
    fetchCV_ToView,
    setMediaSelected,
    setMediaModalShow,
  },
  {
    formModalShow: false,
    formSelected: null,
    curriculumVitae: null,
    mediaSelected: null,
    mediaModalShow: false,
  },
)
