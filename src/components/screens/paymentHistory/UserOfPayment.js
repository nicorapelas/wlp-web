import React, { useContext, useEffect } from 'react'
import { format } from 'date-fns'
import { Context as YocoContext } from '../../../context/YocoContext'

const UserOfPayment = () => {
  const {
    state: { userOfPayment, userOfPaymentProps },
    fetchUserOfPayment,
    setUserOfPaymentProps,
  } = useContext(YocoContext)

  useEffect(() => {
    if (userOfPaymentProps) {
      const { userId } = userOfPaymentProps
      fetchUserOfPayment(userId)
    }
  }, [userOfPaymentProps])

  if (!userOfPayment) return null

  console.log(`userOfPayment:`, userOfPayment)

  const defaultAvatar =
    'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y'

  return <div>UserOfPayment</div>

  // return (
  //   <div className="card-info">
  //     <button
  //       className="nav-button"
  //       onClick={() => setUserOfPaymentProps(null)}
  //     >
  //       Back
  //     </button>
  //     <div className="info-section">
  //       <h4>User Details</h4>

  //       <div className="flex items-center space-x-4 mb-4">
  //         <img
  //           src={userOfPayment.avatar || defaultAvatar}
  //           alt={`${userOfPayment.username}'s avatar`}
  //           className="w-16 h-16 rounded-full object-cover border-2 border-[#f4d63d]"
  //         />
  //         <div>
  //           <h2 className="text-xl font-semibold" style={{ color: '#f4d63d' }}>
  //             {userOfPayment.username}
  //           </h2>
  //         </div>
  //       </div>

  //       <div className="space-y-2">
  //         <div className="info-row">
  //           <label>Member since</label>
  //           <span>
  //             {format(new Date(userOfPayment.created), 'MMM dd, yyyy')}
  //           </span>
  //         </div>

  //         <div className="info-row">
  //           <label>User ID</label>
  //           <span className="font-mono text-sm">{userOfPayment._id}</span>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // )
}

export default UserOfPayment
