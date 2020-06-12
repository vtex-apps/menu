import React, { createContext, useContext, ComponentType, FC } from 'react'

interface NavigationContextType {
  navigationItems: ComponentType[]
  baseMenuItem: ComponentType
}

interface NavigationContextProps {
  [MenuItemBlockId: string]: ComponentType
}

const NavigationContext = createContext<NavigationContextType | null>(null)

const NavigationContextProvider: FC<NavigationContextProps> = props => {
  const baseMenuItem = props.MenuItem
  const navigationItems = Object.keys(props)
    .filter(propName => propName.includes('MenuItem-'))
    .map(menuItemId => props[menuItemId])

  return (
    <NavigationContext.Provider value={{ baseMenuItem, navigationItems }}>
      {props.children}
    </NavigationContext.Provider>
  )
}

const useNavigationItems = () => {
  const navigationContextValue = useContext(NavigationContext)

  if (!navigationContextValue) {
    console.error(
      'useNavigationItems is being called outside of a NavigationContextProvider'
    )
  }

  return navigationContextValue
}

export { NavigationContextProvider, useNavigationItems }
