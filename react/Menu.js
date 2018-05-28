import React, { Component } from 'react'
import PropTypes from 'prop-types'
import VTEXClasses from './constants/CSSClasses'
import Options from './constants/Options'
import { intlShape, injectIntl } from 'react-intl'

import { Link } from 'render'

import './global.css'

const GLOBAL_PAGES = global.__RUNTIME__ && Object.keys(global.__RUNTIME__.pages)

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

  getParams = params => {
    const json = {}
    if (params) {
      const array = params.split(',')
      array.forEach(item => {
        const pair = item.split('=')
        json[pair[0]] = pair[1]
      })
      return json
    }
  }

  renderLink(link) {
    let className = 'f6 link dib white dim mr3 mr4-ns'
    switch (link.position) {
      case Options.LEFT:
        className = `${VTEXClasses.LINK_LEFT} ${className}`
        break
      case Options.MIDDLE:
        className = `${VTEXClasses.LINK_MIDDLE} ${className}`
        break
      case Options.RIGHT:
        className = `${VTEXClasses.LINK_RIGHT} ${className}`
        break
    }
    return (
      link.typeOfRoute === Options.INTERNAL
        ? <Link className={className} key={link.title} page={link.page} params={this.getParams(link.params)}>
            {link.title}
          </Link>
        : <a className={className} key={link.title} href={link.page} target="_blank">
            {link.title}
          </a>
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

MenuWithIntl.getSchema = props => {
  const dynamicProperties = {}

  const intl = MenuWithIntl.intl
  const descriptionIntl = (intl && intl.formatMessage({ id: 'menu.description' })) || 'A menu bar of links'
  const titleIntl = (intl && intl.formatMessage({ id: 'menu.title' })) || 'Title'
  const typeOfRouteIntl = (intl && intl.formatMessage({ id: 'menu.typeOfRoute' })) || 'Type of Route'
  const internalIntl = (intl && intl.formatMessage({ id: 'menu.typeOfRoute.internal' })) || 'Internal'
  const externalIntl = (intl && intl.formatMessage({ id: 'menu.typeOfRoute.external' })) || 'External'
  const internalPageTitle = (intl && intl.formatMessage({ id: 'menu.typeOfRoute.internal.pageTitle' })) || 'Target Page'
  const internalParamsTitle = (intl && intl.formatMessage({ id: 'menu.typeOfRoute.internal.paramsTitle' })) || 'Params'
  const internalParamsDescription = (intl && intl.formatMessage({ id: 'menu.typeOfRoute.internal.paramsDescription' })) || 'Comma separated params, e.g.: key=value,a=b,c=d'
  const externalPageTitle = (intl && intl.formatMessage({ id: 'menu.typeOfRoute.external.pageTitle' })) || 'URL (should start with https or http)'
  const numberOfItemsIntl = (intl && intl.formatMessage({ id: 'menu.numberOfItems' })) || 'Number of items'
  const positionIntl = (intl && intl.formatMessage({ id: 'menu.position' })) || 'Position'
  const leftIntl = (intl && intl.formatMessage({ id: 'menu.position.left' })) || 'Left'
  const middleIntl = (intl && intl.formatMessage({ id: 'menu.position.middle' })) || 'Middle'
  const rightIntl = (intl && intl.formatMessage({ id: 'menu.position.right' })) || 'Right'

  const menuLink = typeOfRoute => 
    typeOfRoute === Option.INTERNAL
      ? {
          page: {
            type: 'string',
            enum: GLOBAL_PAGES,
            title: internalPageTitle,
          },
          params: {
            type: 'string',
            description: internalParamsDescription,
            title: internalParamsTitle,
          },
        }
      : {
          page: {
            type: 'string',
            title: externalPageTitle
          },
        }

  for (let i = 1; i <= props.numberOfItems; i++) {
    dynamicProperties[`item${i}`] = {
      type: 'object',
      title: `Item #${i}`,
      required: ['title', 'typeOfRoute', 'position', 'page'],
      properties: {
        title: {
          title: titleIntl,
          type: 'string',
        },
        typeOfRoute: {
          title: typeOfRouteIntl,
          type: 'string',
          enum: [Options.INTERNAL, Options.EXTERNAL],
          enumNames: [internalIntl, externalIntl],
          default: Options.INTERNAL,
          widget: {
            'ui:widget': 'radio',
            'ui:options': {
              'inline': true,
            },
          },
        },
        ...menuLink((props[`item${i}`] && props[`item${i}`].typeOfRoute) || Options.INTERNAL),
        position: {
          title: positionIntl,
          type: 'string',
          enum: [Options.LEFT, Options.MIDDLE, Options.RIGHT],
          enumNames: [leftIntl, middleIntl, rightIntl],
          default: Options.MIDDLE,
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
