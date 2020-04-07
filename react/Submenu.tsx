import React from 'react'
import { useCssHandles } from 'vtex.css-handles'
import { BaseOverlay } from 'vtex.overlay-layout'
import { SubmenuProps, PossibleWrappedElements, WrapElements } from 'navigation'

import DefaultSubmenuList from './SubmenuList'
import useNavigation from './hooks/useNavigation'

const overlayClasses = {
  container: 'outline-0 bg-base pa5',
  popper: 'w-100',
}

function shouldWrap(element: PossibleWrappedElements, value: WrapElements) {
  return value === element || value === 'all'
}

const CSS_HANDLES = ['childrenWrapper', 'itemsWrapper'] as const

export default function Submenu(props: SubmenuProps) {
  const {
    navigation: { id, Item = DefaultSubmenuList },
    wrapElements = 'all',
    children: childrenProp,
  } = props
  const navigation = useNavigation(id)
  const handles = useCssHandles(CSS_HANDLES)

  if (!navigation) {
    return null
  }

  let items: JSX.Element | JSX.Element[] = navigation.items.map((_, i) => (
    <Item key={i} />
  ))
  if (shouldWrap('items', wrapElements)) {
    items = <div className={handles.itemsWrapper}>{items}</div>
  }

  let children = childrenProp

  if (shouldWrap('children', wrapElements)) {
    children = <div className={handles.childrenWrapper}>{childrenProp}</div>
  }

  return (
    <BaseOverlay classes={overlayClasses}>
      {items}
      {children}
    </BaseOverlay>
  )
}
