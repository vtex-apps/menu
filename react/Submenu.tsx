import React from 'react'
import { useCssHandles } from 'vtex.css-handles'
import { BaseOverlay } from 'vtex.overlay-layout'
import { SubmenuProps, PossibleWrappedElements, WrapElements } from 'navigation'

import useNavigation from './hooks/useNavigation'
import DefaultSubmenuList from './SubmenuItemHorizontalList'
import useMockConfig, { MockSubConfig } from './hooks/useMockConfig'

const overlayClasses = {
  container: 'outline-0 bg-base pa5 flex flex-column justify-between',
  popper: 'w-100',
}

function shouldWrap(element: PossibleWrappedElements, value: WrapElements) {
  return value === element
}

const CSS_HANDLES = ['childrenWrapper'] as const

export default function Submenu(props: SubmenuProps) {
  const { id, children, wrapElements = 'children' } = props
  const navigation = useNavigation(id)
  const handles = useCssHandles(CSS_HANDLES)
  // mock code
  let { SubmenuList = DefaultSubmenuList } = props
  const mockConfig = useMockConfig(id)
  let mockFoward: MockSubConfig | null = null
  if (mockConfig?.List) {
    SubmenuList = mockConfig?.List
    mockFoward = mockConfig.subConfig as MockSubConfig
  }

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
      {navigation && (
        <SubmenuList
          id={id}
          // mock code
          mockConfig={mockFoward}
          navigationItem={{ id, subNavigation: id }}
        />
      )}
      {maybeWrappedChildren}
    </BaseOverlay>
  )
}
