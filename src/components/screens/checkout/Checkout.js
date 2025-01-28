import YocoPaymentPortal from '../../payment/YocoPaymentPortal'
// import PayfastPaymentPortal from '../../payment/PayfastPaymentPortal'

const CheckoutPage = () => {
  return (
    <div>
      <h1>Checkout</h1>
      <YocoPaymentPortal />
      {/* <PayfastPaymentPortal /> */}
    </div>
  )
}

export default CheckoutPage
