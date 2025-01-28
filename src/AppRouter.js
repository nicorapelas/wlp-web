import React, { useContext, useEffect } from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'

import LoaderFullScreen from './components/common/loaders/fullScreenLoader/LoaderFullScreen'
import NotFound from './components/common/notFound/NotFound'
import SignupHR from './components/screens/authScreens/signup/Signup'
import Login from './components/screens/authScreens/login/Login'
import Dashboard from './components/screens/dashboard/Dashboard'
import InitDataFetch from './components/InitDataFetch'
import CheckoutPage from './components/screens/checkout/Checkout'
import PaymentSuccess from './components/screens/checkout/PaymentSuccess'
import PaymentCancelled from './components/screens/checkout/PaymentCancelled'
import CardsAdmin from './components/screens/cardsAdmin/CardsAdmin'
import MyCards from './components/screens/myCards/MyCards'
import PaymentHistory from './components/screens/paymentHistory/PaymentHistory'
import AdminPanel from './components/screens/adminPanel/AdminPanel'
import Home from './components/screens/home/Home'
import { Context as AuthContext } from './context/AuthContext'

const AppRouter = () => {
  const {
    state: { token, isAuthChecked },
    tryLocalSignin,
    fetchUser,
    setIsAuthChecked,
  } = useContext(AuthContext)

  useEffect(() => {
    if (!isAuthChecked) {
      const checkAuth = async () => {
        await tryLocalSignin()
        setIsAuthChecked(true)
      }
      checkAuth()
    }
  }, [isAuthChecked])

  useEffect(() => {
    if (token) {
      fetchUser()
    }
  }, [token])

  // Don't render routes until we've checked auth
  if (!isAuthChecked) {
    return <LoaderFullScreen />
  }

  const router = () => {
    return (
      <>
        <InitDataFetch />
        <Router>
          <Routes>
            {/* Protected Routes */}
            <Route
              path="/dashboard"
              element={
                token ? (
                  <Dashboard />
                ) : (
                  <>
                    <Navigate to="/login" replace />
                  </>
                )
              }
            />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/payment-success" element={<PaymentSuccess />} />
            <Route path="/payment-cancelled" element={<PaymentCancelled />} />
            <Route path="/my-cards" element={<MyCards />} />
            {/* Admin Routes */}
            <Route path="/cards-admin" element={<CardsAdmin />} />
            <Route path="/payment-history" element={<PaymentHistory />} />
            <Route path="/admin-panel" element={<AdminPanel />} />
            {/* Auth Routes */}
            <Route
              path="/login"
              element={token ? <Navigate to="/dashboard" replace /> : <Login />}
            />
            <Route path="/signup" element={<SignupHR />} />
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </>
    )
  }

  return router()
}

export default AppRouter
