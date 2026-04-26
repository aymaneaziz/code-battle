import React from 'react'

const PlayerIdentity = ({formData, handleChange}) => {
  return (
    <div>
      <h2 className="text-2xl font-bold text-left">PLAYER IDENTITY</h2>
      <div>
        <p>Username</p>
        <input
          name="username"
          className='w-full border-2 border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
          type="text"
          placeholder='Enter your username'
          value={formData.username}
          onChange={handleChange}
        />
      </div>
      <div className='flex flex-row gap-4'>
        <div className='w-1/2'>
          <p>Display name</p>
          <input
            name="displayName"
            className='w-full border-2 border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
            type="text"
            placeholder='Enter your display name'
            value={formData.displayName}
            onChange={handleChange}
          />
        </div>
        <div className='w-1/2'>
          <p>Country/Region</p>
          <input
            name="address"
            className='w-full border-2 border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
            type="text"
            placeholder='Enter your country or region'
            value={formData.address}
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  )
}

export default PlayerIdentity;