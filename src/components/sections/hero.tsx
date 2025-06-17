import { useRef } from 'react'
import { gsap } from 'gsap'
import { SplitText } from 'gsap/SplitText' // Make sure you have SplitText
import { useGSAP } from '@gsap/react'

import { useFontsReady } from '@/hooks/use-font-loaded'

gsap.registerPlugin(SplitText)

export function HeroSection() {
  const containerRef = useRef(null)
  const textRef = useRef(null)
  const { isFontsReady } = useFontsReady()

  useGSAP(
    () => {
      if (isFontsReady && textRef.current) {
        // Ensure SplitText runs only after fonts are loaded
        const split = new SplitText(textRef.current, {
          type: 'lines',
          linesClass: 'split-line',
        })

        // Limit to a maximum of two lines
        // if (split.lines.length > 2) {
        //   for (let i = 2; i < split.lines.length; i++) {
        //     gsap.set(split.lines[i], { display: 'none' })
        //   }
        // }

        // Optional: Animate the first two lines
        const linesToAnimate = split.lines.slice(0, 2)
        if (linesToAnimate.length > 0) {
          gsap.from(linesToAnimate, {
            opacity: 0,
            y: 20,
            duration: 0.5,
            stagger: 0.2,
            delay: 0.2, // Small delay to ensure rendering after split
          })
        }

        // It's good practice to return a cleanup function from useGSAP
        // to revert SplitText when the component unmounts or dependencies change.
        return () => {
          if (split && typeof split.revert === 'function') {
            split.revert()
          }
        }
      }
    },
    { dependencies: [isFontsReady], scope: containerRef } // Re-run when fontsLoaded changes
  )

  return (
    <section className='relative overflow-hidden mb-20'>
      <svg
        id='banner-arrow-svg'
        width='376'
        height='111'
        viewBox='0 0 376 111'
        fill='transparent'
        xmlns='http://www.w3.org/2000/svg'
        className='absolute bottom-20 left-1/2 -translate-x-1/2 z-0'
        style={{
          opacity: 1,
          visibility: 'inherit',
          fill: 'rgba(255, 255, 255, 0.03)',
          translate: 'none',
          rotate: 'none',
          scale: 'none',
          transform: 'translate3d(-188px, 283.573px, 0px)',
        }}
      >
        <path
          className='svg-arrow svg-arrow-1'
          d='M1 1V39.9286L188 110V70.6822L1 1Z'
          stroke='#2C2C2C'
          style={{ strokeDashoffset: 0, strokeDasharray: 477.505 }}
        ></path>
        <path
          className='svg-arrow svg-arrow-2'
          d='M375 1V39.9286L188 110V70.6822L375 1Z'
          stroke='#2C2C2C'
          style={{ strokeDashoffset: 0, strokeDasharray: 477.505 }}
        ></path>
      </svg>
      <div className='container md:h-[100svh] min-h-[530px] max-md:pt-20 max-md:pb-10 flex justify-between items-center max-md:flex-col gap-y-10'>
        <div
          ref={containerRef}
          className='max-md:grow max-md:flex flex-col justify-center items-start max-w-2xl'
        >
          <h1
            ref={textRef}
            style={{ visibility: isFontsReady ? 'visible' : 'hidden' }}
            className='banner-title slide-up-and-fade leading-[.95] text-6xl sm:text-[80px] font-opti text-primary text-balance'
          >
            BRINGING DIGITAL IDEAS TO LIFE
          </h1>
          <p className='banner-description slide-up-and-fade mt-6 text-lg text-secondary max-w-[544px]'>
            I have a passion for{' '}
            <span className='font-medium'>fast, accessible, and visually stunning</span>{' '}
            web experiences. For me, software development is about
            <span className='font-medium'>solving problems elegantly</span>
            —whether through pixel-perfect UIs, zero-JS bloat, or seamless animations.
          </p>
          <a
            href='#projects'
            className='group h-12 px-8 inline-flex justify-center items-center gap-2 text-lg uppercase font-anton tracking-widest outline-none transition-colors relative overflow-hidden bg-primary text-primary-foreground hover:bg-primary-hover mt-9 banner-button slide-up-and-fade'
          >
            <span className='absolute top-[200%] inset-0 h-full bg-white rounded-full [50%] group-hover:top-0 transition-all duration-500 scale-150'></span>
            <span className='z-[1]'>View my work</span>
          </a>
        </div>
        <div className='md:absolute bottom-[10%] right-[4%] grid grid-cols-3 md:grid-cols-1 gap-4 md:gap-8 text-center md:text-right'>
          <div className='slide-up-and-fade'>
            <h5 className='text-3xl sm:text-4xl font-anton text-primary mb-1.5'>4+</h5>
            <p className='text-muted-foreground'>Years of Experience</p>
          </div>
          <div className='slide-up-and-fade'>
            <h5 className='text-3xl sm:text-4xl font-anton text-primary mb-1.5'>9+</h5>
            <p className='text-muted-foreground'>Completed Projects</p>
          </div>
          <div className='slide-up-and-fade'>
            <h5 className='text-3xl sm:text-4xl font-anton text-primary mb-1.5'>10+</h5>
            <p className='text-muted-foreground'>Technologies</p>
          </div>
        </div>
      </div>
    </section>
  )
}
