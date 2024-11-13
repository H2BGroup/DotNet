import React from 'react'
import { cn } from '../lib/utils'

interface TitleProps {
  title: string
  className?: string
}

const Title = ({ title, className }: TitleProps) => {
  return (
    <h1
      className={cn('text-2xl text-blue-600 font-semibold', className, {
        'text-primary': title === 'Home Page',
      })}
    >
      {title}
    </h1>
  )
}

export default Title
