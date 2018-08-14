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
 * Links Menu Component. 
 * Shows a menu bar with links.
 */
export default class Menu extends Component {
  static propTypes = {
    /** Number of items. */
    numberOfItems: PropTypes.number.isRequired,
  }

  static defaultProps = {
    numberOfItems: 0,
  }
  
  static getSchema = props => {
    const schema = {
      title: 'editor.menu',
      description: 'editor.menu.description',
      type: 'object',
      properties: {
        numberOfItems: {
          title: 'editor.menu.numberOfItems',
          type: 'number',
          default: 0,
          minimum: 0,
          maximum: MAX_ITEMS,
          widget: {
            'ui:widget': 'range',
          },
        },
      },
    }

    const menuLink = typeOfRoute => 
      typeOfRoute === Options.INTERNAL
        ? {
            page: {
              type: 'string',
              enum: GLOBAL_PAGES,
              title: 'editor.menu.typeOfRoute.internal.pageTitle',
            },
            params: {
              type: 'string',
              description: 'editor.menu.typeOfRoute.internal.paramsDescription',
              title: 'editor.menu.typeOfRoute.internal.paramsTitle',
            },
          }
        : {
            page: {
              type: 'string',
              title: 'editor.menu.typeOfRoute.external.pageTitle',
            },
          }
  
    const dynamicProperties = props.numberOfItems && keyBy(
      map(range(1, props.numberOfItems), index => {
        return {
          type: 'object',
          title: { id: 'editor.menu.item', values: { id: index } },
          key: `item${index}`,
          required: [
            'title', 
            'typeOfRoute', 
            'position', 
            'page',
          ],
          properties: {
            title: {
              title: 'editor.menu.title',
              type: 'string',
            },
            typeOfRoute: {
              title: 'editor.menu.typeOfRoute',
              type: 'string',
              enum: [
                Options.INTERNAL, 
                Options.EXTERNAL,
              ],
              enumNames: [
                'editor.menu.typeOfRoute.internal',
                'editor.menu.typeOfRoute.external',
              ],
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
              title: 'editor.menu.position',
              type: 'string',
              enum: [
                Options.LEFT, 
                Options.MIDDLE, 
                Options.RIGHT,
              ],
              enumNames: [
                'editor.menu.position.left',
                'editor.menu.position.middle',
                'editor.menu.position.right',
              ],
              default: Options.MIDDLE,
            },
          },
        }
      }),
      property('key')
    )
  
    schema.properties = {
      ...schema.properties,
      ...dynamicProperties,
    }
  
    return schema
  }

  /**
   * Convert the string params to a js object
   */
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

  getValidPage = page => {
    if (!page || (!page.startsWith('http://') && !page.startsWith('https://'))) {
      page = `http://${page}`
    }
    return page
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
        ? <Link className={className} key={link.title} 
            page={link.page} params={this.getParams(link.params)}>
            {link.title}
          </Link>
        : <a className={className} key={link.title} 
            href={this.getValidPage(link.page)} target="_blank">
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
        <nav className="flex justify-between bg-near-black">
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
