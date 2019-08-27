import { path } from 'ramda'
import React, { useState } from 'react'

import classNames from 'classnames'

import { generateBlockClass } from '@vtex/css-handles'
import { defineMessages } from 'react-intl'
import { canUseDOM, ExtensionPoint } from 'vtex.render-runtime'
import { CategoryItemSchema } from './components/CategoryItem'
import { CustomItemSchema } from './components/CustomItem'
import Item from './components/Item'
import { IconProps } from './components/StyledLink'
import useSubmenuImplementation from './hooks/useSubmenuImplementation'

import styles from './MenuItem.css'

const MenuItem: StorefrontFunctionComponent<MenuItemSchema> = ({
  blockClass,
  ...props
}) => {
  const [isActive, setActive] = useState(false)
  const [lazyMount, setLazyMount] = useState(!canUseDOM)

  /* This is a temporary check of which kind of submenu is being
   * inserted. This will be replaced by new functionality of useChildBlocks
   * in the future. */
  const submenuImplementation = useSubmenuImplementation()
  const isCollapsible = submenuImplementation === 'submenu.accordion'
  const classes = generateBlockClass(styles.menuItem, blockClass)

  if (isCollapsible) {
    return (
      <li className={classNames(classes, 'list')}>
        <div
          onClick={event => {
            setLazyMount(true)
            setActive(!isActive)
            event.stopPropagation()
          }}
        >
          <Item {...props} accordion active={isActive} />
        </div>
        {lazyMount ? (
          <>
            <ExtensionPoint id="submenu" isOpen={isActive} />
            <ExtensionPoint id="unstable--submenu" isOpen={isActive} />
          </>
        ) : null}
      </li>
    )
  }

  return (
    <li
      className={classNames(classes, 'list')}
      onMouseEnter={() => {
        setActive(true)
        setLazyMount(true)
      }}
      onMouseLeave={() => {
        setActive(false)
      }}
    >
      <Item {...props} active={isActive} />
      {lazyMount ? (
        <>
          <ExtensionPoint id="submenu" isOpen={isActive} />
          <ExtensionPoint id="unstable--submenu" isOpen={isActive} />
        </>
      ) : null}
    </li>
  )
}

export interface MenuItemSchema {
  id: string
  type: 'category' | 'custom'
  iconProps: IconProps
  iconPosition: 'left' | 'right'
  highlight: boolean
  itemProps: CategoryItemSchema | CustomItemSchema
  blockClass?: string
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
    },
  }
}

export default MenuItem
