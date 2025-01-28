import React from 'react'
import { PuffLoader } from 'react-spinners'

import './loaderFullScreen.css'

const LoaderFullScreen = () => {
  return (
    <div className="loader-full-screen-container">
      <PuffLoader
        color="#7abbf4"
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  )
}

export default LoaderFullScreen
