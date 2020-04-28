import React from 'react'
import classnames from 'classnames'
import { useCssHandles } from 'vtex.css-handles'
import { NavigationItem, NavigationId } from 'navigation'

import MenuItemDefault from './MenuItem'
import useNavigation from './hooks/useNavigation'
import MenuListItemDefault from './SubmenuItemVerticalList'

interface Props {
  id: NavigationId
  navigationItem?: NavigationItem
  TopItem?: React.ComponentType
  ListItem?: React.ComponentType
  linkItemClasses?: string
}

const CSS_HANDLES = [
  'horizontalListWrapper',
  'submnuTopLink',
  'submenuHorizontalList',
] as const

export default function SubmenuItemHorizontalList(props: Props) {
  const {
    id,
    navigationItem,
    linkItemClasses,
    TopItem = MenuItemDefault,
    ListItem = MenuListItemDefault,
  } = props
  const navigationId = navigationItem?.subNavigation ?? id
  const handles = useCssHandles(CSS_HANDLES)
  const navigation = useNavigation(navigationId)

  const hasList = (navigation?.items.length ?? 0) > 0
  const topLinkClasses = classnames(handles.submnuTopLink, linkItemClasses, '')
  const listClasses = classnames(
    handles.submenuHorizontalList,
    'w-100 flex justify-around'
  )

  return (
    <div className={handles.horizontalListWrapper}>
      {navigationItem && (
        <TopItem
          id={navigationItem.id}
          navigationItem={navigationItem}
          linkItemClasses={topLinkClasses}
        />
      )}
      {hasList && (
        <div className={listClasses}>
          {navigation?.items.map(item => (
            <ListItem id={item.id} key={item.id} navigationItem={item} />
          ))}
        </div>
      )}
    </div>
  )
}
