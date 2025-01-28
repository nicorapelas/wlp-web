import React, { useEffect, useState } from 'react'
import VideoPlayer from './VideoPlayer'
import './FirstImpressionView.css'

const FirstImpressionView = ({ publicId }) => {
  const [error, setError] = useState(null)

  const videoOptions = {
    cloudName: 'cv-cloud',
    publicId: publicId,
  }

  if (error) {
    return (
      <div className="error-message">Error loading video: {error.message}</div>
    )
  }

  if (!publicId) {
    return <div className="error-message">No video available</div>
  }

  return (
    <div className="videoBed">
      <div className="videoContainer">
        <VideoPlayer
          options={videoOptions}
          onError={(error) => setError(error)}
        />
      </div>
    </div>
  )
}

export default FirstImpressionView
