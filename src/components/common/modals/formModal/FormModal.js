import React, { useState, useContext, useEffect } from 'react'

import CompanyForm from './forms/companyForm/CompanyForm'
import { Context as CommonContext } from '../../../../context/CommonContext'
import { Context as AuthContext } from '../../../../context/AuthContext'
import './formModal.css'

const FormModal = () => {
  const [title, setTitle] = useState('')

  const {
    state: { formModalShow, formSelected },
    setFormModalShow,
  } = useContext(CommonContext)

  const {
    state: { closeFormModal },
    closeFormModalReset,
  } = useContext(AuthContext)

  useEffect(() => {
    if (closeFormModal) {
      setFormModalShow(false)
      closeFormModalReset()
    }
  }, [closeFormModal])

  useEffect(() => {
    switch (formSelected) {
      case 'userInfo':
        setTitle('Edit User Information')
    }
  }, [formSelected])

  if (!formModalShow) return null

  const formSelector = () => {
    switch (formSelected) {
      case 'userInfo':
        return <CompanyForm />
    }
  }

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      setFormModalShow(false)
    }
  }

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content">
        <div className="modal-header">
          <h2 className="modal-title">{title}</h2>
          <button className="modal-close" onClick={handleOverlayClick}>
            ×
          </button>
        </div>
        <div className="modal-body">{formSelector()}</div>
      </div>
    </div>
  )
}

export default FormModal
