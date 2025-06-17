import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

const experiences = [
  {
    orgName: 'Vuetify Solutions',
    position: 'Frontend Developer',
    date: 'May 2021 - Present',
  },
  {
    orgName: 'HNG 11 Internship (Bootcamp)',
    position: 'Frontend Intern',
    date: '2024',
  },
]

export function Experiences() {
  const containerRef = useRef<HTMLDivElement | null>(null)

  useGSAP(() => {
    if (!containerRef.current) return
    const experienceItems = gsap.utils.toArray<HTMLDivElement>(
      '.experience-item',
      containerRef.current
    )

    experienceItems.forEach((experienceItem) => {
      gsap.set(experienceItem, {
        paddingTop: 50,
        opacity: 0.5,
      })

      gsap.to(experienceItem, {
        paddingTop: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: experienceItem,
          start: 'top bottom-=50px',
          // end: "bottom top",    // Optional: defines when the trigger is considered "done"
          toggleActions: 'play none none none', // Play once on enter, do nothing on leave/re-enter/re-leave
          //   markers: true,
          //   scrub: true,
          // If scrubbing, you might want to adjust start/end and remove toggleActions
        },
      })
    })
  })

  return (
    <section className=''>
      <div className='container'>
        <div className='flex items-center gap-4 mb-10'>
          <h2 className='text-xl uppercase leading-none text-primary font-anton tracking-[0.1em]'>
            My Experience
          </h2>
        </div>
        <div className='grid gap-14' ref={containerRef}>
          {experiences.map((experience) => (
            <div key={experience.orgName} className='experience-item'>
              <p className='text-xl text-muted-foreground'>{experience.orgName}</p>
              <p className='text-5xl font-anton leading-none mt-3.5 mb-2.5'>
                {experience.position}
              </p>
              <p className='text-lg text-muted-foreground'>{experience.date}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
