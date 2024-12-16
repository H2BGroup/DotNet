import React, { useEffect, useState } from 'react'
import * as signalR from '@microsoft/signalr'
import { FaArrowUp, FaArrowDown, FaMinus, FaCircle } from 'react-icons/fa' // Add FaCircle for status icons
import { Typography } from '@mui/material'

interface Message {
  sensor_id: string
  last_measure: number
  average: number
}

const sensors = [
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

const LiveDashboard = () => {
  const [sensorData, setSensorData] = useState<
    Record<
      string,
      { last_measure: [number, number]; average: [number, number] }
    >
  >({})
  const [isConnected, setIsConnected] = useState<boolean>(false) // State for connection status

  useEffect(() => {
    const connection = new signalR.HubConnectionBuilder()
      .withUrl(`${process.env.REACT_APP_BACKEND_URL}/notifications`)
      .withAutomaticReconnect()
      .build()

    connection
      .start()
      .then(() => setIsConnected(true)) // Set to true when connection starts
      .catch((err) => {
        console.error('Connection failed: ', err)
        setIsConnected(false) // Set to false if connection fails
      })

    connection.on('ReceiveMessage', (message: Message) => {
      setSensorData((prev) => ({
        ...prev,
        [message.sensor_id]: {
          last_measure: [
            message.last_measure,
            prev[message.sensor_id]?.last_measure[0] ?? message.last_measure,
          ],
          average: [
            message.average,
            prev[message.sensor_id]?.average[0] ?? message.average,
          ],
        },
      }))
    })

    // Clean up on unmount
    return () => {
      connection.stop()
      setIsConnected(false) // Reset on cleanup
    }
  }, [])

  const getTrend = (
    current: number,
    previous: number
  ): 'up' | 'down' | 'stable' => {
    if (current > previous) return 'up'
    if (current < previous) return 'down'
    return 'stable'
  }

  const getFlashClass = (trend: 'up' | 'down' | 'stable'): string => {
    switch (trend) {
      case 'up':
        return 'animate-flash-green'
      case 'down':
        return 'animate-flash-red'
      default:
        return ''
    }
  }

  const getPercentageChange = (current: number, previous: number): string => {
    if (!previous) return '0%'
    const percentageChange = ((current - previous) / previous) * 100
    return `${percentageChange.toFixed(2)}%`
  }

  return (
    <>
      <Typography
        variant='h6'
        className='mb-4 font-semibold text-gray-700 flex items-center'
      >
        Live Dashboard
        {/* Show green dot if connected, red dot if not */}
        <FaCircle
          className={`ml-2 ${
            isConnected
              ? 'text-green-500 animate-blink'
              : 'text-red-500 animate-pulse'
          }  w-3 h-3 mb-2`}
        />
      </Typography>
      <div>
        <div
          className='grid grid-cols-1 sm:grid-cols-2 gap-4 lg:grid-cols-4'
          style={{ padding: '1rem' }}
        >
          {sensors.map((sensor_id) => {
            const data = sensorData[sensor_id]
            const noData = !data

            const displayValue = (value: number | undefined) =>
              value === undefined ? '-' : value.toFixed(2)

            return (
              <div
                key={sensor_id}
                className={`border border-gray-300 rounded-lg p-4 shadow-md flex flex-col items-center justify-between ${
                  noData
                    ? ''
                    : getFlashClass(
                        getTrend(data.last_measure[0], data.last_measure[1])
                      )
                }`}
              >
                <div className='text-lg font-bold text-gray-800 mb-4'>
                  {sensor_id}
                </div>

                <div className='flex justify-around w-full mb-4'>
                  <div className='flex flex-col items-center'>
                    <span className='text-xs text-gray-500'>Last Measure</span>
                    <div className='flex items-center'>
                      {!noData && (
                        <span className='text-lg font-bold'>
                          {displayValue(
                            noData ? undefined : data.last_measure[0]
                          )}
                        </span>
                      )}
                      {noData ? (
                        <FaMinus className='text-gray-500 text-sm' />
                      ) : getTrend(
                          data.last_measure[0],
                          data.last_measure[1]
                        ) === 'up' ? (
                        <FaArrowUp className='ml-2 text-green-600 text-sm' />
                      ) : getTrend(
                          data.last_measure[0],
                          data.last_measure[1]
                        ) === 'down' ? (
                        <FaArrowDown className='ml-2 text-red-600 text-sm' />
                      ) : (
                        <FaMinus className='ml-2 text-gray-500 text-sm' />
                      )}
                    </div>
                    <span className='text-sm text-gray-400'>
                      {noData
                        ? '0%'
                        : getPercentageChange(
                            data.last_measure[0],
                            data.last_measure[1]
                          )}
                    </span>
                  </div>

                  <div className='flex flex-col items-center'>
                    <span className='text-xs text-gray-500'>Average</span>
                    <div className='flex items-center'>
                      {!noData && (
                        <span className='text-lg font-bold'>
                          {displayValue(noData ? undefined : data.average[0])}
                        </span>
                      )}
                      {noData ? (
                        <FaMinus className='text-gray-500 text-sm' />
                      ) : getTrend(data.average[0], data.average[1]) ===
                        'up' ? (
                        <FaArrowUp className='ml-2 text-green-600 text-sm' />
                      ) : getTrend(data.average[0], data.average[1]) ===
                        'down' ? (
                        <FaArrowDown className='ml-2 text-red-600 text-sm' />
                      ) : (
                        <FaMinus className='ml-2 text-gray-500 text-sm' />
                      )}
                    </div>
                    <span className='text-sm text-gray-400'>
                      {noData
                        ? '0%'
                        : getPercentageChange(data.average[0], data.average[1])}
                    </span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default LiveDashboard
