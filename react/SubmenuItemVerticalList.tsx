import React from 'react'
import classnames from 'classnames'
import { useCssHandles } from 'vtex.css-handles'
import { NavigationItem, NavigationId } from 'navigation'

import MenuItemDefault from './MenuItem'
import useNavigation from './hooks/useNavigation'
// mock code
import { MockSubConfig } from './hooks/useMockConfig'

interface Props {
  id: NavigationId
  navigationItem?: NavigationItem
  TopItem?: React.ComponentType
  ListItem?: React.ComponentType
  linkItemClasses?: string
  // mock code
  mockConfig: MockSubConfig | null
}

const CSS_HANDLES = [
  'verticalListWrapper',
  'submenuTopLink',
  'submenuVerticalList',
  'submenuVerticalListItem',
] as const

export default function SubmenuItemList(props: Props) {
  const { navigationItem, linkItemClasses } = props
  // mock code
  const { mockConfig } = props
  let { TopItem = MenuItemDefault, ListItem = MenuItemDefault } = props
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
  // mock code
  let mockFoward: MockSubConfig | null = null
  if (mockConfig) {
    if (typeof mockConfig.ListItem === 'function') {
      ListItem = mockConfig.ListItem
    } else if (typeof mockConfig.ListItem === 'object') {
      ListItem = mockConfig.List as any
      mockFoward = mockConfig.ListItem
    }

    TopItem = mockConfig.TopItem
  }

  return (
    <div className={wrapperClasses}>
      {navigationItem && (
        <TopItem
          // mock code
          mockConfig={null}
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
              // mock code
              mockConfig={mockFoward}
              linkItemClasses={listItemClasses}
            />
          ))}
        </div>
      )}
    </div>
  )
}
