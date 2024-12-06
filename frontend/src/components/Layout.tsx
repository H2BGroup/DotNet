import React from 'react'
import Navigation from './Navigation'

interface LayoutProps {
  children: React.ReactNode
  navObj: { href: string; label: string }[]
}

const Layout = ({ children, navObj }: LayoutProps) => {
  return (
    <div className='min-h-screen min-w-screen'>
      <Navigation navObj={navObj} />
      <div className='mt-10 container mx-auto'>{children}</div>
    </div>
  )
}

export default Layout
