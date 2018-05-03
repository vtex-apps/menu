import React, { Component } from 'react'
import { PropTypes } from 'prop-types'

/**
 * ExtensionPoint Mocked Component.
 */
export class Link extends Component {
  static propTypes = {
    children: PropTypes.any,
  }
  render() {
    return <a href="#">{this.props.children}</a>
  }
}
