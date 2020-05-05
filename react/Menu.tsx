import React from 'react'
import classnames from 'classnames'
import { useCssHandles } from 'vtex.css-handles'
import { NavigationItem } from 'navigation'

import DefaultMenuItemRoot from './MenuItemRoot'
import useNavigation from './hooks/useNavigation'

type NavigationId = number

interface Props {
  navigationId: NavigationId
  MenuItem?: typeof DefaultMenuItemRoot
}

const CSS_HANDLES = ['navigation', 'navList', 'menuItemRootContainer'] as const

export default function Menu(props: Props) {
  const { navigationId, MenuItem = DefaultMenuItemRoot } = props
  const handles = useCssHandles(CSS_HANDLES)
  const navigation = useNavigation(navigationId)
  const navClasses = classnames(handles.navigation, 'flex items-center')
  const listClasses = classnames(
    handles.navList,
    'list flex ma0 pa0 h-100 items-stretch'
  )

  return (
    <nav className={navClasses}>
      <ul className={listClasses} role="menu">
        {navigation?.items.map((item: NavigationItem) => (
          <li
            key={item.id}
            role="menuitem"
            className={handles.menuItemRootContainer}
          >
            <MenuItem id={item.id} navigationItem={item} />
          </li>
        ))}
      </ul>
    </nav>
  )
}
