import React, { useEffect } from 'react'
import LiveDashboard from '../components/LiveDashboard'

const HomePage = () => {
  useEffect(() => {
    document.title = 'Car Sensors - Live Dashboard'
  }, [])
  return (
    <div className='p-6 min-h-screen text-text'>
      <div className='p-4 mb-6 bg-white rounded-lg shadow-md'>
        <LiveDashboard />
      </div>
    </div>
  )
}

export default HomePage
