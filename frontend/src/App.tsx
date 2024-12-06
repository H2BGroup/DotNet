import React from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Route, Routes } from 'react-router-dom'
import { HomePage, NotFoundPage } from './pages'
import Layout from './components/Layout'
import SensorsPage from './pages/SensorsPage'
import DataPage from './pages/DataPage'

const queryClient = new QueryClient()

const navigationLinks = [
  { href: '/', label: 'Home' },
  { href: '/data', label: 'Gathered data' },
  { href: '/sensors', label: 'Sensors' },
]

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className='App'>
        <Layout navObj={navigationLinks}>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/data' element={<DataPage />} />
            <Route path='/sensors' element={<SensorsPage />} />
            <Route path='*' element={<NotFoundPage />} />
          </Routes>
        </Layout>
      </div>
    </QueryClientProvider>
  )
}

export default App
