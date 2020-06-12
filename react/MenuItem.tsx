import React from 'react'
import { useCssHandles } from 'vtex.css-handles'

const CSS_HANDLES = ['menuItem', 'menuItemLabel', 'menuItemContent'] as const

export default function MenuItem({ children, link, label, Submenu }: any) {
  const handles = useCssHandles(CSS_HANDLES)
  const hasChildren = React.Children.count(children) > 0

  if (!hasChildren && !label) {
    return null
  }

  return (
    /* This navigationItem.link might be undefined, but thats ok
     * https://stackoverflow.com/a/10510353
     */
    <a className={handles.menuItem} href={link}>
      {label && <span className={handles.menuItemLabel}>{label}</span>}
      {Submenu && <Submenu />}
      {hasChildren && <div className={handles.menuItemContent}>{children}</div>}
    </a>
  )
}
