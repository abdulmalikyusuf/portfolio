import { useRef } from 'react'
import { gsap } from 'gsap'
import { SplitText } from 'gsap/SplitText'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { useFontsReady } from '@/hooks/use-font-loaded'

gsap.registerPlugin(SplitText)
gsap.registerPlugin(ScrollTrigger)

export function About() {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const textRef = useRef<HTMLHeadingElement | null>(null)
  const { isFontsReady } = useFontsReady()

  useGSAP(
    () => {
      if (!containerRef.current || !isFontsReady) return
      // Ensure SplitText runs only after fonts are loaded
      const split = new SplitText(textRef.current, {
        type: 'lines',
        linesClass: 'split-line',
        mask: 'lines',
      })

      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'bottom bottom',
        end: 'top 20%',
        toggleActions: 'play none none none',
        scrub: 1,
        animation: gsap.from(split.lines, {
          yPercent: 140,
          duration: 1.2,
          ease: 'power3.out',
          stagger: 0.1,
        }),
      })
    },
    { scope: containerRef }
  )

  return (
    <section className='pb-40'>
      <div className='container'>
        <div ref={containerRef} className=''>
          <h2
            ref={textRef}
            className='text-4xl md:text-6xl font-thin mb-20 slide-up-and-fade font-display'
          >
            I craft clean, intuitive interfaces that solve real world problems — blending
            precision and creativity to create fast, user-focused experiences.
          </h2>
        </div>
        <p className='pb-3 border-b text-muted-foreground slide-up-and-fade font-display'>
          What I bring to the table.
        </p>
        <div className='grid md:grid-cols-12 mt-9'>
          <div className='md:col-span-5'>
            <p className='text-5xl slide-up-and-fade font-display'>Hi, I'm Abdulmalik.</p>
          </div>
          <div className='md:col-span-7'>
            <div className='text-lg text-muted-foreground max-w-xl [450px]'>
              <p className='slide-up-and-fade'>
                I'm a frontend developer with a passion for crafting fast, accessible, and
                visually engaging web experiences. With a background in Medical Laboratory
                Science, I bring a detail-oriented mindset to every line of code I write.
              </p>
              <p className='mt-3 slide-up-and-fade'>
                I focus on building products that work first—getting the core experience
                right—then scaling for performance, efficiency, and long-term
                maintainability. Whether it's reducing load times, implementing seamless
                animations, or translating designs with pixel-perfect precision, I aim to
                deliver solutions that are not just elegant—but effective.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
