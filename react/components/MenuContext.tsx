import { createContext } from 'react'

const MenuContext = createContext<MenuContextValue>({
  hasTitle: false,
  orientation: 'horizontal',
  textType: 't-body',
})

interface MenuContextValue {
  hasTitle: boolean
  orientation: 'horizontal' | 'vertical'
  textType: string
}

export default MenuContext
