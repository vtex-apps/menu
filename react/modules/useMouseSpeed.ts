import { useEffect } from 'react'

let listenerCount = 0
let lastMousePosition: { x: number; y: number } | null = null
let lastMouseTimestamp = 0
let mouseSpeed = 0

const handleMouseMove = (e: MouseEvent) => {
  const currentPosition = { x: e.pageX, y: e.pageY }
  if (lastMousePosition) {
    const now = Date.now()
    const distance = Math.sqrt(
      (currentPosition.x - lastMousePosition.x) ** 2 +
        (currentPosition.y - lastMousePosition.y) ** 2
    )
    // gives us speed in pixels/second
    const interval = now - lastMouseTimestamp
    mouseSpeed = Math.round((distance / interval) * 1000)
    lastMouseTimestamp = now
  }

  lastMousePosition = currentPosition
}

export const useMouseSpeed = () => {
  useEffect(() => {
    if (listenerCount === 0) {
      window.addEventListener('mousemove', handleMouseMove)
    }

    listenerCount += 1

    return () => {
      listenerCount -= 1

      if (listenerCount === 0) {
        window.removeEventListener('mousemove', handleMouseMove)
      }
    }
  })

  return {
    // Can return NaN for tiny variations
    getMouseSpeed: () => mouseSpeed || 0,
  }
}
