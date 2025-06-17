import { useMediaQuery, useRect } from 'hamo'
import cn from 'clsx'
import { gsap } from 'gsap'
import { SplitText } from 'gsap/dist/SplitText'
import { ReactNode, useEffect, useRef, useState } from 'react'
import { useIntersection, useWindowSize } from 'react-use'
import s from './appear-title.module.scss'
import { useFontsReady } from '@/hooks/use-font-loaded'

gsap.registerPlugin(SplitText)

type AppearTitleProps = {
  children: ReactNode
  visible: boolean
}

export function AppearTitle({ children, visible = true }: AppearTitleProps) {
  const el = useRef<HTMLSpanElement | null>(null)

  const [intersected, setIntersected] = useState(false)
  const { isFontsReady } = useFontsReady()
  const intersection = useIntersection(el, {
    threshold: 1,
  })

  useEffect(() => {
    if (intersection?.isIntersecting) {
      setIntersected(true)
    }
  }, [intersection])

  const { width } = useWindowSize()
  const isMobile = useMediaQuery('(max-width: 800px)')

  const [rectRef, rect] = useRect()

  useEffect(() => {
    if (!isMobile || isFontsReady) {
      const splitted = new SplitText(el.current, {
        type: 'lines',
        lineThreshold: 0.3,
        tag: 'span',
        linesClass: s.line,
      })

      splitted.lines.forEach((item, i) => {
        const line = item as HTMLSpanElement
        line.style.setProperty('--i', i.toString())
        const html = line.innerHTML
        line.innerHTML = ''
        const content = document.createElement('span')
        content.innerHTML = html
        line.appendChild(content)
      })

      return () => {
        splitted.revert()
      }
    }
  }, [width, rect, isMobile])

  return (
    <span
      ref={(node) => {
        el.current = node
        rectRef(node)
      }}
      className={cn(s.title, intersected && visible && s.visible)}
    >
      {children}
    </span>
  )
}
