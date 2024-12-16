import React, { useState } from 'react'
import { FaMinus } from 'react-icons/fa'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import SearchIcon from '@mui/icons-material/Search'
import ClearIcon from '@mui/icons-material/Clear'
import MenuItem from '@mui/material/MenuItem'
import {
  Box,
  Chip,
  FormControl,
  Typography,
  OutlinedInput,
} from '@mui/material'
import { Dayjs } from 'dayjs'
import { DateTimePicker } from '@mui/x-date-pickers'

const sensorTypes = [
  { label: 'THERMOMETER', value: 0 },
  { label: 'BAROMETER', value: 1 },
  { label: 'POTENTIOMETER', value: 2 },
  { label: 'PARKING', value: 3 },
]
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

interface FiltersProps {
  onChange: (
    filters: {
      sensor_id?: string[]
      sensor_type?: number[]
      start_date?: string
      end_date?: string
    },
    action?: 'search' | 'clear'
  ) => void
}

const Filters = ({ onChange }: FiltersProps) => {
  const [selectedTypes, setSelectedTypes] = useState<number[]>([])
  const [selectedSensorId, setSelectedSensorId] = useState<string[]>([])
  const [startDate, setStartDate] = useState<Dayjs | null>(null)
  const [endDate, setEndDate] = useState<Dayjs | null>(null)

  const handleTypeChange = (event: SelectChangeEvent<number[]>) => {
    const { value } = event.target
    const selected =
      typeof value === 'string' ? value.split(',').map(Number) : value
    setSelectedTypes(selected)
  }

  const handleSensorIdChange = (
    event: SelectChangeEvent<typeof selectedSensorId>
  ) => {
    const { value } = event.target
    setSelectedSensorId(typeof value === 'string' ? value.split(',') : value)
  }

  const handleSearch = () => {
    const start_date = startDate?.format('YYYY-MM-DDTHH:mm:ss[Z]')
    const end_date = endDate?.format('YYYY-MM-DDTHH:mm:ss[Z]')
    onChange({
      sensor_id: selectedSensorId.length ? selectedSensorId : undefined,
      sensor_type: selectedTypes.length ? selectedTypes : undefined,
      start_date,
      end_date,
    })
  }

  const handleClear = () => {
    setSelectedTypes([])
    setSelectedSensorId([])
    setStartDate(null)
    setEndDate(null)
    onChange({}, 'clear')
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
        <div className='flex flex-wrap gap-6 flex-col items-start w-full'>
          <div className='w-full min-w-[300px]'>
            <Typography variant='subtitle2' className='mb-1 text-gray-600'>
              Date Range
            </Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <div className='flex flex-col md:flex-row items-center gap-4 pt-1'>
                <DateTimePicker
                  label='Start Date'
                  value={startDate}
                  onChange={(newValue) => setStartDate(newValue)}
                  className='w-full md:w-1/2'
                />
                <FaMinus className='text-gray-500 text-sm hidden md:block' />
                <DateTimePicker
                  label='End Date'
                  value={endDate}
                  onChange={(newValue) => setEndDate(newValue)}
                  className='w-full md:w-1/2'
                />
              </div>
            </LocalizationProvider>
          </div>
        </div>

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
                    <Chip key={value} label={sensorTypes[value].label} />
                  ))}
                </Box>
              )}
              sx={{
                maxHeight: 250,
                overflowY: 'auto',
              }}
            >
              {sensorTypes.map((type) => (
                <MenuItem key={type.value} value={type.value}>
                  {type.label}
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

      <Box className='flex gap-4 mt-4 w-full'>
        <button
          onClick={handleSearch}
          className='flex items-center justify-center w-1/2 bg-blue-600 text-white py-3 rounded-md shadow-md hover:bg-blue-700 transition-all'
        >
          <SearchIcon className='mr-2' />
          Search
        </button>
        <button
          onClick={handleClear}
          className='flex items-center justify-center w-1/2 border border-gray-300 text-gray-700 py-3 rounded-md shadow-md hover:bg-gray-100 transition-all'
        >
          <ClearIcon className='mr-2' />
          Clear
        </button>
      </Box>
    </div>
  )
}

export default Filters
