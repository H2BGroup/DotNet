import React, { useState } from 'react'
import { Measure } from '../pages/DataPage'
import { Typography, Box, Chip } from '@mui/material'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'

interface VisualizationProps {
  items: Measure[]
}

const strokeColors = [
  '#8884d8',
  '#82ca9d',
  '#ffc658',
  '#ff7300',
  '#d6a5ff',
  '#00c49f',
  '#ffbb28',
  '#ff8042',
  '#f44336',
  '#9c27b0',
  '#2196f3',
  '#4caf50',
  '#ff5722',
  '#607d8b',
  '#3f51b5',
  '#8bc34a',
]

const Visualization = ({ items }: VisualizationProps) => {
  const uniqueSensorIds = Array.from(
    new Set(items.map((item) => item.sensor_id))
  ).sort()

  const [selectedSensorsIds, setSelectedSensorsIds] =
    useState<string[]>(uniqueSensorIds)

  const handleSensorToggle = (sensorId: string) => {
    setSelectedSensorsIds((prevSelected) => {
      if (prevSelected.includes(sensorId)) {
        return prevSelected.filter((id) => id !== sensorId)
      } else {
        return [...prevSelected, sensorId]
      }
    })
  }

  const filteredItems = selectedSensorsIds.map((sensorId) =>
    items.filter((item) => item.sensor_id === sensorId)
  )

  const sortedTimestamps = Array.from(
    new Set(
      filteredItems.flatMap((sensorData) =>
        sensorData.map((item) => item.timestamp)
      )
    )
  ).sort()

  const chartData = sortedTimestamps.map((timestamp) => {
    const row: any = { name: timestamp }
    selectedSensorsIds.forEach((sensorId, index) => {
      const sensorData = filteredItems[index]
      const sensorItem = sensorData.find((item) => item.timestamp === timestamp)
      if (sensorItem) {
        row[sensorId] = sensorItem.value
      } else {
        row[sensorId] = null
      }
    })
    return row
  })

  return (
    <div>
      <Typography
        sx={{ flex: '1 1 100%' }}
        variant='h6'
        component='div'
        className='font-semibold text-gray-700'
      >
        Visualization
      </Typography>

      <Box className='flex flex-wrap gap-2 my-4'>
        {uniqueSensorIds.map((sensorId) => (
          <Chip
            key={sensorId}
            label={sensorId}
            variant={
              selectedSensorsIds.includes(sensorId) ? 'filled' : 'outlined'
            }
            color={
              selectedSensorsIds.includes(sensorId) ? 'primary' : 'default'
            }
            onClick={() => handleSensorToggle(sensorId)}
            className={`${
              selectedSensorsIds.includes(sensorId)
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-transparent text-blue-600 border-blue-600'
            } border rounded-full px-4 py-1 text-sm font-medium cursor-pointer transition-all duration-300 ease-in-out hover:scale-110  shadow-md hover:shadow-lg`}
          />
        ))}
      </Box>

      <ResponsiveContainer width='100%' height={500}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis
            dataKey='name'
            tick={({ x, y, payload }) => (
              <g transform={`translate(${x},${y})`}>
                <text
                  x={0}
                  y={0}
                  dy={16}
                  textAnchor='end'
                  fill='#666'
                  className='text-xs'
                >
                  {new Date(payload.value).toLocaleString()}
                </text>
              </g>
            )}
          />
          <YAxis />
          <Tooltip />
          <Legend />
          {selectedSensorsIds.map((sensorId, index) => (
            <Line
              key={sensorId}
              type='monotone'
              dataKey={sensorId}
              name={sensorId}
              stroke={strokeColors[index % strokeColors.length]}
              activeDot={{ r: 8 }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default Visualization
