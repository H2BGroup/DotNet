import React from 'react'
import SensorsTable from '../components/SensorsTable'

const SensorsPage = () => {
  return (
    <div className='p-6 bg-background-500 min-h-screen text-text'>
      <h1 className='text-3xl font-bold text-primary mb-6'>Sensors</h1>
      <SensorsTable />
    </div>
  )
}

export default SensorsPage
