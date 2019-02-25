import PropTypes from 'prop-types'
import React, { Component, ReactNode } from 'react'

import { Link } from 'vtex.render-runtime'
import { Container } from 'vtex.store-components'
import Options from './constants/Options'
import menu from './menu.css'
// This is required because is used in static schema attribute of Menu Component
const GLOBAL_PAGES =
  (global as any).__RUNTIME__ && Object.keys((global as any).__RUNTIME__.pages)

const MAX_ITEMS: number = 10

interface Link {
  text?: string
  internalPage?: string
  params?: string
  externalPage?: string
  typeOfRoute?: string
  page?: string
  position?: string
}

interface DefaultProps {
  links: Link[]
}

interface Options {
  LEFT: string
  MIDDLE: string
  RIGHT: string
  INTERNAL: string
  EXTERNAL: string
}

interface Props extends DefaultProps {}

/**
 * Links Menu Component.
 * Shows a menu bar with links.
 */
class Menu extends Component<Props> {
  public static propTypes = {
    links: PropTypes.arrayOf(
      PropTypes.shape({
        /** Link text */
        text: PropTypes.string,
        /** Internal page to redirect */
        internalPage: PropTypes.string,
        /** Params to redirect to internal page */
        params: PropTypes.string,
        /** External page to redirect */
        externalPage: PropTypes.string,
        /** Type of Route (internal or external) */
        typeOfRoute: PropTypes.string,
        /** Page route to redirect when clicked */
        page: PropTypes.string,
        /** Link position  */
        position: PropTypes.string,
      })
    ),
  }

  public static defaultProps: DefaultProps = {
    links: [],
  }

  public static schema: any = {
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
            text: {
              title: 'editor.menu.links.link.text',
              type: 'string',
            },
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
  private getParams = (params?: string): { [key: string]: string } => {
    const json: { [key: string]: string } = {}
    if (params) {
      const array: string[] = params.split(',')
      array.forEach((item: string) => {
        const pair: string[] = item.split('=')
        json[pair[0]] = pair[1]
      })
    }
    return json
  }

  private getValidPage = (page?: string): string => {
    if (
      !page ||
      (!page.startsWith('http://') && !page.startsWith('https://'))
    ) {
      page = `http://${page}`
    }
    return page
  }

  private renderLink(link: Link, index: number): ReactNode {
    let className: string = 't-small link c-muted-2 dib dim mr3 mr4-ns'
    switch (link.position) {
      case Options.LEFT:
        className = `${menu.linkLeft} ${className}`
        break
      case Options.MIDDLE:
        className = `${menu.linkMiddle} ${className}`
        break
      case Options.RIGHT:
        className = `${menu.linkRight} ${className}`
        break
    }
    return link.typeOfRoute === Options.INTERNAL ? (
      <Link
        className={className}
        key={`${link.text}-${link.position}-${index}`}
        page={link.internalPage}
        params={this.getParams(link.params)}
      >
        {link.text}
      </Link>
    ) : (
      <a
        className={className}
        key={`${link.text}-${link.position}-${index}`}
        href={this.getValidPage(link.externalPage)}
        target="_blank"
      >
        {link.text}
      </a>
    )
  }

  public render(): ReactNode {
    const { links } = this.props
    if (!links.length) {
      return null
    }
    return (
      <div className={`${menu.container} h2 c-muted-2 w-100 dn db-ns`}>
        <Container>
          <nav className="flex justify-between">
            <div className="flex-grow pa3 flex items-center">
              {links
                .filter(link => link.position === Options.LEFT)
                .map((link, index) => {
                  return this.renderLink(link, index)
                })}
            </div>
            <div className="flex-grow pa3 flex items-center">
              {links
                .filter(link => link.position === Options.MIDDLE)
                .map((link, index) => {
                  return this.renderLink(link, index)
                })}
            </div>
            <div className="flex-grow pa3 flex items-center">
              {links
                .filter(link => link.position === Options.RIGHT)
                .map((link, index) => {
                  return this.renderLink(link, index)
                })}
            </div>
          </nav>
        </Container>
      </div>
    )
  }
}

export default Menu
