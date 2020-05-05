import React from 'react'
import classnames from 'classnames'
import { Link } from 'vtex.render-runtime'
import { useCssHandles } from 'vtex.css-handles'
import { BaseTrigger } from 'vtex.overlay-layout'
import { NavigationId, NavigationItem } from 'navigation'

import SubmenuDefault from './Submenu'

type TypeOfRoute = 'internal' | 'external'

interface Props {
  id: NavigationId
  navigationItem: NavigationItem
  children?: React.ReactNode
  className?: string
  typeOfRoute?: TypeOfRoute
  Submenu?: React.ComponentType
}

const CSS_HANDLES = [
  'topMenuItem',
  'topMenuItemLabel',
  'topMenuSubmenuTrigger',
  'topMenuItemExternal',
] as const

export default function MenuItemRoot(props: Props) {
  const {
    navigationItem,
    Submenu = SubmenuDefault,
    typeOfRoute = 'internal',
  } = props
  const handles = useCssHandles(CSS_HANDLES)

  const linkClasses = classnames(
    handles.topMenuItem,
    'pa4 flex items-center h-100 link c-on-base',
    {
      [handles.topMenuItemExternal]: typeOfRoute === 'external',
    }
  )

  const triggerClasses = classnames(
    handles.topMenuSubmenuTrigger,
    'h-100 pointer'
  )

  const target = typeOfRoute === 'internal' ? undefined : '_blank'

  return (
    <BaseTrigger
      className={triggerClasses}
      trigger={navigationItem.subNavigation ? 'click' : 'none'}
    >
      <Link className={linkClasses} to={navigationItem.link} target={target}>
        <span className={handles.topMenuItemLabel}>{navigationItem.label}</span>
      </Link>
      {navigationItem.subNavigation && (
        <Submenu id={navigationItem.subNavigation} />
      )}
    </BaseTrigger>
  )
}
