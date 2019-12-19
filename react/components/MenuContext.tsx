import { createContext } from 'react'

const MenuContext = createContext<MenuContextValue>({
  hasTitle: false,
  optimizeRendering: false,
  orientation: 'horizontal',
  textType: 't-body',
})

interface MenuContextValue {
  hasTitle: boolean
  orientation: 'horizontal' | 'vertical'
  textType: string
  optimizeRendering?: boolean
}

export default MenuContext
