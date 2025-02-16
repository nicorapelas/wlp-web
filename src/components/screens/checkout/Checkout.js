import YocoPaymentPortal from '../../payment/YocoPaymentPortal'
import NetworkChecker from '../../common/NetworkChecker'
// import PayfastPaymentPortal from '../../payment/PayfastPaymentPortal'

const CheckoutPage = () => {
  return (
    <>
      <NetworkChecker />
      <div>
        <h1>Checkout</h1>
        <YocoPaymentPortal />
        {/* <PayfastPaymentPortal /> */}
      </div>
    </>
  )
}

export default CheckoutPage
