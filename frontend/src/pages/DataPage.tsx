import React from 'react'
import EnhancedTable from '../components/Fancy'
import Filters from '../components/Filters'

const DataPage = () => {
  return (
    <div className='p-6  min-h-screen text-text'>
      <Filters />
      <EnhancedTable />
    </div>
  )
}

export default DataPage
