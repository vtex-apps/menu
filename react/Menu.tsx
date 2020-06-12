import React from 'react'
import classnames from 'classnames'
import { useCssHandles } from 'vtex.css-handles'

import {
  NavigationContextProvider,
  useNavigationItems,
} from './components/NavigationContext'

const CSS_HANDLES = ['navigation', 'navList'] as const

function Menu() {
  const handles = useCssHandles(CSS_HANDLES)
  const navClasses = classnames(handles.navigation, 'flex items-center')
  const listClasses = classnames(
    handles.navList,
    'list flex ma0 pa0 h-100 items-stretch'
  )

  const navigation = useNavigationItems()

  return (
    <nav className={navClasses}>
      <ul className={listClasses}>
        {navigation?.navigationItems.map((Item, idx) => (
          <Item key={idx} />
        ))}
      </ul>
    </nav>
  )
}

const WrappedMenuBlock = (props: any) => {
  return (
    <NavigationContextProvider {...props}>
      <Menu {...props} />
    </NavigationContextProvider>
  )
}

export default WrappedMenuBlock
