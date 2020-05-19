import React, { ReactNode } from 'react'

interface Props {
  children?: ReactNode
}

/**
 * ExtensionPoint Mocked Component.
 */
export const Container: React.FC<Props> = props => (
  <section>{props.children}</section>
)
