import React, { Component } from 'react'
import PropTypes from 'prop-types'
import VTEXClasses from './constants/CSSClasses'
import Options from './constants/Options'
import { intlShape, injectIntl } from 'react-intl'

import keyBy from 'lodash/keyBy'
import map from 'lodash/map'
import range from 'lodash/range'
import property from 'lodash/property'

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
            {links.filter(link => link['position'] === Options.LEFT).map(link => {
              return this.renderLink(link)
            })}
          </div>
          <div className="flex-grow pa3 flex items-center">
            {links.filter(link => link['position'] === Options.MIDDLE).map(link => {
              return this.renderLink(link)
            })}
          </div>
          <div className="flex-grow pa3 flex items-center">
            {links.filter(link => link['position'] === Options.RIGHT).map(link => {
              return this.renderLink(link)
            })}
          </div>
        </nav>
      </div>
    )
  }
}

const MenuWithIntl = injectIntl(Menu)

const getFormattedMessage = (messageId, defaultMessage) => {
  const intl = MenuWithIntl.intl
  return (intl && intl.formatMessage({ id: messageId })) || defaultMessage
}

MenuWithIntl.getUiSchema = () => {
  const uiSchema = {
    numberOfItems: {
      'ui:widget': 'range',
    },
  }
  for (let i = 1; i <= MAX_ITEMS; i++) {
    uiSchema[`item${i}`] = {
      title: { 'ui:placeholder': getFormattedMessage('menu.title', 'Title') },
      position: {
        'ui:widget': 'radio',
        'ui:options': { 'inline': true },
      },
    }
  }
  return uiSchema
}

MenuWithIntl.getSchema = props => {
  const descriptionIntl = getFormattedMessage('menu.description', 'A menu bar of links')
  const titleIntl = getFormattedMessage('menu.title', 'Title')
  const typeOfRouteIntl = getFormattedMessage('menu.typeOfRoute', 'Type of Route')
  const internalIntl = getFormattedMessage('menu.typeOfRoute.internal', 'Internal')
  const externalIntl = getFormattedMessage('menu.typeOfRoute.external', 'External')
  const internalPageTitle = getFormattedMessage('menu.typeOfRoute.internal.pageTitle', 'Target Page')
  const internalParamsTitle = getFormattedMessage('menu.typeOfRoute.internal.paramsTitle', 'Params')
  const internalParamsDescription = getFormattedMessage('menu.typeOfRoute.internal.paramsDescription', 'Comma separated params, e.g.: key=value,a=b,c=d')
  const externalPageTitle = getFormattedMessage('menu.typeOfRoute.external.pageTitle', 'URL (should start with https or http)')
  const numberOfItemsIntl = getFormattedMessage('menu.numberOfItems', 'Number of items')
  const positionIntl = getFormattedMessage('menu.position', 'Position')
  const leftIntl = getFormattedMessage('menu.position.left', 'Left')
  const middleIntl = getFormattedMessage('menu.position.middle', 'Middle')
  const rightIntl = getFormattedMessage('menu.position.right', 'Right')

  const menuLink = typeOfRoute => 
    typeOfRoute === Options.INTERNAL
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
      
    const getDynamicProps = numberOfItems =>
      keyBy(
        map(range(1, numberOfItems + 1), index => {
          return {
            type: 'object',
            title: `Item #${index}`,
            key: `item${index}`,
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
              ...menuLink((props[`item${index}`] && props[`item${index}`].typeOfRoute) || Options.INTERNAL),
              position: {
                title: positionIntl,
                type: 'string',
                enum: [Options.LEFT, Options.MIDDLE, Options.RIGHT],
                enumNames: [leftIntl, middleIntl, rightIntl],
                default: Options.MIDDLE,
              },
            },
          }
        }),
        property('key')
      )

  const dynamicProperties = props.numberOfItems && getDynamicProps(props.numberOfItems)

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
