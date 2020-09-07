import React, { ReactNode } from 'react'

interface Props {
  children?: ReactNode
}

/**
 * ExtensionPoint Mocked Component.
 */
// eslint-disable-next-line jsx-a11y/anchor-is-valid
export const Link: React.FC<Props> = props => <a href="#">{props.children}</a>

export const useRuntime = () => ({
  getSettings: () => ({}),
})
