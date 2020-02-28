import { useMouseSpeed } from './useMouseSpeed'
import { useRef } from 'react'

// Max mouse speed in pixels/second to allow the debounced method to be called
const MAX_MOUSE_SPEED = 450
const DEBOUNCE_INTERVAL = 200

export const useMouseSpeedDebouncer = (
  fn: Function,
  {
    delay = DEBOUNCE_INTERVAL,
    maxSpeed = MAX_MOUSE_SPEED,
  }: { delay: number; maxSpeed: number }
) => {
  const timeout = useRef<number | null>(null)
  const { getMouseSpeed } = useMouseSpeed()

  return (...args: any[]) => {
    let lastSpeed: number | null = null

    if (timeout.current) {
      clearTimeout(timeout.current)
      timeout.current = null
    }

    timeout.current = setTimeout(function check() {
      const speed = getMouseSpeed()
      if (speed <= maxSpeed) {
        fn(...args)
      } else if (lastSpeed == null || lastSpeed !== speed) {
        timeout.current = setTimeout(check, delay)
      }
      lastSpeed = speed
    }, delay)
  }
}
