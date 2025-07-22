import { Suspense, useRef, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'

import { Plane, PLANE_OFFSET } from './components/Plane'
import Slides from './components/Slides'
import useMainStore from '@/utils/store'

export function ProjectViews() {
  const ref = useRef<HTMLDivElement>(null)
  const { setMouseStatus, setMouseDownPos } = useMainStore()

  const onPointerDown = (event: PointerEvent) => {
    event.stopPropagation()
    setMouseStatus('mousedown')
    const x = event.clientX
    const y = event.clientY
    setMouseDownPos({ x, y })
  }

  const onPointerUp = (event: PointerEvent) => {
    setMouseStatus('mouseup')
  }

  useEffect(() => {
    if (!ref.current) return
    ref.current.addEventListener('pointerdown', onPointerDown)
    ref.current.addEventListener('pointerup', onPointerUp)
    ref.current.addEventListener('pointerleave', onPointerUp)
    ref.current.addEventListener('pointercancel', onPointerUp)

    return () => {
      if (ref.current) {
        ref.current.removeEventListener('pointerdown', onPointerDown)
        ref.current.removeEventListener('pointerup', onPointerUp)
        ref.current.removeEventListener('pointerleave', onPointerUp)
        ref.current.removeEventListener('pointercancel', onPointerUp)
      }
    }
  }, [])

  return (
    <div ref={ref} className='size-full touch-none'>
      <Canvas
        camera={{
          position: [0, 0, PLANE_OFFSET],
        }}
        gl={{
          alpha: true,
        }}
      >
        <Suspense fallback={null}>
          <Plane />
        </Suspense>
      </Canvas>
      <Slides />
    </div>
  )
}
