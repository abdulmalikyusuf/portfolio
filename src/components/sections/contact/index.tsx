import { Toaster } from 'sonner'
import { ContactForm } from './form'

export function Contact() {
  return (
    <>
      <div className='absolute'>
        <Toaster />
      </div>
      <ContactForm />
    </>
  )
}
