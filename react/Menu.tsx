import classNames from 'classnames'
import React, { useContext } from 'react'
import { defineMessages } from 'react-intl'
import LevelContext from './components/LevelContext'

const TypographyMap : Record<string, string> = {
  body: 't-body',
  heading1: 't-heading-1',
  heading2: 't-heading-2',
  heading3: 't-heading-3',
  heading4: 't-heading-4',
  heading5: 't-heading-5',
  mini: 't-mini',
  small: 't-small',
}

const Menu : StorefrontFunctionComponent<MenuSchema> = ({
  orientation = 'horizontal',
  textType,
  ...props
}) => {
  const level = useContext(LevelContext)

  return (
    <LevelContext.Provider value={level + 1}>
      <nav>
        <ul className={classNames('list flex pl0 mv0', {
          'flex-column': orientation === 'vertical',
          'flex-row': orientation === 'horizontal',
        })}>
          {React.Children.map(props.children, child =>
            React.cloneElement(child as React.ReactElement<any>, {
              typography: textType ? TypographyMap[textType] : undefined,
            })
          )}
        </ul>
      </nav>
    </LevelContext.Provider>
  )
}

interface MenuSchema {
  orientation?: 'vertical' | 'horizontal'
  textType?: Typography
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

Menu.getSchema = () => {
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
