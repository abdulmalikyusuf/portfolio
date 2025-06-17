import { ReactLenis } from 'lenis/react'
import React from 'react'
import ReactDOM from 'react-dom/client'

import { Main } from './layout'
import './styles/main.css'
import './styles/global.scss'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ReactLenis
      root
      options={{
        lerp: 0.1,
        duration: 1.4,
      }}
    >
      <Main />
    </ReactLenis>
  </React.StrictMode>
)
