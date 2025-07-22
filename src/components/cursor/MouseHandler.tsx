import { useEffect, useState, useCallback } from 'react'
import { useTrail, animated } from '@react-spring/web'
import cn from 'clsx'

const circleConfig = { mass: 5, tension: 800, friction: 100 }
const dotConfig = { tension: 1200, friction: 50 }
// const transform = (x: number, y: number) =>
//   `translate3d(${x}px, ${y}px, 0) translate3d(-50%,-50%, 0)`

export function MouseHandler() {
  const [initialized, setInitialized] = useState(false)
  const [circleTrail, setCircleTrail] = useTrail(2, () => ({
    xy: [0, 0],
    config: circleConfig,
  }))
  const [dotTrail, setDotTrail] = useTrail(2, () => ({
    xy: [0, 0],
    config: dotConfig,
  }))

  const transform = useCallback((x: number, y: number) => {
    return `translate3d(${x}px, ${y}px, 0) translate3d(-50%,-50%, 0)`
  }, [])

  const onPointerMove = (event: PointerEvent) => {
    if (!initialized) setInitialized(true)
    const x = event.clientX
    const y = event.clientY
    setCircleTrail.start({ xy: [x, y] })
    setDotTrail.start({ xy: [x, y] })
  }

  useEffect(() => {
    window.addEventListener('pointermove', onPointerMove)

    return () => {
      window.removeEventListener('pointermove', onPointerMove)
    }
  }, [])

  return (
    <>
      <animated.div
        className={cn(
          'hidden fixed rounded-full top-0 left-0 [transform:translateX(50%)_translateY(50%)] pointer-events-none z-[9999] border-2 border-primary size-12',
          initialized ? 'lg:block' : 'lg:!hidden'
        )}
        style={{
          transform: circleTrail[0].xy.to(transform),
        }}
      />
      <animated.div
        className={cn(
          'hidden fixed rounded-full top-0 left-0 [transform:translateX(50%)_translateY(50%)] pointer-events-none z-[9999] bg-primary size-2',
          initialized ? 'lg:block' : 'lg:!hidden'
        )}
        style={{
          transform: dotTrail[1].xy.to(transform),
        }}
      />
    </>
  )
}
