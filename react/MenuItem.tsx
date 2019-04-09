import { path } from 'ramda'
import React, { useState } from 'react'
import { defineMessages } from 'react-intl'
import { ExtensionPoint } from 'vtex.render-runtime'
import { CategoryItemSchema } from './components/CategoryItem'
import { CustomItemSchema } from './components/CustomItem'
import Item from './components/Item'

const MenuItem: StorefrontFunctionComponent<MenuItemSchema> = props => {
  const [isHovered, setHover] = useState(false)

  return (
    <li
      className="list"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <Item {...props} isHovered={isHovered} />
      <ExtensionPoint id="unstable--submenu" isHovered={isHovered} />
    </li>
  )
}

export interface MenuItemSchema {
  id: string
  type: 'category' | 'custom'
  iconId: string
  highlight: boolean
  itemProps: CategoryItemSchema | CustomItemSchema
}

const messages = defineMessages({
  categoryIdTitle: {
    defaultMessage: '',
    id: 'editor.menu.item.params.categoryId.title',
  },
  categoryTitle: {
    defaultMessage: '',
    id: 'editor.menu.item.category.title',
  },
  customTitle: {
    defaultMessage: '',
    id: 'editor.menu.item.custom.title',
  },
  customTypeTitle: {
    defaultMessage: '',
    id: 'editor.menu.item.params.type.title',
  },
  externalTitle: {
    defaultMessage: '',
    id: 'editor.menu.item.params.external.title',
  },
  highlightTitle: {
    defaultMessage: '',
    id: 'editor.menu.item.highlight.title',
  },
  hrefTitle: {
    defaultMessage: '',
    id: 'editor.menu.item.params.href.title',
  },
  iconIdTitle: {
    defaultMessage: '',
    id: 'editor.menu.item.iconId.title',
  },
  internalTitle: {
    defaultMessage: '',
    id: 'editor.menu.item.params.internal.title',
  },
  itemIdTitle: {
    defaultMessage: '',
    id: 'editor.menu.item.id.title',
  },
  itemsTitle: {
    defaultMessage: '',
    id: 'editor.menu.items.title',
  },
  noFollowTitle: {
    defaultMessage: '',
    id: 'editor.menu.item.params.noFollow.title',
  },
  paramsTextTitle: {
    defaultMessage: '',
    id: 'editor.menu.item.params.text.title',
  },
  paramsTitle: {
    defaultMessage: '',
    id: 'editor.menu.item.params.title',
  },
  tagTitleTitle: {
    defaultMessage: '',
    id: 'editor.menu.item.params.tagTitle.title',
  },
  typeTitle: {
    defaultMessage: '',
    id: 'editor.menu.item.type.title',
  },
})

MenuItem.getSchema = props => {
  const text = path(['itemProps', 'text'], props)
  const type = props && props.type ? props.type : 'custom'
  const id = props && props.id ? props.id : ''

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
        type: 'string',
      },
      highlight: {
        title: messages.highlightTitle.id,
        type: 'boolean',
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
