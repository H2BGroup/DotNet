import React from 'react'
import SensorsTable from '../components/SensorsTable'
import { Typography } from '@mui/material'

const SensorsPage = () => {
  return (
    <div className='p-6 bg-gray-100 min-h-screen text-gray-800'>
      <div className='p-4 mb-6 bg-white rounded-lg shadow-md'>
        <Typography variant='h6' className='mb-4 font-semibold text-gray-700'>
          Sensors
        </Typography>
        <div className='mx-auto'>
          <SensorsTable />
        </div>
      </div>
    </div>
  )
}

export default SensorsPage
