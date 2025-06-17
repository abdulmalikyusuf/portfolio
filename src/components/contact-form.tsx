import { FormEvent, useState } from 'react'
import cn from 'clsx'

export function ContactForm() {
  const [error, setError] = useState(null)
  const [pending, setPending] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setPending(true)

    const form = e.currentTarget
    const formData = new FormData(form)
    const json = Object.fromEntries(formData.entries())

    await fetch(import.meta.env.VITE_FORMCARRY_URL, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(json),
    })
      .then((res) => res.json())
      .then((resp) => {
        if (resp.code === 200) setMessage('We received your submission, thank you!')
        else setError(resp.message)
      })
      .catch((err) => {
        setError(err.message ? err.message : error)
      })
    setPending(false)
  }
  return (
    <form onSubmit={handleSubmit} className='px-4 md:px-0' aria-label='Contact form'>
      <div
        className='grid grid-cols-[repeat(auto-fit,minmax(min(320px,100%),1fr))] [1fr_1fr_1fr] gap-4 lg:pt-6 lg:pb-12 xl:pt-10 xl:pb-16 [--g00:#ff98a200] [--g16:#ff98a229]'
        data-select2-id='select2-data-7-ibbe'
      >
        {message && (
          <div className='col-span-full'>
            <p className='text-base lg:text-xl xl:text-2xl font-medium text-primary text-center'>
              Your message has been received, I'll be sure to reply back as soon as
              possible
            </p>
          </div>
        )}
        <div
          className={cn(
            'group relative rounded-xl pr-5 overflow-hidden',
            'before:absolute before:inset-y-0 before:left-0 before:z-10 before:w-5 before:border-[var(--g16)] before:border before:border-r-0 before:rounded-l-xl before:block',
            'after:absolute after:inset-y-0 after:right-0 after:z-10 after:w-5 after:border-[var(--g16)] after:border after:border-l-0 after:rounded-r-xl before:block'
          )}
        >
          <p className='absolute inset-0 bg-[#fff] opacity-[.12] z-[2]  group-hover:z-0' />
          <div
            className={cn(
              'before:absolute before:bg-[linear-gradient(90deg,_var(--g16)_20%,_var(--g00)_50%,_var(--g00)_70%,_var(--g16)_100%)] before:top-0 before:inset-x-[21px] before:z-10 before:h-px before:block',
              'after:absolute after:bg-[linear-gradient(90deg,_var(--g16)_0,_var(--g00)_30%,_var(--g00)_50%,_var(--g16)_80%)] after:bottom-0 after:inset-x-[21px] after:z-10 after:h-px after:block'
            )}
          />
          <select
            name='subject'
            id='subject'
            className='rounded-xl h-14 py-[18px] px-4 text-[#ff98a2] backdrop-blur-[28px] backdrop-opacity-10 font-light text-base leading-[1.3]'
          >
            <option value='job' className=''>
              Job Opportunity
            </option>
            <option value='freelance' className=''>
              Freelance Project
            </option>
            <option value='collaboration' className=''>
              Collaboration
            </option>
            <option value='other' className=''>
              Other
            </option>
          </select>
        </div>

        <div
          className={cn(
            'group relative rounded-xl overflow-hidden',
            'before:absolute before:inset-y-0 before:left-0 before:z-10 before:w-5 before:border-[var(--g16)] before:border before:border-r-0 before:rounded-l-xl before:block',
            'after:absolute after:inset-y-0 after:right-0 after:z-10 after:w-5 after:border-[var(--g16)] after:border after:border-l-0 after:rounded-r-xl before:block'
          )}
        >
          <p className='absolute inset-0 bg-[#fff] opacity-[.12] z-[2]  group-hover:z-0' />

          <input
            type='email'
            name='email'
            id='email'
            placeholder='Your email'
            className='rounded-xl h-14 w-full py-[18px] px-4 text-[#ff98a2] backdrop-blur-[28px] backdrop-opacity-10 font-light text-base leading-[1.3]'
          />
          <div
            className={cn(
              'before:absolute before:bg-[linear-gradient(90deg,_var(--g16)_20%,_var(--g00)_50%,_var(--g00)_70%,_var(--g16)_100%)] before:top-0 before:inset-x-[21px] before:z-10 before:h-px before:block',
              'after:absolute after:bg-[linear-gradient(90deg,_var(--g16)_0,_var(--g00)_30%,_var(--g00)_50%,_var(--g16)_80%)] after:bottom-0 after:inset-x-[21px] after:z-10 after:h-px after:block'
            )}
          />
        </div>

        <div
          className={cn(
            'group relative rounded-xl overflow-hidden',
            'before:absolute before:inset-y-0 before:left-0 before:z-10 before:w-5 before:border-[var(--g16)] before:border before:border-r-0 before:rounded-l-xl before:block',
            'after:absolute after:inset-y-0 after:right-0 after:z-10 after:w-5 after:border-[var(--g16)] after:border after:border-l-0 after:rounded-r-xl before:block'
          )}
        >
          <p className='absolute inset-0 bg-[#fff] opacity-[.12] z-[2]  group-hover:z-0' />

          <input
            type='text'
            name='name'
            id='name'
            placeholder='Your name'
            className='rounded-xl h-14 w-full py-[18px] px-4 text-[#ff98a2] backdrop-blur-[28px] backdrop-opacity-10 font-light text-base leading-[1.3]'
          />
          <div
            className={cn(
              'before:absolute before:bg-[linear-gradient(90deg,_var(--g16)_20%,_var(--g00)_50%,_var(--g00)_70%,_var(--g16)_100%)] before:top-0 before:inset-x-[21px] before:z-10 before:h-px before:block',
              'after:absolute after:bg-[linear-gradient(90deg,_var(--g16)_0,_var(--g00)_30%,_var(--g00)_50%,_var(--g16)_80%)] after:bottom-0 after:inset-x-[21px] after:z-10 after:h-px after:block'
            )}
          />
        </div>
        <div
          className={cn(
            'group relative rounded-xl overflow-hidden col-span-full',
            'before:absolute before:inset-y-0 before:left-0 before:z-10 before:w-5 before:border-[var(--g16)] before:border before:border-r-0 before:rounded-l-xl before:block',
            'after:absolute after:inset-y-0 after:right-0 after:z-10 after:w-5 after:border-[var(--g16)] after:border after:border-l-0 after:rounded-r-xl before:block'
          )}
        >
          <p className='absolute inset-0 bg-[#fff] opacity-[.12] z-[2]  group-hover:z-0' />

          <textarea
            cols={50}
            rows={6}
            id='message'
            name='message'
            placeholder='Your message'
            className={cn(
              'rounded-xl w-full py-[18px] px-4 text-[var(--pink)] backdrop-blur-[28px] backdrop-opacity-10 font-light text-base leading-[1.3] resize-none',
              'focus-within:outline-[#ff98a2] focus:outline-[var(--pink)] focus-within:border-0 focus:border-0 focus:ring-0 focus-within:ring0'
            )}
          />
          <div
            className={cn(
              'before:absolute before:bg-[linear-gradient(90deg,_var(--g16)_20%,_var(--g00)_50%,_var(--g00)_70%,_var(--g16)_100%)] before:top-0 before:inset-x-[21px] before:z-10 before:h-px before:block',
              'after:absolute after:bg-[linear-gradient(90deg,_var(--g16)_0,_var(--g00)_30%,_var(--g00)_50%,_var(--g16)_80%)] after:bottom-0 after:inset-x-[21px] after:z-10 after:h-px after:block'
            )}
          />
        </div>
        <div
          className={cn(
            'group relative overflow-hidden rounded-xl col-span-full',
            'before:absolute before:inset-y-0 before:left-0 before:z-10 before:w-5 before:border-[var(--g16)] before:border before:border-r-0 before:rounded-l-xl before:block',
            'after:absolute after:inset-y-0 after:right-0 after:z-10 after:w-5 after:border-[var(--g16)] after:border after:border-l-0 after:rounded-r-xl before:block'
          )}
        >
          <p className='absolute inset-0 bg-[#fff] opacity-[.12] z-[2] group-hover:z-0' />
          <div
            className={cn(
              'before:absolute before:bg-[linear-gradient(90deg,_var(--g16)_20%,_var(--g00)_50%,_var(--g00)_70%,_var(--g16)_100%)] before:top-0 before:inset-x-[21px] before:z-10 before:h-px before:block',
              'after:absolute after:bg-[linear-gradient(90deg,_var(--g16)_0,_var(--g00)_30%,_var(--g00)_50%,_var(--g16)_80%)] after:bottom-0 after:inset-x-[21px] after:z-10 after:h-px after:block'
            )}
          />
          <button
            type='submit'
            className='relative group-contact-button rounded-xl h-14 w-full overflow-y-hidden py-[18px] px-4 text-[var(--pink)] z-10 backdrop-blur-[28px] backdrop-opacity-10 hover:backdrop-opacity-100 font-medium text-base leading-[1.3] flex justify-center items-center'
          >
            {pending ? (
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
                className='size-4 animate-spin'
              >
                <path d='M21 12a9 9 0 1 1-6.219-8.56' />
              </svg>
            ) : (
              'Submit'
            )}
          </button>
        </div>
      </div>
    </form>
  )
}
