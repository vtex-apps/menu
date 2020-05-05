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
  'verticalListWrapper',
  'verticalListTopLink',
  'verticalList',
  'verticalListItemContainer',
  'menuItem',
] as const

export default function VerticalList(props: Props) {
  const {
    id,
    ListItem,
    navigationItem,
    TopItem = MenuItemDefault,
    MenuItem = MenuItemDefault,
  } = props
  const subNavigation = navigationItem?.subNavigation ?? id
  const handles = useCssHandles(CSS_HANDLES)
  const navigation = useNavigation(subNavigation)

  const wrapperClasses = classnames(
    handles.verticalListWrapper,
    'flex flex-column items-start'
  )
  const topLinkClasses = classnames(handles.verticalListTopLink, 'pv3 fw7')
  const listClasses = classnames(
    handles.verticalList,
    'flex flex-column pv2 c-muted-3 list pa0'
  )
  const menuItemClasses = classnames(handles.menuItem)
  const hasList = (navigation?.items.length ?? 0) > 0

  return (
    <div className={wrapperClasses}>
      {navigationItem && (
        <TopItem
          id={navigationItem.id}
          className={topLinkClasses}
          navigationItem={navigationItem}
        />
      )}
      {hasList && (
        <ul className={listClasses}>
          {navigation?.items.map(item => (
            <li key={item.id} className={handles.verticalListItemContainer}>
              {ListItem ? (
                <ListItem id={item.id} navigationItem={item} />
              ) : (
                <MenuItem
                  id={item.id}
                  navigationItem={item}
                  className={menuItemClasses}
                />
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
