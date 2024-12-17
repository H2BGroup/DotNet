import React, { useRef, useState } from 'react'

const PoliceChase = () => {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [carVisible, setCarVisible] = useState(false)

  const handleClick = () => {
    if (carVisible) return
    setCarVisible((prev) => !prev)
    if (audioRef.current) {
      if (audioRef.current.paused) {
        audioRef.current.currentTime = 0
        audioRef.current.volume = 0.2
        audioRef.current.play().catch(console.error)
      }
    }
  }

  const handleAnimationEnd = () => {
    setCarVisible(false)
  }

  return (
    <div
      className={`relative z-10 ${!carVisible ? 'cursor-pointer' : ''}`}
      onClick={handleClick}
    >
      <img
        src='/car.png'
        alt='Car'
        className={`w-12 h-12 ${
          carVisible ? 'animate-moveCar' : 'animate-moveCarIn'
        }`}
      />
      {carVisible && (
        <div
          className='absolute top-0 left-[-180px] animate-movePoliceCar'
          onAnimationEnd={handleAnimationEnd}
        >
          <img src='/police-car.svg' alt='Police Car' className='w-12 h-12' />
        </div>
      )}
      <audio ref={audioRef} src='/ijoijo.mp3' />
    </div>
  )
}

export default PoliceChase
