import React from 'react'
import { useCssHandles } from 'vtex.css-handles'
import { BaseOverlay } from 'vtex.overlay-layout'

import {
  NavigationContextProvider,
  useNavigationItems,
} from './components/NavigationContext'

const overlayClasses = {
  container: 'outline-0 bg-base pa5',
}

const CSS_HANDLES = ['childrenWrapper'] as const

function Submenu(props: any) {
  const { children } = props
  const navigation = useNavigationItems()
  const handles = useCssHandles(CSS_HANDLES)

  let maybeWrappedChildren = children
  if (React.Children.count(children) > 0) {
    maybeWrappedChildren = (
      <div className={handles.childrenWrapper}>{children}</div>
    )
  }

  const hasItems =
    navigation?.navigationItems && navigation?.navigationItems.length > 0

  return hasItems ? (
    <BaseOverlay classes={overlayClasses}>
      <ul className="pl0 flex list">
        {navigation?.navigationItems.map((Item, idx) => (
          <li className="mh4">
            <Item key={idx} />
          </li>
        ))}
      </ul>
      {maybeWrappedChildren}
    </BaseOverlay>
  ) : null
}

const WrappedSubmenuBlock = (props: any) => {
  return (
    <NavigationContextProvider {...props}>
      <Submenu {...props} />
    </NavigationContextProvider>
  )
}

export default WrappedSubmenuBlock
