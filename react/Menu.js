import React, { Component } from 'react'
import PropTypes from 'prop-types'
import VTEXClasses from './CSSClasses'
import { intlShape, injectIntl } from 'react-intl'

import { Link } from 'render'

import './global.css'

const MAX_ITEMS = 10

/**
 * Links Menu Component. Shows a menu bar with links.
 */
class Menu extends Component {
  constructor(props) {
    super(props)
    MenuWithIntl.intl = props.intl
    MenuWithIntl.uiSchema = MenuWithIntl.getUiSchema()
  }

  static defaultProps = {
    numberOfItems: 0,
  }

  static propTypes = {
    /** Number of items. */
    numberOfItems: PropTypes.number.isRequired,
    /** Intl instance. */
    intl: intlShape.isRequired,
  }

  componentWillReceiveProps(props) {
    if (this.props.intl !== props.intl) {
      MenuWithIntl.intl = props.intl
      MenuWithIntl.uiSchema = MenuWithIntl.getUiSchema()
    }
  }

  renderLink(link) {
    let className = 'f6 link dib white dim mr3 mr4-ns'
    switch (link.position) {
      case 'LEFT':
        className = `${VTEXClasses.LINK_LEFT} ${className}`
        break
      case 'MIDDLE':
        className = `${VTEXClasses.LINK_MIDDLE} ${className}`
        break
      case 'RIGHT':
        className = `${VTEXClasses.LINK_RIGHT} ${className}`
        break
    }
    return (
      <Link key={link.title} className={`${className}`} page={link.url}>
        {link.title}
      </Link>
    )
  }

  getLinksFromProps() {
    const links = []
    for (let i = 1; i <= this.props.numberOfItems; i++) {
      this.props[`item${i}`] && links.push(this.props[`item${i}`])
    }
    return links
  }

  render() {
    const links = this.getLinksFromProps()
    return (
      <div className={`${VTEXClasses.MAIN_CLASS} w-100 dn db-ns`}>
        <nav className="flex justify-between bb b--white-10 bg-near-black">
          <div className="flex-grow pa3 flex items-center">
            {links.filter(link => link['position'] === 'LEFT').map(link => {
              return this.renderLink(link)
            })}
          </div>
          <div className="flex-grow pa3 flex items-center">
            {links.filter(link => link['position'] === 'MIDDLE').map(link => {
              return this.renderLink(link)
            })}
          </div>
          <div className="flex-grow pa3 flex items-center">
            {links.filter(link => link['position'] === 'RIGHT').map(link => {
              return this.renderLink(link)
            })}
          </div>
        </nav>
      </div>
    )
  }
}

const MenuWithIntl = injectIntl(Menu)

MenuWithIntl.getUiSchema = () => {
  const intl = MenuWithIntl.intl
  const titleIntl = (intl && intl.formatMessage({ id: 'menu.title' })) || 'Title'

  const uiSchema = {
    numberOfItems: {
      'ui:widget': 'range',
    },
  }
  for (let i = 1; i <= MAX_ITEMS; i++) {
    uiSchema[`item${i}`] = {
      title: { 'ui:placeholder': titleIntl },
      url: { 'ui:placeholder': 'URL' },
      position: {
        'ui:widget': 'radio',
        'ui:options': { 'inline': true },
      },
    }
  }
  return uiSchema
}

MenuWithIntl.getSchema = ({ numberOfItems }) => {
  const dynamicProperties = {}

  const intl = MenuWithIntl.intl
  const descriptionIntl = (intl && intl.formatMessage({ id: 'menu.description' })) || 'A menu bar of links'
  const titleIntl = (intl && intl.formatMessage({ id: 'menu.title' })) || 'Title'
  const numberOfItemsIntl = (intl && intl.formatMessage({ id: 'menu.numberOfItems' })) || 'Number of items'
  const positionIntl = (intl && intl.formatMessage({ id: 'menu.position' })) || 'Position'
  const leftIntl = (intl && intl.formatMessage({ id: 'menu.position.left' })) || 'LEFT'
  const middleIntl = (intl && intl.formatMessage({ id: 'menu.position.middle' })) || 'MIDDLE'
  const rightIntl = (intl && intl.formatMessage({ id: 'menu.position.right' })) || 'RIGHT'

  for (let i = 1; i <= numberOfItems; i++) {
    dynamicProperties[`item${i}`] = {
      type: 'object',
      title: `Item #${i}`,
      required: ['title', 'url', 'position'],
      properties: {
        title: {
          title: titleIntl,
          type: 'string',
        },
        url: {
          title: 'URL',
          type: 'string',
        },
        position: {
          title: positionIntl,
          type: 'string',
          enum: ['LEFT', 'MIDDLE', 'RIGHT'],
          enumNames: [leftIntl, middleIntl, rightIntl],
          default: 'MIDDLE',
        },
      },
    }
  }
  const schema = {
    title: 'Menu',
    description: descriptionIntl,
    type: 'object',
    properties: {
      numberOfItems: {
        title: numberOfItemsIntl,
        type: 'number',
        default: 0,
        minimum: 0,
        maximum: MAX_ITEMS,
      },
    },
  }

  schema.properties = {
    ...schema.properties,
    ...dynamicProperties,
  }

  return schema
}

export default MenuWithIntl
