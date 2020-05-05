import React from 'react'
import classnames from 'classnames'
import { Link } from 'vtex.render-runtime'
import { useCssHandles } from 'vtex.css-handles'
import { NavigationId, NavigationItem } from 'navigation'

type TypeOfRoute = 'internal' | 'external'

interface Props {
  id: NavigationId
  className?: string
  children?: React.ReactNode
  navigationItem: NavigationItem
  typeOfRoute?: TypeOfRoute
}

const CSS_HANDLES = [
  'menuItem',
  'menuItemLabel',
  'menuItemContent',
  'menuItemExternal',
] as const

export default function MenuItem(props: Props) {
  const {
    children,
    className,
    typeOfRoute = 'internal',
    navigationItem: { link, label },
  } = props
  const handles = useCssHandles(CSS_HANDLES)
  const hasChildren = React.Children.count(children) > 0
  const linkClasses = classnames(handles.menuItem, className, 'link t-body', {
    [handles.menuItemExternal]: typeOfRoute === 'external',
  })
  const target = typeOfRoute === 'internal' ? undefined : '_blank'

  if (!hasChildren && !label) {
    return null
  }

  return (
    <Link className={linkClasses} to={link} target={target}>
      {label && <span className={handles.menuItemLabel}>{label}</span>}
      {hasChildren && <div className={handles.menuItemContent}>{children}</div>}
    </Link>
  )
}
