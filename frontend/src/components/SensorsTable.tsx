import React from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import axios from 'axios'
import { useQuery } from 'react-query'

type SensorType = 'THERMOMETER' | 'BAROMETER' | 'POTENTIOMETER' | 'PARKING'

interface Sensor {
  id: string
  type: SensorType
  name: string
  unit: string
}

const SensorsTable = () => {
  const { data: sensors, isLoading } = useQuery('sensors', async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/api/Sensor`
    )
    return response.data as Sensor[]
  })

  if (isLoading) {
    return (
      <div className='flex justify-center items-center h-64'>
        <span className='text-lg text-gray-600'>Loading...</span>
      </div>
    )
  }

  return (
    <TableContainer className='rounded-lg shadow-lg border border-gray-200 bg-white'>
      <Table aria-label='customized table' className='w-full text-sm text-left'>
        <TableHead className='bg-gray-100'>
          <TableRow>
            <TableCell className='font-bold text-gray-700'>
              Sensor Name
            </TableCell>
            <TableCell align='right' className='font-bold text-gray-700'>
              ID
            </TableCell>
            <TableCell align='right' className='font-bold text-gray-700'>
              Type
            </TableCell>
            <TableCell align='right' className='font-bold text-gray-700'>
              Unit
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sensors?.map((sensor) => (
            <TableRow
              key={sensor.id}
              className='hover:bg-gray-50 transition duration-150'
            >
              <TableCell className='py-3 px-4 text-gray-600'>
                {sensor.name}
              </TableCell>
              <TableCell align='right' className='py-3 px-4 text-gray-600'>
                {sensor.id}
              </TableCell>
              <TableCell align='right' className='py-3 px-4 text-gray-600'>
                {sensor.type}
              </TableCell>
              <TableCell align='right' className='py-3 px-4 text-gray-600'>
                {sensor.unit}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default SensorsTable
