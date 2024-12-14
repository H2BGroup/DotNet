import React from 'react'
import { Link } from 'react-router-dom'

interface NavigationProps {
  navObj: { href: string; label: string }[]
}

const Navigation = ({ navObj }: NavigationProps) => {
  return (
    <nav className='bg-background-900 p-6'>
      <ul className='flex space-x-9 justify-center'>
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
