import { create } from 'zustand'

type State = {
  mouseStatus: 'mousedown' | 'mouseup' | ''
  mouseDownPos: { x: number; y: number }
  activeSlideIndex: number
}

type Action = {
  setMouseStatus: (status: State['mouseStatus']) => void
  setMouseDownPos: (pos: State['mouseDownPos']) => void
  setActiveSlideIndex: (index: State['activeSlideIndex']) => void
}

const useMainStore = create<State & Action>((set) => ({
  mouseStatus: '',
  setMouseStatus: (status) => set({ mouseStatus: status }),

  mouseDownPos: { x: 0, y: 0 },
  setMouseDownPos: (pos) => set({ mouseDownPos: pos }),

  activeSlideIndex: 0,
  setActiveSlideIndex: (index) => set({ activeSlideIndex: index }),
}))

export default useMainStore
