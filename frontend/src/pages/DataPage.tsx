import React, { useCallback, useEffect } from 'react'
import qs from 'qs'
import { useQuery } from 'react-query'
import axios from 'axios'
import Filters from '../components/Filters'
import EnhancedTable from '../components/DataTable'

export interface Measure {
  id: string
  sensor_id: string
  value: number
  timestamp: string
}

const MyComponent = () => {
  useEffect(() => {
    document.title = 'Car Sensors - Data'
  }, [])
  const [order, setOrder] = React.useState<'asc' | 'desc'>('asc')
  const [orderBy, setOrderBy] = React.useState<keyof Measure>('timestamp')
  const [filters, setFilters] = React.useState<{
    sensor_id?: string[]
    sensor_type?: number[]
    start_date?: string
    end_date?: string
  }>({})

  const {
    data: sensors,
    isLoading,
    isError,
    refetch,
  } = useQuery(
    ['sensors', order, orderBy, filters],
    async () => {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/Measure`,
        {
          params: {
            sort_order: order,
            sort_field: orderBy,
            start_date: filters.start_date,
            end_date: filters.end_date,
            sensor_id: filters.sensor_id,
            sensor_type: filters.sensor_type,
          },
          paramsSerializer: (params) => {
            return qs.stringify(params, { arrayFormat: 'repeat' })
          },
        }
      )
      return response.data as Measure[]
    },
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      enabled: !!filters,
    }
  )

  const handleRefetch = useCallback(() => {
    refetch()
  }, [refetch])

  const handleFilterChange = useCallback(
    (
      newFilters: {
        sensor_id?: string[]
        sensor_type?: number[]
        start_date?: string
        end_date?: string
      },
      action: 'search' | 'clear' = 'search'
    ) => {
      setFilters((prevFilters) => ({ ...prevFilters, ...newFilters }))
      if (
        action === 'search' &&
        JSON.stringify(filters) === JSON.stringify(newFilters)
      ) {
        console.log('triggering refetch')
        handleRefetch()
      }
    },
    [setFilters, handleRefetch, filters]
  )

  const handleSortChange = (
    newOrder: 'asc' | 'desc',
    newOrderBy: keyof Measure
  ) => {
    setOrder(newOrder)
    setOrderBy(newOrderBy)
  }

  return (
    <div className='p-6 min-h-screen text-text'>
      <Filters onChange={handleFilterChange} />
      <EnhancedTable
        rows={sensors || []}
        order={order}
        orderBy={orderBy}
        onSortChange={handleSortChange}
      />
    </div>
  )
}

export default MyComponent
