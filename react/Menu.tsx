import React from 'react'
import classnames from 'classnames'
import { useCssHandles } from 'vtex.css-handles'
import { MenuItemProps, NavigationItem } from 'navigation'

import DefaultMenuItemRoot from './MenuItemRoot'
import useNavigation from './hooks/useNavigation'

type NavigationId = number

interface Navigation {
  id: NavigationId
  MenuItem: React.ComponentType<MenuItemProps>
}

interface Props {
  navigation?: Partial<Navigation>
}

const defaultNavigation: Navigation = {
  id: 10000,
  MenuItem: DefaultMenuItemRoot,
}

const CSS_HANDLES = ['navigation', 'navList'] as const

export default function Menu(props: Props) {
  const { navigation: navProp = defaultNavigation } = props
  const handles = useCssHandles(CSS_HANDLES)
  const { id, MenuItem } = {
    ...defaultNavigation,
    ...navProp,
  }
  const navigation = useNavigation(id)
  const navClasses = classnames(handles.navigation, 'flex items-center')
  const listClasses = classnames(
    handles.navList,
    'list flex ma0 pa0 h-100 items-stretch'
  )

  return (
    <nav className={navClasses}>
      <ul className={listClasses}>
        {navigation?.items.map((item: NavigationItem) => (
          <MenuItem navigationItem={item} key={item.id} />
        ))}
      </ul>
    </nav>
  )
}
