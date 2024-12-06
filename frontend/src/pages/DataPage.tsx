import React from 'react'
import EnhancedTable from '../components/Fancy'
import Filters from '../components/Filters'

const DataPage = () => {
  return (
    <div className='p-6 bg-background-500 min-h-screen text-text'>
      <Filters />
      <h1 className='text-3xl font-bold text-primary mb-6'>Data</h1>
      <EnhancedTable />
    </div>
  )
}

export default DataPage
