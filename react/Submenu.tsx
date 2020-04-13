import React from 'react'
import classnames from 'classnames'
import { useCssHandles } from 'vtex.css-handles'
import { BaseOverlay } from 'vtex.overlay-layout'
import { SubmenuProps, PossibleWrappedElements, WrapElements } from 'navigation'

import DefaultSubmenuList from './SubmenuItemHorizontalList'
import useNavigation from './hooks/useNavigation'

const overlayClasses = {
  container: 'outline-0 bg-base pa5 flex flex-column justify-between',
  popper: 'w-100',
}

function shouldWrap(element: PossibleWrappedElements, value: WrapElements) {
  return value === element
}

const CSS_HANDLES = ['childrenWrapper', 'titleContainer', 'title'] as const

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

  const titleContainerClasses = classnames(
    handles.titleContainer,
    'flex justify-center'
  )
  const titleClasses = classnames(handles.titleContainer, '')

  return (
    <BaseOverlay classes={overlayClasses}>
      {navigation?.title && (
        <div className={titleContainerClasses}>
          {/* eslint-disable-next-line @typescript-eslint/no-non-null-assertion */}
          <span className={titleClasses}>{navigation!.title}</span>
        </div>
      )}
      {navigation && <SubmenuList id={id} />}
      {maybeWrappedChildren}
    </BaseOverlay>
  )
}
