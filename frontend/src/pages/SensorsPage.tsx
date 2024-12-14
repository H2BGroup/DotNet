import React from 'react'
import SensorsTable from '../components/SensorsTable'

const SensorsPage = () => {
  return (
    <div className='p-6 bg-gray-100 min-h-screen text-gray-800'>
      <h1 className='text-3xl font-bold text-info mb-6'>Sensors</h1>
      <div className='mx-auto'>
        <SensorsTable />
      </div>
    </div>
  )
}

export default SensorsPage
