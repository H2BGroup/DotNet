import React, { useEffect } from 'react'

const NotFoundPage = () => {
    useEffect(() => {
      document.title = 'Car Sensors - Not Found'
    }, [])
  return (
    <div>Page Not Found</div>
  )
}

export default NotFoundPage