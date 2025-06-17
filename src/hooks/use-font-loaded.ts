import { useState, useEffect } from 'react'

export function useFontsReady() {
  const [isFontsReady, setIsFontsReady] = useState(false)

  // Effect to detect font loading
  useEffect(() => {
    document.fonts.ready
      .then(() => {
        setIsFontsReady(true)
        console.log('Fonts loaded')
      })
      .catch((error) => {
        console.error('Font loading error:', error)
        // Potentially handle font loading errors or proceed with system fonts
        setIsFontsReady(true) // Or decide to not render/split if fonts are critical
      })
  }, [])
  return { isFontsReady }
}
