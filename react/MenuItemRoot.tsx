import React from 'react'
import classnames from 'classnames'
import { useCssHandles } from 'vtex.css-handles'
import { BaseTrigger } from 'vtex.overlay-layout'

import styles from './styles.css'

interface Props {
  Submenu: React.ComponentType
  link: string
  label: string
}

const CSS_HANDLES = ['menuItemContainer', 'menuItemLabel', 'link'] as const

export default function MenuItemRoot(props: Props) {
  const { link, label, Submenu } = props
  const handles = useCssHandles(CSS_HANDLES)

  const hasSubmenu = Boolean(Submenu)

  const containerClasses = classnames(
    handles.menuItemContainer,
    styles.cursorDefault
  )
  const linkClasses = classnames(
    handles.link,
    'pa4 flex items-center h-100 link c-on-base'
  )

  return (
    <BaseTrigger
      className={containerClasses}
      trigger={hasSubmenu ? 'click' : 'none'}
    >
      <a className={linkClasses} href={link}>
        {label && <span className={handles.menuItemLabel}>{label}</span>}
      </a>
      {hasSubmenu && <Submenu />}
    </BaseTrigger>
  )
}
