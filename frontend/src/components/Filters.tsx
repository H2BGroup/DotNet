import React from 'react'
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
  InputLabel,
  OutlinedInput,
} from '@mui/material'
const sensorTypes = ['THERMOMETER', 'BAROMETER', 'POTENTIOMETER', 'PARKING']

const Filters = () => {
  const [personName, setPersonName] = React.useState<string[]>([])

  const handleChange = (event: SelectChangeEvent<typeof personName>) => {
    const {
      target: { value },
    } = event
    setPersonName(typeof value === 'string' ? value.split(',') : value)
  }

  const dateRangeHander = (range: any) => {
    const [start, end] = range
    console.log(start?.toDate(), end?.toDate())
  }

  return (
    <div>
      <h1>Filters</h1>
      <div>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={['DateRangePicker']}>
            <DateRangePicker
              localeText={{ start: 'Start Date', end: 'End Date' }}
              sx={{
                color: 'white',
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'white',
                },
                '& .MuiOutlinedInput-input': {
                  color: 'white',
                },
                '& .MuiOutlinedInput-root': {
                  '&:hover fieldset': {
                    borderColor: 'white',
                  },
                  background: '#0e0e10',
                },
                '& .MuiInputLabel-root': {
                  color: 'white',
                },
              }}
              onChange={dateRangeHander}
            />
          </DemoContainer>
        </LocalizationProvider>
        <div>
          <FormControl
            sx={{
              m: 1,
              width: 300,
              '& .MuiInputLabel-root': {
                color: 'white',
                '&.Mui-focused': {
                  color: 'white',
                },
              },
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: 'white',
                },
                '&:hover fieldset': {
                  borderColor: 'white',
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'white',
                },
              },
            }}
          >
            <InputLabel id='demo-multiple-chip-label'>Sensor Type</InputLabel>
            <Select
              labelId='demo-multiple-chip-label'
              id='demo-multiple-chip'
              multiple
              value={personName}
              onChange={handleChange}
              input={
                <OutlinedInput id='select-multiple-chip' label='Sensor Type' />
              }
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip
                      key={value}
                      label={value}
                      sx={{
                        backgroundColor: '#2f2f31',
                        color: 'white',
                        fontWeight: 'bold',
                      }}
                    />
                  ))}
                </Box>
              )}
              sx={{
                '& .MuiSelect-icon': {
                  color: 'white',
                },
                '& .MuiSelect-select': {
                  backgroundColor: '#0e0e10',
                  color: 'white',
                },
              }}
            >
              {sensorTypes.map((name) => (
                <MenuItem key={name} value={name}>
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <Select>
          <MenuItem value='1'>1</MenuItem>
          <MenuItem value='2'>2</MenuItem>
          <MenuItem value='3'>3</MenuItem>
        </Select>
      </div>
    </div>
  )
}

export default Filters
