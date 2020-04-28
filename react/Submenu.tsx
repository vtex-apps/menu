import React from 'react'
import { useCssHandles } from 'vtex.css-handles'
import { BaseOverlay } from 'vtex.overlay-layout'
import { SubmenuProps, PossibleWrappedElements, WrapElements } from 'navigation'

import DefaultSubmenuList from './SubmenuItemHorizontalList'
import useNavigation from './hooks/useNavigation'

const overlayClasses = {
  container: 'outline-0 bg-base pa5 flex flex-column justify-between',
}

function shouldWrap(element: PossibleWrappedElements, value: WrapElements) {
  return value === element
}

const CSS_HANDLES = ['childrenWrapper'] as const

export default function Submenu(props: SubmenuProps) {
  const {
    id,
    children,
    wrapElements = 'children',
    SubmenuList = DefaultSubmenuList,
  } = props
  const navigation = useNavigation(id)
  const handles = useCssHandles(CSS_HANDLES)

  let maybeWrappedChildren = children
  if (
    React.Children.count(children) > 0 &&
    shouldWrap('children', wrapElements)
  ) {
    maybeWrappedChildren = (
      <div className={handles.childrenWrapper}>{children}</div>
    )
  }

  return (
    <BaseOverlay classes={overlayClasses}>
      {navigation && <SubmenuList id={id} />}
      {maybeWrappedChildren}
    </BaseOverlay>
  )
}
