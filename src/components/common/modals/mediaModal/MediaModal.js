import React, { useState, useContext, useEffect } from 'react'

import FirstImpressionView from './firstImpressionView/FirstImpressionView'
import { Context as CommonContext } from '../../../../context/CommonContext'
import './mediaModal.css'

const MediaModal = () => {
  const [title, setTitle] = useState('')

  const {
    state: { mediaSelected, mediaModalShow },
    setMediaSelected,
    setMediaModalShow,
  } = useContext(CommonContext)

  useEffect(() => {
    if (!mediaSelected) return
    const { type } = mediaSelected
    switch (type) {
      case 'firstImpression':
        setTitle('First Impression')
    }
  }, [mediaSelected])

  const mediaSeletor = () => {
    const { type, publicId } = mediaSelected
    switch (type) {
      case 'firstImpression':
        return <FirstImpressionView publicId={publicId} />
      default:
        return null
    }
  }

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      setMediaSelected(null)
      setMediaModalShow(false)
    }
  }

  const renderContent = () => {
    if (!mediaModalShow) return null
    return (
      <div className="modal-overlay" onClick={handleOverlayClick}>
        <div className="modal-content">
          <div className="modal-header">
            <h2 className="modal-title">{title}</h2>
            <button className="modal-close" onClick={handleOverlayClick}>
              ×
            </button>
          </div>
          <div className="modal-body">{mediaSeletor()}</div>
        </div>
      </div>
    )
  }

  return renderContent()
}

export default MediaModal
