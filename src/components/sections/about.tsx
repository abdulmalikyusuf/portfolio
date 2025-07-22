export function About() {
  return (
    <section className='pb-16md:pb-20lg:pb-24xl:pb-32'>
      <div className='container flex flex-col gap-y- lg:grid lg:grid-cols-12'>
        <div className='col-span-3'>
          <div className='relative'>
            <div className='sticky top-24'>
              <div className='pb-10 lg:pb-0'>
                <div className='overflow-hidden'>
                  <span className='base-label text-current flex leading-4 tagline l font-bold text-lg lg:text-xl'>
                    <svg
                      viewBox='0 0 6 6'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                      aria-hidden='true'
                      className='w-[.6rem] mr-4 lg:mr-6'
                    >
                      <rect width='6' height='6' rx='1' className='fill-current'></rect>
                    </svg>{' '}
                    <span>Bridging the gap</span>
                  </span>
                </div>
                <p className='lg:text-lg mt-5 lg:mt-10 lg:max-w-72 text-balance'>
                  I bring harmony to the intersection of visual design and frontend
                  architecture, translating creative direction into performant, scalable
                  user interfaces that support both brand identity and long-term
                  usability.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className='col-start-5 col-span-7'>
          <h3 className='pb-4 text-3xl sm:text-4xl !leading-none lg:text-5xl'>
            Turning ideas into interactive, accessible, and performant web interfaces.
            <br />
          </h3>{' '}
          <div className='flex flex-col gap-4 text-lg lg:text-xl text-white/50'>
            <p>
              With over four years of experience in frontend development, I specialize in
              building responsive websites and web applications that prioritize
              <span className='text-white'>
                {' '}
                performance, accessibility, and user experience
              </span>
              . My core tools include React, TypeScript, and Tailwind CSS, and I'm
              passionate about leveraging these technologies to create fast, modern
              interfaces that scale with business needs.
            </p>
            <p>
              I thrive in a collaborative environment, working closely with designers to
              bring UI concepts to life and with backend engineers to ensure seamless
              integration across the stack. Whether I’m refining micro-interactions,
              implementing reusable components, or translating complex Figma layouts into
              clean code, I aim to strike the right balance between aesthetics and
              functionality.
            </p>
            <p>
              From landing pages to complex dashboards, I bring a detail-oriented mindset
              to every project. I care deeply about code quality, maintainability, and
              building experiences that users not only understand but enjoy. My goal is
              always to deliver frontend solutions that are intuitive, scalable, and
              aligned with the bigger product vision.
            </p>
            <p>
              <span></span>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
