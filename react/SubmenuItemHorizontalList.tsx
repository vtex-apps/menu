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
  'horizontalListWrapper',
  'submnuTopLink',
  'submenuHorizontalList',
] as const

export default function SubmenuItemHorizontalList(props: Props) {
  const { id, navigationItem, linkItemClasses } = props
  // mock code
  const { mockConfig } = props
  let { TopItem = MenuItemDefault, ListItem = MenuItemDefault } = props
  const subNavigation = navigationItem?.subNavigation
  const handles = useCssHandles(CSS_HANDLES)
  const navigationId = subNavigation ?? id
  const navigation = useNavigation(navigationId)

  const topLinkClasses = classnames(handles.submnuTopLink, linkItemClasses, '')
  const listClasses = classnames(
    handles.submenuHorizontalList,
    'w-100 flex justify-around'
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
    <div className={handles.horizontalListWrapper}>
      {navigationItem && (
        <TopItem
          // mock code
          mockConfig={null}
          id={navigationItem.id}
          navigationItem={navigationItem}
          linkItemClasses={topLinkClasses}
        />
      )}
      {hasList && (
        <div className={listClasses}>
          {navigation?.items.map(item => (
            <ListItem
              // mock code
              mockConfig={mockFoward}
              id={item.id}
              key={item.id}
              navigationItem={item}
            />
          ))}
        </div>
      )}
    </div>
  )
}
