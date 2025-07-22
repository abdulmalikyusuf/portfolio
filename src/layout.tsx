import { cubicBezier } from 'motion'
import { useTransform, useScroll, motion } from 'motion/react'

import { About } from './components/sections/about'
import { HeroSection } from './components/sections/hero'
import { SelectedProjects } from './components/sections/projects'
import { TechStack } from './components/sections/stack'
import { Experiences } from './components/experience'
import { Footer } from './components/footer'
import { WebGL } from './components/webgl'
import { MouseHandler } from './components/cursor/MouseHandler'

export function Main() {
  const { scrollYProgress } = useScroll()
  const height = useTransform(scrollYProgress, [0, 1], [0, 100], {
    ease: cubicBezier(0.17, 0.67, 0.83, 0.67),
  })

  return (
    <>
      <MouseHandler />
      <div className='relative text-white min-h-screen bg-black font-aeonik'>
        <div className='canvas'>
          <WebGL />
        </div>
        <div className='fixed top-[50svh] right-[2%] -translate-y-1/2 w-1.5 h-[100px] rounded-full bg-foreground overflow-hidden'>
          <motion.div
            className='w-full bg-primary rounded-full h-0'
            style={{ height }}
          ></motion.div>
        </div>
        <div className='max-xl:hidden fixed bottom-32 left-0 block'>
          {/* <a
            href='mailto:yusuffabdulmalik@gmail.com'
            className='px-3 text-muted-foreground tracking-[1px] transition-all !bg-bottom hover:text-foreground hover:!bg-center'
            style={{ textOrientation: 'mixed', writingMode: 'vertical-rl' }}
          >
            abdulmalikyusuf@gmail.com
          </a> */}
        </div>
        <main className='grid grid-cols-[repeat(36,1fr)] *:col-start-2 *:-col-end-2 relative h-full'>
          <HeroSection />
          <About />
          <TechStack />
          <Experiences />
          <SelectedProjects />
          <Footer />
        </main>
      </div>
    </>
  )
}
