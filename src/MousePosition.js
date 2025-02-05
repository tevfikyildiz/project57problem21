import { useEffect, useState } from 'react'

export default function MousePosition() {
  const [position, setPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    if (typeof window === 'undefined') return 

    let isMounted = true

    function handleMove(e) {
      setPosition(prev => {
        if (!isMounted || (prev.x === e.clientX && prev.y === e.clientY)) return prev
        return { x: e.clientX, y: e.clientY }
      })
      console.log('Updating state')
    }

    window.addEventListener('pointermove', handleMove)

    return () => {
      isMounted = false
      window.removeEventListener('pointermove', handleMove)
      console.log('Unmounted')
    }
  }, [])

  return (
    <div className='space-y-5 relative'>
      <div>
        X position: <strong>{position.x.toFixed(2)}</strong>
      </div>
      <div>
        Y position: <strong>{position.y.toFixed(2)}</strong>
      </div>
      <div
        className="absolute bg-black text-white text-sm p-2 rounded-lg shadow-glow transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{ left: `${position.x}px`, top: `${position.y}px` }}
      >
        ({position.x.toFixed(2)}, {position.y.toFixed(2)})
      </div>
    </div>
  )
}
