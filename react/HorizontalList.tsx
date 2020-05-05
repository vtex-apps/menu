import React from 'react'
import classnames from 'classnames'
import { useCssHandles } from 'vtex.css-handles'
import { NavigationItem, NavigationId } from 'navigation'

import MenuItemDefault from './MenuItem'
import useNavigation from './hooks/useNavigation'

interface Props {
  id: NavigationId
  navigationItem?: NavigationItem
  TopItem?: typeof MenuItemDefault
  MenuItem?: typeof MenuItemDefault
  ListItem?: React.ComponentType<any>
}

const CSS_HANDLES = [
  'horizontalListWrapper',
  'horizontalTopLink',
  'horizontalList',
  'horizontalListItemContainer',
  'menuItem',
] as const

export default function HorizontalList(props: Props) {
  const {
    id,
    navigationItem,
    TopItem = MenuItemDefault,
    MenuItem = MenuItemDefault,
    ListItem,
  } = props
  const navigationId = navigationItem?.subNavigation ?? id
  const handles = useCssHandles(CSS_HANDLES)
  const navigation = useNavigation(navigationId)

  const hasList = (navigation?.items.length ?? 0) > 0
  const topLinkClasses = classnames(handles.horizontalTopLink)
  const listClasses = classnames(
    handles.horizontalList,
    'w-100 flex justify-around list pa0'
  )
  const listItemClasses = classnames(handles.menuItem)

  return (
    <div className={handles.horizontalListWrapper}>
      {navigationItem && (
        <TopItem
          id={navigationItem.id}
          navigationItem={navigationItem}
          className={topLinkClasses}
        />
      )}
      {hasList && (
        <ul className={listClasses}>
          {navigation?.items.map(item => (
            <li key={item.id} className={handles.horizontalListItemContainer}>
              {ListItem ? (
                <ListItem id={item.id} navigationItem={item} />
              ) : (
                <MenuItem
                  id={item.id}
                  navigationItem={item}
                  className={listItemClasses}
                />
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
