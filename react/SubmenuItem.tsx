import React from 'react'
import { useCssHandles } from 'vtex.css-handles'
import { NavigationItem, NavigationId } from 'navigation'

interface Props {
  id: NavigationId
  navigation: NavigationItem
}

const CSS_HANDLES = ['submenuItemWrapper', 'submenuLink'] as const

export default function SubmenuItem(props: Props) {
  const {
    navigation: { label, link },
  } = props
  const handles = useCssHandles(CSS_HANDLES)

  return (
    <div className={handles.submenuItemWrapper}>
      <a className={handles.submenuLink} href={link}>
        {label}
      </a>
    </div>
  )
}
