import classNames from 'classnames'
import { path } from 'ramda'
import React, { useState } from 'react'
import { ExtensionPoint } from 'vtex.render-runtime'
import CategoryItem, { CategoryItemProps } from './components/CategoryItem'
import CustomItem, { CustomItemProps } from './components/CustomItem'
import messages from './modules/messages'

type ItemComponent = (
  props: CategoryItemProps | CustomItemProps
) => React.ReactElement

const menuItemTypes = {
  category: CategoryItem,
  custom: CustomItem,
}

const MenuItem: StorefrontComponent<MenuItemProps> = props => {
  const [isHovered, setHover] = useState(false)

  const Item = menuItemTypes[props.type] as ItemComponent

  return (
    <li
      className="list"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <span
        className={classNames('pointer', {
          'c-emphasis': props.highlight,
          'c-on-base': !props.highlight,
        })}
      >
        <Item
          {...props.itemProps}
          typography={props.typography}
          isHovered={isHovered}
        />
      </span>
      <ExtensionPoint id="submenu" isHovered={isHovered} />
    </li>
  )
}

interface MenuItemProps extends MenuItemSchema {
  typography?: string,
}

MenuItem.getSchema = ({ id, type, ...props }) => {
  const text = path(['itemProps', 'text'], props)

  // tslint:disable: object-literal-sort-keys
  return {
    title: text ? text : messages.itemsTitle.id,
    type: 'object',

    properties: {
      id: {
        default: id,
        title: messages.itemIdTitle.id,
        type: 'string',
      },
      type: {
        title: messages.typeTitle.id,
        type: 'string',
        enum: ['category', 'custom'],
        enumNames: [messages.categoryTitle.id, messages.customTitle.id],
      },
      iconId: {
        title: messages.iconIdTitle.id,
        type: 'string'
      },
      highlight: {
        title: messages.highlightTitle.id,
        type: 'boolean'
      },
      itemProps: {
        title: messages.paramsTitle.id,
        type: 'object',
        properties: {
          ...(type === 'category' && {
            categoryId: {
              title: messages.categoryIdTitle.id,
              type: 'string',
            },
          }),
          ...(type === 'custom' && {
            type: {
              title: messages.customTypeTitle.id,
              type: 'string',
              enum: ['internal', 'external'],
              enumNames: [messages.internalTitle.id, messages.externalTitle.id],
            },
            href: {
              title: messages.hrefTitle.id,
              type: 'string',
            },
            noFollow: {
              title: messages.noFollowTitle.id,
              type: 'boolean',
            },
            tagTitle: {
              title: messages.tagTitleTitle.id,
              type: 'string',
            },
          }),
          text: {
            title: messages.paramsTextTitle.id,
            type: 'string',
          },
        },
      },
    },
  }
}

export default MenuItem