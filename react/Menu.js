import React, { Component } from 'react'
import PropTypes from 'prop-types'
import VTEXClasses from './CSSClasses'

import { Link } from 'render'

import './global.css'

/**
 * Links Menu Component. Shows a menu bar with links.
 */
class Menu extends Component {
  getAccountName() {
    return global.__RUNTIME__ && global.__RUNTIME__.account
  }

  renderLink(link) {
    let className = 'f6 link dib white dim mr3 mr4-ns'
    switch (link.position) {
      case 'LEFT':
        className = `${VTEXClasses.LINK_LEFT} link white-70 hover-white no-underline flex items-left pa3`
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
    for (let i = 0; i < this.props.numberOfMenus; i++) {
      this.props[`menu${i}`] && links.push(this.props[`menu${i}`])
    }
    return links
  }

  render() {
    const links = this.getLinksFromProps()
    return (
      <div className={`${VTEXClasses.MAIN_CLASS} w-100`}>
        <nav className="flex justify-between bb b--white-10 bg-near-black">
          <div className="flex-grow pa3 flex items-center">
            {links.filter((link) => link['position'] === 'LEFT').map((link2) => {
              return this.renderLink(link2)
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
            <Link className={'f8 link dib white dim mr3 mr4-ns clear-link'} page="/">
              {this.getAccountName()}
            </Link>
          </div>
        </nav>
      </div>
    )
  }
}

Menu.getSchema = ({ numberOfMenus }) => {
  const dynamicProperties = {}

  for (let i = 0; i < numberOfMenus; i++) {
    dynamicProperties[`menu${i}`] = {
      type: 'object',
      title: `Menu ${i}`,
      properties: {
        title: {
          title: 'Title',
          type: 'string',
        },
        url: {
          title: 'URL',
          type: 'string',
        },
        position: {
          title: 'Position',
          type: 'string',
          enum: ['LEFT', 'MIDDLE', 'RIGHT'],
          default: 'MIDDLE',
        },
      },
    }
  }

  const schema = {
    title: 'Menu',
    description: 'A menu bar of links',
    type: 'object',
    properties: {
      numberOfMenus: {
        title: 'Number of Menus',
        type: 'number',
        default: 0,
      },
    },
  }

  schema.properties = {
    ...schema.properties,
    ...dynamicProperties,
  }

  return schema
}

Menu.defaultProps = {
  numberOfMenus: 0,
}

Menu.propTypes = {
  /** Number of menu links. */
  numberOfMenus: PropTypes.number.isRequired,
}

export default Menu
