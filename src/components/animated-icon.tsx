import { useRef } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'

export function AnimatedIcon() {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const svgRef = useRef<SVGSVGElement | null>(null)

  useGSAP(
    () => {
      gsap.set(svgRef.current, { opacity: 1 })

      const tl = gsap
        .timeline({ repeat: -1 })

        .fromTo(
          '.group1',
          { scale: 0.1, transformOrigin: '124 124' },
          { duration: 0.35, scale: 1, ease: 'expo.inOut' }
        )
        .to('.group1', { duration: 1.2, rotate: 15, ease: 'none' }, 0.1)
        .to(
          '.group1 image',
          {
            scale: (i) => [0.4, 0.2, 0.3][i],
            x: (i) => [0, 135, 100][i],
            y: (i) => [90, 24, 124][i],
            ease: 'back',
          },
          0.4
        )
        .to('.group1 image', { duration: 0.01, opacity: 0, stagger: 0.06 }, 1.1)
        .fromTo(
          '.group3',
          { transformOrigin: '124 124', rotate: -90 },
          { duration: 0.9, rotate: 0, ease: 'expo' },
          2.6
        )
        .fromTo(
          '#g3_mask rect',
          {
            transformOrigin: (i) => ['0 124', '124 0', '124 124', '248 124'][i],
            scale: 0,
          },
          { duration: 0.4, scale: 1, ease: 'expo', stagger: -0.03 },
          1.2
        )
        .to('.group3', { duration: 0.01, scale: 0 }, 2.3)

        .from('.group4 image', { duration: 0.01, opacity: 0 }, 2.4)
        .fromTo(
          '.group4',
          { transformOrigin: '83 124', rotate: 15, scale: 0.2 },
          { duration: 0.5, rotate: 0, scale: 0.85, ease: 'bounce' },
          2.4
        )
        .to('.group4 image', { duration: 0.01, opacity: 0 }, 3.3)

      tl.play()
    },
    { scope: containerRef }
  )

  return (
    <div ref={containerRef} className=''>
      <svg
        ref={svgRef}
        className='opacity-0 size-10'
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 248 248'
      >
        <g className='group1'>
          <image href='https://assets.codepen.io/16327/flair-2.png' />
          <image href='https://assets.codepen.io/16327/flair-2.png' />
          <image href='https://assets.codepen.io/16327/flair-2.png' />
        </g>

        <g className='group3'>
          <image
            href='https://assets.codepen.io/16327/flair-4.png'
            mask='url(#g3_mask)'
          />
        </g>
        <mask id='g3_mask' fill='#fff'>
          <rect x='0' y='0' width='124' height='124' />
          <rect x='124' y='0' width='124' height='124' />
          <rect x='0' y='124' width='124' height='124' />
          <rect x='124' y='124' width='124' height='124' />
        </mask>

        <g className='group4'>
          <image href='https://assets.codepen.io/16327/flair-5.png' x='70' />
        </g>
      </svg>
    </div>
  )
}
