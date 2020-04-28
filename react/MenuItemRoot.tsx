import React from 'react'
import classnames from 'classnames'
import { MenuItemProps } from 'navigation'
import { useCssHandles } from 'vtex.css-handles'
import { BaseTrigger } from 'vtex.overlay-layout'

import styles from './styles.css'
import SubmenuDefault from './Submenu'
import MenuItemDefault from './MenuItem'

interface Props extends MenuItemProps {
  Submenu?: React.ComponentType
  MenuItem?: React.ComponentType<MenuItemProps>
}

const CSS_HANDLES = ['menuItem', 'link'] as const

export default function MenuItemRoot(props: Props) {
  const {
    navigationItem,
    Submenu = SubmenuDefault,
    MenuItem = MenuItemDefault,
  } = props
  const handles = useCssHandles(CSS_HANDLES)

  const containerClasses = classnames(handles.menuItem, styles.cursorDefault)
  const linkClasses = classnames(
    handles.link,
    'pa4 flex items-center h-100 link c-on-base'
  )

  return (
    <BaseTrigger
      className={containerClasses}
      trigger={navigationItem.subNavigation ? 'click' : 'none'}
    >
      <MenuItem
        id={navigationItem.id}
        linkItemClasses={linkClasses}
        navigationItem={navigationItem}
      />
      {navigationItem.subNavigation && (
        <Submenu id={navigationItem.subNavigation} />
      )}
    </BaseTrigger>
  )
}
