import React from 'react'
import { useCssHandles } from 'vtex.css-handles'
import { BaseOverlay } from 'vtex.overlay-layout'
import { SubmenuProps, PossibleWrappedElements, WrapElements } from 'navigation'

import DefaultSubmenuItem from './SubmenuItem'
import useNavigation from './hooks/useNavigation'

const overlayClasses = {
  container: 'outline-0 bg-base pa5 flex justify-between',
  popper: 'w-100',
}

function shouldWrap(element: PossibleWrappedElements, value: WrapElements) {
  return value === element || value === 'all'
}

const CSS_HANDLES = ['childrenWrapper', 'itemsWrapper'] as const

export default function Submenu(props: SubmenuProps) {
  const {
    navigation: { id, Item = DefaultSubmenuItem },
    wrapElements = 'all',
    children,
  } = props
  const navigation = useNavigation(id)
  const handles = useCssHandles(CSS_HANDLES)

  if (!navigation) {
    return null
  }

  let items: JSX.Element | JSX.Element[] = navigation.items.map((item, i) => (
    <Item id={item.id} navigation={item} key={i} />
  ))
  if (items.length > 0 && shouldWrap('items', wrapElements)) {
    items = <div className={handles.itemsWrapper}>{items}</div>
  }

  let maybeWrappedChildren = children

  if (
    children &&
    React.Children.count(children) > 0 &&
    shouldWrap('children', wrapElements)
  ) {
    maybeWrappedChildren = (
      <div className={handles.childrenWrapper}>{children}</div>
    )
  }

  return (
    <BaseOverlay classes={overlayClasses}>
      {items}
      {maybeWrappedChildren}
    </BaseOverlay>
  )
}
