import React, { Component, ReactNode } from 'react'
import { PropTypes } from 'prop-types'

interface Props {
  children?: any
}

/**
 * ExtensionPoint Mocked Component.
 */
export class Link extends Component<Props> {
  static readonly propTypes: Props = {
    children: PropTypes.any,
  }
  render(): ReactNode {
    return <a href="#">{this.props.children}</a>
  }
}
