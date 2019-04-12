import classNames from 'classnames'
import React, { useContext, useMemo } from 'react'
import { defineMessages } from 'react-intl'

import CategoryMenu from './components/CategoryMenu'
import Item from './components/Item'
import LevelContext from './components/LevelContext'
import MenuContext from './components/MenuContext'
import MenuItem, { MenuItemSchema } from './MenuItem'

const TypographyMap: Record<string, string> = {
  body: 't-body',
  heading1: 't-heading-1',
  heading2: 't-heading-2',
  heading3: 't-heading-3',
  heading4: 't-heading-4',
  heading5: 't-heading-5',
  mini: 't-mini',
  small: 't-small',
}

const Menu: StorefrontFunctionComponent<MenuSchema> = ({
  orientation = 'horizontal',
  textType,
  title,
  categoryId,
  customText,
  ...props
}) => {
  const level = useContext(LevelContext)
  const menuContext = useMemo(
    () => ({
      hasTitle: title || categoryId ? true : false,
      orientation,
      textType: textType ? TypographyMap[textType] : TypographyMap.body,
    }),
    [orientation, textType]
  )
  if (title && categoryId) {
    const msg = "Cannot use title and categoryId, if you want to use a custom text for a category menu, pass a customText prop instead"
    throw new Error(msg)
  }

  return (
    <LevelContext.Provider value={level + 1}>
      <MenuContext.Provider value={menuContext}>
        <nav>
          <ul
            className={classNames('list flex pl0 mv0', {
              'flex-column': orientation === 'vertical',
              'flex-row': orientation === 'horizontal',
            })}
          >
            {title && <Item {...title} isTitle />}
            {categoryId && <CategoryMenu categoryId={categoryId} customText={customText} />}
            {props.children}
          </ul>
        </nav>
      </MenuContext.Provider>
    </LevelContext.Provider>
  )
}

interface MenuSchema {
  orientation?: 'vertical' | 'horizontal'
  categoryId?: number
  customText?: string
  textType?: Typography
  title?: MenuItemSchema,
}

enum Typography {
  heading1 = 't-heading-1',
  heading2 = 't-heading-2',
  heading3 = 't-heading-3',
  heading4 = 't-heading-4',
  heading5 = 't-heading-5',
  body = 't-body',
  small = 't-small',
  mini = 't-mini',
}

const messages = defineMessages({
  horizontalLabel: {
    defaultMessage: '',
    id: 'editor.menu.orientation.horizontal.label',
  },
  menuTitle: {
    defaultMessage: '',
    id: 'editor.future-menu.title',
  },
  orientationTitle: {
    defaultMessage: '',
    id: 'editor.menu.orientation.title',
  },
  typographyTitle: {
    defaultMessage: '',
    id: 'editor.menu.typography.title',
  },
  verticalLabel: {
    defaultMessage: '',
    id: 'editor.menu.orientation.vertical.label',
  },
})

Menu.getSchema = (props: MenuSchema) => {
  const typographyValues = Object.values(Typography)

  // tslint:disable: object-literal-sort-keys
  return {
    title: messages.menuTitle.id,
    type: 'object',
    properties: {
      textType: {
        title: messages.typographyTitle.id,
        type: 'string',
        enum: typographyValues,
        enumNames: typographyValues,
        default: Typography.body,
      },
      title: MenuItem.getSchema(props.title),
      orientation: {
        title: messages.orientationTitle.id,
        type: 'string',
        enum: ['vertical', 'horizontal'],
        enumNames: [messages.verticalLabel.id, messages.horizontalLabel.id],
        default: 'horizontal',
      },
    },
  }
}

export default Menu
