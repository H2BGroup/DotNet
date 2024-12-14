import React, { useState } from 'react'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { LocalizationProvider } from '@mui/x-date-pickers-pro/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs'
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import {
  Box,
  Chip,
  FormControl,
  Typography,
  OutlinedInput,
} from '@mui/material'
import { Dayjs } from 'dayjs'

const sensorTypes = ['THERMOMETER', 'BAROMETER', 'POTENTIOMETER', 'PARKING']
const sensorIds = [
  't1',
  't2',
  't3',
  't4',
  'b1',
  'b2',
  'b3',
  'b4',
  'p1',
  'p2',
  'p3',
  'p4',
  'd1',
  'd2',
  'd3',
  'd4',
]

const Filters: React.FC = () => {
  const [selectedTypes, setSelectedTypes] = useState<string[]>([])
  const [selectedSensorId, setSelectedSensorId] = useState<string[]>([])
  const [dateRange, setDateRange] = useState<[Dayjs | null, Dayjs | null]>([
    null,
    null,
  ])

  const handleTypeChange = (event: SelectChangeEvent<typeof selectedTypes>) => {
    const { value } = event.target
    setSelectedTypes(typeof value === 'string' ? value.split(',') : value)
  }

  const handleSensorIdChange = (
    event: SelectChangeEvent<typeof selectedSensorId>
  ) => {
    const { value } = event.target
    setSelectedSensorId(typeof value === 'string' ? value.split(',') : value)
  }

  const handleDateRangeChange = (range: [Dayjs | null, Dayjs | null]) => {
    setDateRange(range)
    const [start, end] = range
    console.log(
      'Start Date:',
      start?.toISOString(),
      'End Date:',
      end?.toISOString()
    )
  }

  return (
    <div className='p-4 mb-6 bg-white rounded-lg shadow-md'>
      <Typography variant='h6' className='mb-4 font-semibold text-gray-700'>
        Filters
      </Typography>
      <Box
        className='flex flex-wrap gap-6'
        sx={{
          flexDirection: { xs: 'column', sm: 'column' },
          alignItems: 'flex-start',
        }}
      >
        <Box className='w-full' sx={{ minWidth: 300 }}>
          <Typography variant='subtitle2' className='mb-1 text-gray-600'>
            Date Range
          </Typography>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DateRangePicker']}>
              <DateRangePicker
                localeText={{ start: 'Start Date', end: 'End Date' }}
                onChange={handleDateRangeChange}
                value={dateRange}
                sx={{ width: '100%' }}
              />
            </DemoContainer>
          </LocalizationProvider>
        </Box>

        <Box className='w-full' sx={{ minWidth: 200 }}>
          <Typography variant='subtitle2' className='mb-1 text-gray-600'>
            Sensor Type
          </Typography>
          <FormControl fullWidth>
            <Select
              multiple
              value={selectedTypes}
              onChange={handleTypeChange}
              input={<OutlinedInput placeholder='Select sensor types' />}
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} />
                  ))}
                </Box>
              )}
              sx={{
                maxHeight: 250,
                overflowY: 'auto',
              }}
            >
              {sensorTypes.map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <Box className='w-full' sx={{ minWidth: 200 }}>
          <Typography variant='subtitle2' className='mb-1 text-gray-600'>
            Sensor ID
          </Typography>
          <FormControl fullWidth>
            <Select
              multiple
              value={selectedSensorId}
              onChange={handleSensorIdChange}
              input={<OutlinedInput placeholder='Select sensor ID' />}
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} />
                  ))}
                </Box>
              )}
              sx={{
                maxHeight: 250,
                overflowY: 'auto',
              }}
            >
              {sensorIds.map((id) => (
                <MenuItem key={id} value={id}>
                  {id}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Box>
    </div>
  )
}

export default Filters
