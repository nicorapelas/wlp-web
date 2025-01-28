import React from 'react'
import { format } from 'date-fns'

const PurchaseHistory = ({ paymentHistory }) => {
  if (!paymentHistory || paymentHistory.length === 0) {
    return (
      <div className="card-info">
        <div className="info-section">
          <h4>Purchase History</h4>
          <p className="text-white opacity-70">
            No purchase history available.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="card-info">
      <div className="info-section">
        <h4>Purchase History</h4>

        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th style={{ width: '20%' }}>Order ID</th>
                <th style={{ width: '20%' }}>Date</th>
                <th style={{ width: '15%' }}>Amount</th>
                <th style={{ width: '15%' }}>Status</th>
                <th style={{ width: '30%' }}>Payment Method</th>
              </tr>
            </thead>
            <tbody>
              {paymentHistory.map((purchase) => (
                <tr key={purchase._id}>
                  <td className="font-mono text-sm">{purchase.orderId}</td>
                  <td className="text-sm">
                    {format(new Date(purchase.createdAt), 'MMM dd, yyyy HH:mm')}
                  </td>
                  <td>
                    {purchase.currency} {(purchase.amount / 100).toFixed(2)}
                  </td>
                  <td>
                    <span
                      className={`status-badge ${purchase.status.toLowerCase()}`}
                    >
                      {purchase.status}
                    </span>
                  </td>
                  <td>
                    {purchase.metadata?.paymentMethodDetails?.card ? (
                      <span className="flex items-center gap-2">
                        {purchase.metadata.paymentMethodDetails.card.scheme.toUpperCase()}
                        <span className="text-sm opacity-70">
                          (*
                          {purchase.metadata.paymentMethodDetails.card.maskedCard.slice(
                            -4,
                          )}
                          )
                        </span>
                      </span>
                    ) : (
                      'N/A'
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default PurchaseHistory
