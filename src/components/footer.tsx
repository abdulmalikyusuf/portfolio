import { ContactForm } from './contact-form'

const extLinks = [{ name: 'github', url: 'https://github.com/abdulmalikyusuf/' }]
export function Footer() {
  return (
    <footer className='py-10 lg:py-16 xl:py-20 flex flex-col gap-10 lg:gap-16 text-[#E9DEFF]'>
      <div className='flex justify-between'>
        <div className=''>
          <img src='logo.png' alt='Abdulmalik Yusuf' className='' />
        </div>
        <div className='flex gap-x-3'>
          {extLinks.map((extLink) => (
            <a
              href={extLink.url}
              key={extLink.url}
              target='_blank'
              rel='noopener noreferrer'
              className='inline-flex items-center gap-x-3 uppercase text-sm leading-none font-medium'
            >
              <span className=''>{extLink.name}</span>
              <svg
                width='10'
                height='10'
                viewBox='0 0 10 10'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M9 0.671631L1 8.67163M9 0.671631C9 0.671631 7.88889 1.11608 5.66667 1.11608C3.44444 1.11608 2.33333 0.671631 2.33333 0.671631M9 0.671631C9 0.671631 8.55556 1.78274 8.55556 4.00496C8.55556 6.22719 9 7.3383 9 7.3383'
                  stroke='#E9DEFF'
                  strokeLinecap='square'
                  strokeLinejoin='round'
                />
              </svg>
            </a>
          ))}
        </div>
      </div>
      <div className='max-w-5xl w-full mx-auto flex flex-col gap-10 mt-[70px]'>
        <h1 className='text-5xl md:text-6xl lg:text-7xl xl:text-[100px] leading-none font-medium text-center'>
          Interested in working together?
        </h1>
      </div>
      <ContactForm />
      <div className='flex justify-between place-items-end text-sm font-medium leading-[160%]'>
        <p className=''>©{new Date().getFullYear()} – All Rights Reserved</p>
        <p className=''>Available for work</p>
      </div>
    </footer>
  )
}
