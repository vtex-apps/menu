import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './global.css'

const VTEXClasses = {
  MAIN_CLASS: 'vtex-menu',
}

/**
 * Links Menu Component. Shows a menu bar with links.
 */
class Menu extends Component {
  getAccountName() {
    return global.__RUNTIME__ && global.__RUNTIME__.account
  }

  renderLink(link) {
    let className = 'f6 link dib white dim mr3 mr4-ns'
    if (link.position === 'LEFT') {
      className = 'link white-70 hover-white no-underline flex items-left pa3'
    }
    return (
      <a className={className} href={link.url}>
        {link.title}
      </a>
    )
  }

  getLinksFromProps() {
    const links = []
    for (const prop in this.props) {
      if (prop.includes('menu')) {
        links.push(this.props[prop])
      }
    }
    return links
  }

  render() {
    const links = this.getLinksFromProps()
    return (
      <div className={`${VTEXClasses.MAIN_CLASS} w-100`}>
        <nav className="flex justify-between bb b--white-10 bg-near-black">
          <div className="flex-grow pa3 flex items-center">
            {links.map(link => {
              if (link.position === 'LEFT') {
                return this.renderLink(link)
              }
            })}
          </div>
          <div className="flex-grow pa3 flex items-center">
            <a className="f6 link dib white dim mr3 mr4-ns" href="#0">Meus Pedidos</a>
            {links.map(link => {
              if (link.position === 'MIDDLE') {
                return this.renderLink(link)
              }
            })}
          </div>
          <div className="flex-grow pa3 flex items-center">
            {links.map(link => {
              if (link.position === 'RIGHT') {
                return this.renderLink(link)
              }
            })}
            <a className="f8 link dib white dim mr3 mr4-ns" href="#0">
              {this.getAccountName()}
            </a>
          </div>
        </nav>
      </div>
    )
  }
}

Menu.getSchema = ({ numberOfMenus }) => {
  const dynamicProperties = {}

  for (let i = 1; i <= numberOfMenus; i++) {
    dynamicProperties[`menu${i}`] = {
      type: 'object',
      properties: {
        title: {
          title: `Menu ${i} (Title)`,
          type: 'string',
        },
        url: {
          title: `Menu ${i} (URL)`,
          type: 'string',
        },
        position: {
          title: `Menu ${i} (Position)`,
          type: 'string',
          enum: ['LEFT', 'MIDDLE', 'RIGHT'],
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
  numberOfMenus: 1,
}

Menu.propTypes = {
  /** Number of menu links. */
  numberOfMenus: PropTypes.number.isRequired,
}

export default Menu
