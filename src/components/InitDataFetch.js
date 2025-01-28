import { useEffect, useContext } from 'react'
import { Context as AuthContext } from '../context/AuthContext'

const InitDataFetch = () => {
  const {
    state: { user },
  } = useContext(AuthContext)

  return null
}

export default InitDataFetch
