import React from 'react'
import { Link } from 'react-router-dom'
import PoliceChase from './PoliceChase'

interface NavigationProps {
  navObj: { href: string; label: string }[]
}

const Navigation = ({ navObj }: NavigationProps) => {
  return (
    <nav className='bg-background-900 p-6 flex items-center overflow-hidden'>
      <PoliceChase />
      <ul className='flex space-x-9 flex-grow justify-center md:transform md:-translate-x-6 z-0'>
        {navObj.map((link) => (
          <li key={link.href}>
            <Link
              to={link.href}
              className='text-white hover:text-white/70 text-lg'
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default Navigation
