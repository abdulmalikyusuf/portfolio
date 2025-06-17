//COPIED From: github.com/Tajmirul/portfolio-2.0/blob/main/components/Preloader.tsx

'use client'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import React, { useRef } from 'react'

gsap.registerPlugin(useGSAP)

export const Preloader = ({
  onComplete,
}: {
  onComplete: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  const preloaderRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const tl = gsap.timeline({
        defaults: {
          ease: 'power1.inOut',
        },
        onComplete: () => onComplete(true),
      })

      tl.to('.name-text span', {
        y: 0,
        stagger: 0.05,
        duration: 0.2,
      })

      tl.to('.preloader-item', {
        delay: 1,
        y: '100%',
        duration: 0.5,
        stagger: 0.1,
      })
        .to('.name-text span', { autoAlpha: 0 }, '<0.5')
        .to(
          preloaderRef.current,
          {
            autoAlpha: 0,
          },
          '<1'
        )
      console.log('Preloader animation completed', tl.totalDuration())
    },
    { scope: preloaderRef }
  )

  return (
    <div className='fixed inset-0 z-[6] flex' ref={preloaderRef}>
      <div className='preloader-item h-full w-[10%] bg-secondary'></div>
      <div className='preloader-item h-full w-[10%] bg-secondary'></div>
      <div className='preloader-item h-full w-[10%] bg-secondary'></div>
      <div className='preloader-item h-full w-[10%] bg-secondary'></div>
      <div className='preloader-item h-full w-[10%] bg-secondary'></div>
      <div className='preloader-item h-full w-[10%] bg-secondary'></div>
      <div className='preloader-item h-full w-[10%] bg-secondary'></div>
      <div className='preloader-item h-full w-[10%] bg-secondary'></div>
      <div className='preloader-item h-full w-[10%] bg-secondary'></div>
      <div className='preloader-item h-full w-[10%] bg-secondary'></div>

      <p className='name-text flex text-[20vw] lg:text-[200px] font-anton text-primary text-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 leading-none overflow-hidden'>
        <span className='inline-block translate-y-full'>L</span>
        <span className='inline-block translate-y-full'>O</span>
        <span className='inline-block translate-y-full'>A</span>
        <span className='inline-block translate-y-full'>D</span>
        <span className='inline-block translate-y-full'>I</span>
        <span className='inline-block translate-y-full'>N</span>
        <span className='inline-block translate-y-full'>G</span>
      </p>
    </div>
  )
}
