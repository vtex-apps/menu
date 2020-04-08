import React from 'react'
import classnames from 'classnames'
import { useCssHandles } from 'vtex.css-handles'
import { NavigationItem, NavigationId } from 'navigation'

import MenuItemDefault from './MenuItem'
import useNavigation from './hooks/useNavigation'

interface Props {
  id: NavigationId
  navigationItem: NavigationItem
  MenuItem?: React.ComponentType
}

const CSS_HANDLES = [
  'submenuItemWrapper',
  'submenuTopLink',
  'submenuList',
  'submenuListItem',
] as const

export default function SubmenuItemList(props: Props) {
  const { navigationItem, MenuItem = MenuItemDefault } = props
  const { subNavigation } = navigationItem
  const handles = useCssHandles(CSS_HANDLES)
  const navigation = useNavigation(subNavigation)
  const topLinkClasses = classnames(handles.submenuTopLink, '')
  const listItemClasses = classnames(handles.submenuListItem, '')
  const hasList = (navigation?.items.length ?? 0) > 0

  return (
    <div className={handles.submenuItemWrapper}>
      <MenuItem
        id={navigationItem.id}
        className={topLinkClasses}
        navigationItem={navigationItem}
      />
      {hasList && (
        <div className={handles.submenuList}>
          {navigation?.items?.map(item => (
            <MenuItem
              id={item.id}
              key={item.id}
              navigationItem={item}
              className={listItemClasses}
            />
          ))}
        </div>
      )}
    </div>
  )
}
