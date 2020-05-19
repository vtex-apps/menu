import React, { ReactNode } from 'react'

interface Props {
  children?: ReactNode
}

/**
 * ExtensionPoint Mocked Component.
 */
export const Container: React.FC<Props> = props => (
  // eslint-disable-next-line jsx-a11y/anchor-is-valid
  <a href="#">{props.children}</a>
)
