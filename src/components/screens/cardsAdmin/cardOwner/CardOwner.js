import React from 'react'
import { format } from 'date-fns'

const CardOwner = ({ owner }) => {
  if (!owner) return null

  const defaultAvatar =
    'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y'

  return (
    <div className="card-info">
      <div className="info-section">
        <h4>Card Owner Details</h4>

        <div className="flex items-center space-x-4 mb-4">
          <img
            src={owner.avatar || defaultAvatar}
            alt={`${owner.username}'s avatar`}
            className="w-16 h-16 rounded-full object-cover border-2 border-[#f4d63d]"
          />
          <div>
            <h2 className="text-xl font-semibold text-[#f4d63d]">
              {owner.username}
            </h2>
          </div>
        </div>

        <div className="space-y-2">
          <div className="info-row">
            <label>Member since</label>
            <span>{format(new Date(owner.created), 'MMM dd, yyyy')}</span>
          </div>

          <div className="info-row">
            <label>User ID</label>
            <span className="font-mono text-sm">{owner._id}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CardOwner
