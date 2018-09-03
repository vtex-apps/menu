import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Link } from 'render'

import VTEXClasses from './constants/CSSClasses'
import Options from './constants/Options'

const GLOBAL_PAGES = global.__RUNTIME__ && Object.keys(global.__RUNTIME__.pages)

const MAX_ITEMS = 10

/**
 * Links Menu Component.
 * Shows a menu bar with links.
 */
export default class Menu extends Component {
  static propTypes = {
    links: PropTypes.arrayOf(
      PropTypes.shape({
        /** Pages editor item title */
        __editorItemTitle: PropTypes.string,
        /** Internal page to redirect */
        internalPage: PropTypes.string,
        /** Params to redirect to internal page */
        params: PropTypes.string,
        /** External page to redirect */
        externalPage: PropTypes.string,
        /** Type of Route (internal or external) */
        typeOfRoute: PropTypes.string,
        /** Link position */
        position: PropTypes.string,
      })
    ),
  }

  static schema = {
    title: 'editor.menu',
    description: 'editor.menu.description',
    type: 'object',
    properties: {
      links: {
        title: 'editor.menu.links',
        type: 'array',
        minItems: 0,
        maxItems: MAX_ITEMS,
        items: {
          title: 'editor.menu.links.link',
          type: 'object',
          properties: {
            internalPage: {
              title: 'editor.menu.links.link.internalPage',
              description: 'editor.menu.links.link.internalPage.description',
              type: 'string',
              enum: GLOBAL_PAGES,
            },
            params: {
              title: 'editor.menu.links.link.params',
              description: 'editor.menu.links.link.params.description',
              type: 'string',
            },
            externalPage: {
              title: 'editor.menu.links.link.externalPage',
              description: 'editor.menu.links.link.externalPage.description',
              type: 'string',
            },
            typeOfRoute: {
              title: 'editor.menu.links.link.typeOfRoute',
              type: 'string',
              enum: [Options.INTERNAL, Options.EXTERNAL],
              enumNames: [
                'editor.menu.links.link.typeOfRoute.internal',
                'editor.menu.links.link.typeOfRoute.external',
              ],
              default: Options.INTERNAL,
              widget: {
                'ui:widget': 'radio',
                'ui:options': {
                  inline: true,
                },
              },
            },
            position: {
              title: 'editor.menu.links.link.position',
              type: 'string',
              enum: [Options.LEFT, Options.MIDDLE, Options.RIGHT],
              enumNames: [
                'editor.menu.links.link.position.left',
                'editor.menu.links.link.position.middle',
                'editor.menu.links.link.position.right',
              ],
              default: Options.MIDDLE,
            },
          },
        },
      },
    },
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
    if (
      !page ||
      (!page.startsWith('http://') && !page.startsWith('https://'))
    ) {
      page = `http://${page}`
    }
    return page
  }

  renderLink(link, index) {
    let className = 'f6 link gray dib dim mr3 mr4-ns'
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
    return link.typeOfRoute === Options.INTERNAL ? (
      <Link
        className={className}
        key={`${link.title}-${link.position}-${index}`}
        page={link.page}
        params={this.getParams(link.params)}>
        {link.title}
      </Link>
    ) : (
      <a
        className={className}
        key={`${link.title}-${link.position}-${index}`}
        href={this.getValidPage(link.page)}
        target="_blank">
        {link.title}
      </a>
    )
  }

  render() {
    const links =
      this.props.links &&
      this.props.links.map(link => ({
        ...link,
        title: link.__editorItemTitle,
      }))

    return (
      links && (
        <div className={`${VTEXClasses.MAIN_CLASS} h2 gray w-100 dn db-ns`}>
          <nav className="flex justify-between">
            <div className="flex-grow pa3 flex items-center">
              {links
                .filter(link => link['position'] === Options.LEFT)
                .map((link, index) => {
                  return this.renderLink(link, index)
                })}
            </div>
            <div className="flex-grow pa3 flex items-center">
              {links
                .filter(link => link['position'] === Options.MIDDLE)
                .map((link, index) => {
                  return this.renderLink(link, index)
                })}
            </div>
            <div className="flex-grow pa3 flex items-center">
              {links
                .filter(link => link['position'] === Options.RIGHT)
                .map((link, index) => {
                  return this.renderLink(link, index)
                })}
            </div>
          </nav>
        </div>
      )
    )
  }
}
