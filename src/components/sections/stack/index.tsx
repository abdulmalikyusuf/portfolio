import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import Javascript from '@/icons/javascript.svg'
import Typescript from '@/icons/TypeScript.svg'
import React from '@/icons/React.svg'
import NextJs from '@/icons/Next.js.svg'
import ThreeJs from '@/icons/Three.js.svg'
import GulpJs from '@/icons/Gulp.js.svg'
import Storybook from '@/icons/Storybook.svg'
import HTML5 from '@/icons/HTML5.svg'
import CSS3 from '@/icons/CSS3.svg'
import Sass from '@/icons/Sass.svg'
import Git from '@/icons/Git.svg'
import Redux from '@/icons/Redux.svg'
import Nodejs from '@/icons/Node.js.svg'
import DRF from '@/icons/DRF.svg'
import Docker from '@/icons/Docker.svg'
import TailwindCSS from '@/icons/TailwindCSS.svg'
import { AnimatedIcon } from '../../animated-icon'

gsap.registerPlugin(ScrollTrigger)

const stacks = {
  frontend: [
    { label: 'javascript', icon: Javascript },
    { label: 'typescript', icon: Typescript },
    { label: 'React', icon: React },
    { label: 'Next.js', icon: NextJs },
    { label: 'Sass', icon: Sass },
    { label: 'Redux', icon: Redux },
    { label: 'Three.js', icon: ThreeJs },
    { label: 'Storybook', icon: Storybook },
    { label: 'Gulp', icon: GulpJs },
    { label: 'Tanstack Router', icon: Javascript },
    { label: 'HTML5', icon: HTML5 },
    { label: 'TailwindCSS', icon: TailwindCSS },
    { label: 'CSS3', icon: CSS3 },
  ],
  backend: [
    { label: 'DRF', icon: DRF },
    { label: 'Node.js', icon: Nodejs },
  ],
  tools: [
    { label: 'GIT', icon: Git },
    { label: 'Docker', icon: Docker },
  ],
}
export function TechStack() {
  const containerRef = useRef<HTMLDivElement | null>(null)

  useGSAP(
    () => {
      if (!containerRef.current) return

      // Select each stack group (the div that contains a key and its items)
      const stackGroups = gsap.utils.toArray<HTMLDivElement>(
        '.stack-group',
        containerRef.current
      )

      stackGroups.forEach((group) => {
        const keyTextWrapper = group.querySelector('.stack-key-wrapper') // Wrapper for position:relative
        const keyOverlay = group.querySelector('.stack-key-overlay')
        const keyText = group.querySelector('.stack-key-text') // The actual text <p>
        const techItems = gsap.utils.toArray('.tech-item', group) // Tech items in this group

        if (!keyOverlay || !keyTextWrapper || !keyText) return

        // Initial states:
        // Overlay is positioned to cover the text (done via CSS)
        // We'll animate it from xPercent: 0 to xPercent: 100
        gsap.set(keyOverlay, { xPercent: 0 }) // Start fully covering
        // Text itself could be initially slightly offset or faded if desired,
        // but for this effect, it's mainly revealed by the overlay.
        // Let's ensure the text is ready but just covered.
        gsap.set(keyText, { opacity: 1 })

        // Tech items are initially hidden and offset
        gsap.set(techItems, { opacity: 0, y: 40 })

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: group,
            start: 'top 80%', // When 80% of the group is visible from the top
            toggleActions: 'play none none none',
            // markers: true, // For debugging this specific timeline's trigger
          },
        })

        // Animation 1: Box overlay retracts to the right
        tl.to(keyOverlay, {
          xPercent: 100, // Slides the overlay to the right
          duration: 0.7,
          ease: 'power2.inOut', // A smooth acceleration and deceleration
        })

        // Optional: A subtle animation for the key text itself as it's revealed
        // This makes it feel less static after the overlay moves.
        tl.from(
          keyText,
          {
            opacity: 0, // If you want it to fade in
            x: -20, // Slight movement from left
            duration: 0.5,
            ease: 'power2.out',
          },
          '-=0.5'
        ) // Start this slightly before or as overlay is moving

        if (techItems.length > 0) {
          tl.to(
            techItems,
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              stagger: 0.1, // Stagger the animation for each tech item
              ease: 'power3.out',
            },
            '-=0.3'
          ) // Start tech items animation slightly before text fully revealed or as overlay clears
        }
      })
    },
    { scope: containerRef, dependencies: [stacks] }
  ) // Re-run if stacks data changes

  return (
    <section className=''>
      <div ref={containerRef} className='container'>
        <div className='flex items-center gap-4 mb-10'>
          <AnimatedIcon />
          <h2 className='text-xl uppercase leading-none text-primary font-anton tracking-[0.1em]'>
            My Stack snapshot
          </h2>
        </div>
        <div className='space-y-20'>
          {Object.keys(stacks).map((key, keyIndex) => (
            <div key={key} className='stack-group grid sm:grid-cols-12 gap-y-4'>
              <div className='sm:col-span-5'>
                <div className='stack-key-wrapper relative overflow-hidden max-w-xs'>
                  <p className='stack-key-text text-5xl font-anton leading-none text-muted-foreground uppercase'>
                    {key}
                  </p>
                  <div className='stack-key-overlay absolute top-0 left-0 h-full w-full bg-primary z-10' />
                </div>
              </div>
              <div className='sm:col-span-7 flex gap-x-11 gap-y-9 flex-wrap'>
                {Object.values(stacks)
                  .at(keyIndex)
                  ?.map((techStack) => (
                    // Each of these is a 'tech-item'
                    <div
                      key={techStack.label}
                      className='tech-item flex gap-3.5 items-center leading-none'
                    >
                      <div className='size-10 text-white'>
                        <techStack.icon />
                      </div>
                      <span className='text-2xl capitalize'>{techStack.label}</span>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
