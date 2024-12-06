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
    const response = await axios.get('http://localhost:5029/api/Sensor')
    return response.data as Sensor[]
  })

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <TableContainer className=' rounded-lg shadow-lg border border-background-500'>
      <Table aria-label='customized table' className='w-full text-sm text-left'>
        <TableHead className='bg-background-800 text-text'>
          <TableRow className='!text-text'>
            <TableCell className='px-6 py-4 font-semibold !text-text'>
              Sensor Name
            </TableCell>
            <TableCell
              className='px-6 py-4 font-semibold !text-text'
              align='right'
            >
              ID
            </TableCell>
            <TableCell
              className='px-6 py-4 font-semibold !text-text'
              align='right'
            >
              Type
            </TableCell>
            <TableCell
              className='px-6 py-4 font-semibold !text-text'
              align='right'
            >
              Unit
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sensors?.map((sensor) => (
            <TableRow
              key={sensor.id}
              className='odd:bg-background-500 even:bg-background-600 hover:bg-background-400 transition-colors'
            >
              <TableCell className='px-6 py-4 !text-text'>
                {sensor.name}
              </TableCell>
              <TableCell className='px-6 py-4 !text-text' align='right'>
                {sensor.id}
              </TableCell>
              <TableCell className='px-6 py-4 !text-text' align='right'>
                {sensor.type}
              </TableCell>
              <TableCell className='px-6 py-4 !text-text' align='right'>
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
