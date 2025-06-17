import { Suspense } from 'react'
import cn from 'clsx'

import { ProjectViews } from './project-view'

export function SelectedProjects() {
  return (
    <section className='' id='projects' data-lenis-scroll-snap-align='start'>
      <div className='grid grid-cols-[repeat(12,minmax(0,1fr))] gap-[1.67vw] lg:gap-6 gap-y-10 mx-automax-w-[calc(100vw_-_(2_*_40px)))]'>
        <div className='col-span-full py-12 pl-4 lg:py-20 lg:sticky top-[33%] lg:self-start lg:col-span-3 border-l-4 border-primary'>
          <h2 className='h2 font-display'>selected projects</h2>
        </div>

        <aside
          className={cn('col-span-full lg:col-start-5 lg:-col-end-1')}
          style={{ height: '100%' }}
        >
          <div className='mb-6 md:mb-8 lg:mb-10 xl:mb-14'>
            <p className=''>
              Each project has challenged me to grow as a developer—whether by learning a
              new framework, refining performance, or improving accessibility. Here’s a
              selection of the work I’ve done, with a focus on real-world functionality,
              clean design, and maintainable code.
            </p>
          </div>

          <div className='relative aspect-video'>
            <Suspense fallback={null}>
              <ProjectViews />
            </Suspense>
          </div>
        </aside>
      </div>
    </section>
  )
}
