import { path } from 'ramda'
import React, { useState } from 'react'
import { defineMessages } from 'react-intl'
import { ExtensionPoint } from 'vtex.render-runtime'
import { CategoryItemSchema } from './components/CategoryItem'
import { CustomItemSchema } from './components/CustomItem'
import Item from './components/Item'
import useSubmenuExtension from './hooks/useSubmenuExtension'

const MenuItem: StorefrontFunctionComponent<MenuItemSchema> = props => {
  const [isActive, setActive] = useState(false)

  /* This is a temporary verification of which kind of submenu is being
   * inserted. This will be replaced by new functionality of useChildBlocks
   * in the future. */
  const submenuExtension = useSubmenuExtension()
  const submenuComponent = submenuExtension.component
  const isCollapsible = submenuComponent && submenuComponent.indexOf('Collapsible') > -1

  if (isCollapsible) {
    return (
      <li className="list">
        <div
          onClick={event => {
            setActive(!isActive)
            event.stopPropagation()
          }}>
          <Item {...props} collapsible active={isActive} />
        </div>
        <ExtensionPoint id="submenu" isOpen={isActive} />
        <ExtensionPoint id="unstable--submenu" isOpen={isActive} />
      </li>
    )
  }

  return (
    <li
      className="list"
      onClick={() => setActive(true)}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}>
      <Item {...props} active={isActive} />
      <ExtensionPoint id="submenu" isOpen={isActive} />
      <ExtensionPoint id="unstable--submenu" isOpen={isActive} />
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
    id: 'admin/editor.menu.item.params.categoryId.title',
  },
  categoryTitle: {
    defaultMessage: '',
    id: 'admin/editor.menu.item.category.title',
  },
  customTitle: {
    defaultMessage: '',
    id: 'admin/editor.menu.item.custom.title',
  },
  customTypeTitle: {
    defaultMessage: '',
    id: 'admin/editor.menu.item.params.type.title',
  },
  externalTitle: {
    defaultMessage: '',
    id: 'admin/editor.menu.item.params.external.title',
  },
  highlightTitle: {
    defaultMessage: '',
    id: 'admin/editor.menu.item.highlight.title',
  },
  hrefTitle: {
    defaultMessage: '',
    id: 'admin/editor.menu.item.params.href.title',
  },
  iconIdTitle: {
    defaultMessage: '',
    id: 'admin/editor.menu.item.iconId.title',
  },
  internalTitle: {
    defaultMessage: '',
    id: 'admin/editor.menu.item.params.internal.title',
  },
  itemIdTitle: {
    defaultMessage: '',
    id: 'admin/editor.menu.item.id.title',
  },
  itemsTitle: {
    defaultMessage: '',
    id: 'admin/editor.menu.items.title',
  },
  noFollowTitle: {
    defaultMessage: '',
    id: 'admin/editor.menu.item.params.noFollow.title',
  },
  paramsTextTitle: {
    defaultMessage: '',
    id: 'admin/editor.menu.item.params.text.title',
  },
  paramsTitle: {
    defaultMessage: '',
    id: 'admin/editor.menu.item.params.title',
  },
  tagTitleTitle: {
    defaultMessage: '',
    id: 'admin/editor.menu.item.params.tagTitle.title',
  },
  typeTitle: {
    defaultMessage: '',
    id: 'admin/editor.menu.item.type.title',
  },
})

MenuItem.getSchema = props => {
  const text = path(['itemProps', 'text'], props)
  const type = props && props.type ? props.type : 'custom'
  const id = props && props.id ? props.id : ''

  // tslint:disable: object-literal-sort-keys
  return {
    title: [text, id, messages.itemsTitle.id].find(e => !!e),
    type: 'object',
    required: ['type'],
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
        default: 'custom',
        enumNames: [messages.categoryTitle.id, messages.customTitle.id],
        widget: { 'ui:widget': 'radio' },
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

