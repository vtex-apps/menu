import React, {
  Reducer,
  useReducer,
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
} from 'react'
import classNames from 'classnames'
import { defineMessages } from 'react-intl'
import { ExtensionPoint } from 'vtex.render-runtime'
import {
  useCssHandles,
  applyModifiers,
  CssHandlesTypes,
} from 'vtex.css-handles'

import { CategoryItemSchema } from './components/CategoryItem'
import { CustomItemSchema } from './components/CustomItem'
import Item from './components/Item'
import { IconProps } from './components/StyledLink'
import useSubmenuImplementation from './hooks/useSubmenuImplementation'
import MenuContext from './components/MenuContext'
import { useMouseSpeedDebouncer } from './hooks/useMouseSpeedDebouncer'
import { useUrlChange } from './hooks/useUrlChange'

const CSS_HANDLES = ['menuItem', 'menuItemInnerDiv'] as const

export interface MenuItemSchema {
  id: string
  type: 'category' | 'custom'
  iconProps: IconProps
  iconPosition: 'left' | 'right'
  highlight: boolean
  itemProps: CategoryItemSchema | CustomItemSchema
  onMountBehavior?: 'open' | 'closed'
  blockClassItem?: string
  experimentalOptimizeRendering?: boolean
  classes?: CssHandlesTypes.CustomClasses<typeof CSS_HANDLES>
}

type SubmenuState = {
  hasBeenActive: boolean
  isActive: boolean
  onMountBehavior?: 'open' | 'closed'
}

type SubmenuAction =
  | { type: 'SHOW_SUBMENU' }
  | { type: 'HIDE_SUBMENU' }
  | { type: 'DISABLE_ON_MOUNT_BEHAVIOR_FLAG' }

const submenuReducer: Reducer<SubmenuState, SubmenuAction> = (
  state,
  action
) => {
  switch (action.type) {
    case 'SHOW_SUBMENU':
      return {
        hasBeenActive: true,
        isActive: true,
      }
    case 'HIDE_SUBMENU':
      return {
        ...state,
        isActive: false,
      }
    case 'DISABLE_ON_MOUNT_BEHAVIOR_FLAG':
      return {
        ...state,
        onMountBehavior: 'closed',
      }
    default:
      return state
  }
}

const MenuItem: StorefrontFunctionComponent<MenuItemSchema> = ({
  children,
  onMountBehavior = 'closed',
  blockClassItem,
  ...props
}) => {
  const { experimentalOptimizeRendering } = useContext(MenuContext)
  const [
    { isActive, hasBeenActive, onMountBehavior: onMountBehaviorFlag },
    dispatch,
  ] = useReducer(submenuReducer, {
    hasBeenActive: onMountBehavior === 'open',
    isActive: onMountBehavior === 'open',
    onMountBehavior,
  })
  const [isHovered, setHovered] = useState(false)
  const setActive = useCallback(
    (value: boolean) => {
      if (value !== isActive) {
        dispatch({ type: value ? 'SHOW_SUBMENU' : 'HIDE_SUBMENU' })
      }
    },
    [isActive]
  )
  const disableIsOpenOnMountFlag = useCallback(() => {
    if (onMountBehaviorFlag === 'open') {
      dispatch({ type: 'DISABLE_ON_MOUNT_BEHAVIOR_FLAG' })
    }
  }, [onMountBehaviorFlag])

  // Close any active/open menu when url changes
  useUrlChange(() => {
    if (isActive) setActive(false)
  }, [isActive, setActive])

  /* Prevents submenus from closing if the mouse is moving within a certain speed.
   * This makes it easier for the user to click on a submenu item without it closing on
   * them if they hover another menu item by accident. */
  const debouncedSetActive = useMouseSpeedDebouncer(setActive, {
    delay: 200,
    maxSpeed: 450,
  })

  /* This is a temporary check of which kind of submenu is being
   * inserted. This will be replaced by new functionality of useChildBlocks
   * in the future. */
  const submenuImplementation = useSubmenuImplementation()
  const isCollapsible = submenuImplementation === 'submenu.accordion'

  const closeTimeout = useRef<number | null>(null)
  useEffect(
    function guaranteeClosing() {
      if (isCollapsible) {
        return
      }

      if (closeTimeout.current) {
        clearTimeout(closeTimeout.current)
      }

      // if a menu is still active but is not hovered for at least 400ms, close it
      if (isActive && !isHovered && onMountBehaviorFlag !== 'open') {
        closeTimeout.current = window.setTimeout(() => {
          setActive(false)
        }, 400)
      }

      return () => {
        closeTimeout.current && clearTimeout(closeTimeout.current)
      }
    },
    [isActive, isCollapsible, isHovered, setActive, onMountBehaviorFlag]
  )

  const { handles } = useCssHandles(CSS_HANDLES, { classes: props.classes })

  const itemClasses = classNames(
    handles.menuItem,
    'list',
    applyModifiers(handles.menuItem, isActive ? 'isOpen' : 'isClosed')
  )

  if (isCollapsible) {
    return (
      <li className={itemClasses}>
        {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events */}
        <div
          className={handles.menuItemInnerDiv}
          onClick={event => {
            setActive(!isActive)
            event.stopPropagation()
          }}
        >
          <Item
            blockClassItem={blockClassItem}
            accordion
            active={isActive}
            {...props}
          />
        </div>
        {(hasBeenActive || !experimentalOptimizeRendering) && (
          /* Collapsible menus need to still persist after being open,
           * to make the closing transition work properly */ <>
            <ExtensionPoint id="submenu" isOpen={isActive} />
            <ExtensionPoint id="unstable--submenu" isOpen={isActive} />
            {children}
          </>
        )}
      </li>
    )
  }

  return (
    <li
      className={itemClasses}
      onMouseEnter={() => {
        debouncedSetActive(true)
        setHovered(true)
        disableIsOpenOnMountFlag()
      }}
      onMouseLeave={() => {
        debouncedSetActive(false)
        setHovered(false)
      }}
    >
      <Item blockClassItem={blockClassItem} {...props} active={isActive} />

      {(isActive || !experimentalOptimizeRendering) && (
        <>
          <ExtensionPoint id="submenu" isOpen={isActive} />
          <ExtensionPoint id="unstable--submenu" isOpen={isActive} />
          {children}
        </>
      )}
    </li>
  )
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
  internalTitle: {
    defaultMessage: '',
    id: 'admin/editor.menu.item.params.internal.title',
  },
  onMountBehaviorTitle: {
    defaultMessage: '',
    id: 'admin/editor.menu.item.onMountBehavior.title',
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
  const text = props?.itemProps?.text
  const id = props?.id ? props.id : ''

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
