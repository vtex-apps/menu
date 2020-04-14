import React from 'react'
import classnames from 'classnames'
import { useCssHandles } from 'vtex.css-handles'
import { NavigationItem, NavigationId } from 'navigation'

import MenuItemDefault from './MenuItem'
import useNavigation from './hooks/useNavigation'

interface Props {
  id: NavigationId
  navigationItem?: NavigationItem
  TopItem?: React.ComponentType
  ListItem?: React.ComponentType
  linkItemClasses?: string
}

const CSS_HANDLES = [
  'verticalListWrapper',
  'submenuTopLink',
  'submenuVerticalList',
  'submenuVerticalListItem',
] as const

export default function SubmenuItemList(props: Props) {
  const {
    navigationItem,
    TopItem = MenuItemDefault,
    ListItem = MenuItemDefault,
    linkItemClasses,
  } = props
  const subNavigation = navigationItem?.subNavigation
  const handles = useCssHandles(CSS_HANDLES)
  const navigation = useNavigation(subNavigation)

  const wrapperClasses = classnames(
    handles.verticalListWrapper,
    'flex flex-column items-start'
  )
  const topLinkClasses = classnames(
    handles.submenuTopLink,
    linkItemClasses,
    'link pv3 fw7 t-body'
  )
  const listClasses = classnames(
    handles.submenuVerticalList,
    'flex flex-column pv2 c-muted-3'
  )
  const listItemClasses = classnames(
    handles.submenuVerticalListItem,
    'link t-body'
  )
  const hasList = (navigation?.items.length ?? 0) > 0

  return (
    <div className={wrapperClasses}>
      {navigationItem && (
        <TopItem
          id={navigationItem.id}
          linkItemClasses={topLinkClasses}
          navigationItem={navigationItem}
        />
      )}
      {hasList && (
        <div className={listClasses}>
          {navigation?.items?.map(item => (
            <ListItem
              id={item.id}
              key={item.id}
              navigationItem={item}
              linkItemClasses={listItemClasses}
            />
          ))}
        </div>
      )}
    </div>
  )
}
