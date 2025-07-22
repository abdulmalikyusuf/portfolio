import { useEffect, useRef, useCallback, CSSProperties } from 'react'
import { animated, useSpring, SpringValue, useTrail } from '@react-spring/web'
import {
  useSpring as useSpringMotion,
  useAnimate,
  useVelocity,
  useCycle,
} from 'motion/react'
import cn from 'clsx'
import gsap from 'gsap'
import DrawSVGPlugin from 'gsap/DrawSVGPlugin'
import { useGSAP } from '@gsap/react'

import data from './data'
import useMainStore from '@/utils/store'
import { clamp } from '@/utils/calc'

gsap.registerPlugin(DrawSVGPlugin)

const SLIDE_WIDTH_RATIO = 0.6
const SLIDE_PADDING_RATIO = 0.1

function Slides() {
  const { mouseStatus, mouseDownPos, activeSlideIndex, setActiveSlideIndex } =
    useMainStore()
  const mouseStatusRef = useRef(mouseStatus)
  const mouseDownPosRef = useRef(mouseDownPos)
  const activeSlideIndexRef = useRef(activeSlideIndex)

  const containerRef = useRef<HTMLDivElement>(null)
  const sliderRef = useRef<HTMLDivElement>(null)
  const initialScrollLeft = useRef(0)

  const { contextSafe } = useGSAP({ scope: containerRef.current! })
  const [scope, animate] = useAnimate()

  let enterTween: gsap.core.Tween | null = null
  let leaveTween: gsap.core.Tween | null = null

  const width = containerRef.current
    ? containerRef.current?.getBoundingClientRect().width
    : window.innerWidth
  const minScrollLeft = width * SLIDE_PADDING_RATIO

  const { showSlide } = useSpring({
    showSlide: mouseStatus === 'mousedown' ? 1 : 0,
  })

  const onMouseMove = (event: PointerEvent) => {
    if (mouseStatusRef.current === 'mousedown') {
      const x = event.clientX
      const amountToScroll =
        initialScrollLeft.current - (x - mouseDownPosRef.current.x) * 2
      if (sliderRef.current) sliderRef.current.scrollLeft = amountToScroll

      const slideWidth = width * SLIDE_WIDTH_RATIO

      const currentActiveSlideIndex = clamp(
        Math.floor(amountToScroll / slideWidth) +
          (amountToScroll % slideWidth > slideWidth * 0.5 ? 1 : 0),
        0,
        data.length - 1
      )

      if (currentActiveSlideIndex !== activeSlideIndexRef.current) {
        setActiveSlideIndex(currentActiveSlideIndex)
      }
    }
  }

  const snapToCurrenActiveSlide = useCallback(() => {
    const slideWidth = width * SLIDE_WIDTH_RATIO
    if (sliderRef.current)
      sliderRef.current.scrollLeft =
        minScrollLeft + activeSlideIndexRef.current * slideWidth
  }, [minScrollLeft, activeSlideIndexRef])

  useEffect(() => {
    if (mouseStatus === 'mousedown') {
      if (sliderRef.current) initialScrollLeft.current = sliderRef.current.scrollLeft
    } else if (mouseStatus === 'mouseup') {
      snapToCurrenActiveSlide()
    }

    mouseStatusRef.current = mouseStatus
    mouseDownPosRef.current = mouseDownPos
  }, [mouseStatus, mouseDownPos, snapToCurrenActiveSlide])

  useEffect(() => {
    activeSlideIndexRef.current = activeSlideIndex
  }, [activeSlideIndex])

  useEffect(() => {
    if (!containerRef.current) return
    containerRef.current.addEventListener('pointermove', onMouseMove)

    return () => {
      if (containerRef.current)
        containerRef.current.removeEventListener('pointermove', onMouseMove)
    }
  }, [containerRef.current])

  /**
   * Render slides
   */

  const handlePointerEnter = contextSafe(() => {
    if ((enterTween && enterTween.isActive()) || mouseStatusRef.current === 'mousedown')
      return
    if (leaveTween && leaveTween.isActive()) leaveTween.kill()
    const activeSlide = containerRef.current?.querySelector<HTMLDivElement>(
      '[data-slide-active="true"]'
    )
    if (!activeSlide) return
    const svg = activeSlide.querySelector('svg')
    if (!svg) return
    const paths = svg.querySelectorAll('path')

    gsap.set(paths, { drawSVG: '0%' })
    gsap.set(svg, { display: 'block' })
    enterTween = gsap.to(paths, {
      drawSVG: '100%',
      duration: 0.5,
      ease: 'power2.inOut',
      onComplete: () => {
        enterTween = null
      },
    })
  })
  const handlePointerLeave = contextSafe(() => {
    const activeSlide = containerRef.current?.querySelector<HTMLDivElement>(
      '[data-slide-active="true"]'
    )
    if (!activeSlide) return
    const svg = activeSlide.querySelector('svg')
    if (!svg) return
    const paths = svg.querySelectorAll('path')
    const playOut = () => {
      if (leaveTween && leaveTween.isActive()) return
      enterTween = gsap.to(paths, {
        duration: 0.5,
        drawSVG: '100% 100%',
        ease: 'power2.inOut',
        onComplete: () => {
          leaveTween = null
          gsap.set(svg, { display: 'none' })
        },
      })
    }
    if (enterTween && enterTween.isActive()) {
      enterTween.eventCallback('onComplete', playOut)
    } else {
      playOut()
    }
  })

  const getDescriptionStyle = (index: number) =>
    index === activeSlideIndexRef.current
      ? {
          opacity: showSlide.to((value) => 1 - value),
          transform: showSlide.to((value) => `translateX(-${value * 10}%)`),
        }
      : { opacity: 0 }

  const renderData = data.map((entry, index) => (
    <animated.div
      key={`slide-${index}`}
      data-slide-active={index === activeSlideIndex}
      className='slide w-[60vw] grow-0 shrink-0 basis-[60vw] text-white pr-[10vw] whitespace-break-spaces'
      style={
        index !== activeSlideIndexRef.current
          ? {
              opacity: showSlide as unknown as SpringValue<number>,
              transform: showSlide.to(
                (value) => `translateX(${(1 - value) * 10}%)`
              ) as unknown as SpringValue<string>,
            }
          : ({} as CSSProperties)
      }
    >
      <div className='py-2 px-4 lg:p-8 relative max-w-[600px]'>
        <div className='text-xs lg:text-sm leading-none mb-1 lg:mb-2 font-roboto !font-light max-w-96'>
          {entry.location}
        </div>
        <a
          href={entry.url}
          target='_blank'
          rel='noopener noreferrer'
          onPointerEnter={handlePointerEnter}
          onPointerLeave={handlePointerLeave}
          onPointerDown={(e) => {
            e.stopPropagation()
          }}
          className={cn(
            'flex gap-2 mb-2 font-medium text-xl lg:font-bold lg:text-[2.5rem] lg:leading-none lg:mb-4 [word-break:break-word] font-anton tracking-wide',
            index === activeSlideIndex && 'text-primary'
          )}
        >
          {entry.name}
          <svg
            data-name='open_link'
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
            className='size-4 lg:size-6 xl:size-10 hidden'
          >
            <path d='M15 3h6v6' />
            <path d='M10 14 21 3' />
            <path d='M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6' />
          </svg>
        </a>
        {/* Slide Description */}
        <animated.div
          className='max-lg:hidden text-xs'
          style={getDescriptionStyle(index)}
        >
          {entry.description}
        </animated.div>
        {/* Slide Background */}
        <animated.div
          className='absolute size-full z-[-1] top-0 left-0 bg-black/50'
          style={getDescriptionStyle(index)}
        />
        {/* Slide Index */}
        <animated.div
          className='absolute left-4 top-0 text-5xl opacity-30'
          style={
            mouseStatusRef.current === 'mousedown'
              ? {
                  color:
                    index === activeSlideIndex ? 'var(--color-primary)' : 'currentColor',
                  opacity: showSlide.to((value) => value * 0.3),
                  transform: showSlide.to((value) => `translateX(-${value * 10}%)`),
                }
              : { opacity: 0 }
          }
        >
          {('0' + (index + 1)).slice(-2)}
        </animated.div>
      </div>
    </animated.div>
  ))

  return (
    <animated.div
      className='absolute inset-0 overflow-hidden flex items-end'
      ref={containerRef}
      style={{
        touchAction: 'none',
        background: showSlide.to((value) => `rgba(0, 0, 0, ${value * 0.3})`),
      }}
    >
      <div className='absolute top-0 inset-x-0 flex justify-between p-4 lg:py-8 lg:px-10'>
        <ul className='grid grid-cols-[repeat(auto-fit,1fr)]'>
          <li className='rounded-full bg-white/50 text-sm size-6 font-medium text-primary inline-flex justify-center items-center select-none'>
            0{activeSlideIndex + 1}
          </li>
        </ul>
        <p className='text-white text-[10px] lg:text-sm select-none'>
          Hold & Drag to Navigate
        </p>
      </div>
      <div
        ref={sliderRef}
        className='select-none z-[999] overflow-auto lg:pt-8 lg:mb-8 [&::-webkit-scrollbar]:hidden pt-4 mb-4'
      >
        <div className='flex whitespace-nowrap overflow-visible before:block before:w-[20vw] before:grow-0 before:shrink-0 before:basis-[20vw] after:block after:w-[40vw] after:grow-0 after:shrink-0 after:basis-[40vw]'>
          {renderData}
        </div>
      </div>
    </animated.div>
  )
}

export default Slides
