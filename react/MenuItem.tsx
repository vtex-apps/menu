import React from 'react'
import classnames from 'classnames'
import { useCssHandles } from 'vtex.css-handles'
import { MenuItemLeafProps as Props } from 'navigation'

const CSS_HANDLES = ['menuItem', 'menuItemLabel', 'menuItemContent']

export default function MenuItem(props: Props) {
  const {
    children,
    className,
    navigationItem: { link, label },
  } = props
  const handles = useCssHandles(CSS_HANDLES)
  const hasChildren = React.Children.count(children) > 0
  const linkClasses = classnames(handles.menuItemm, className)

  return (
    /* This navigationItem.link might be undefined, but thats ok
     * https://stackoverflow.com/a/10510353
     */
    <a className={linkClasses} href={link}>
      {label && <span className={handles.menuItemLabel}>{label}</span>}
      {hasChildren && <div className={handles.menuItemContent}>{children}</div>}
    </a>
  )
}
