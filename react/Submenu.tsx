import classNames from 'classnames'
import React from 'react'
import { defineMessages } from 'react-intl'

import { generateBlockClass } from '@vtex/css-handles' 

import styles from './Submenu.css' 

const MAX_TACHYONS_SCALE = 11
export type TachyonsScaleInput = string | number | undefined

/** TODO: This function is copied from the flex-layout app.
 * It should probably be exported to a separate package.
 */
const parseTachyonsValue = (value: TachyonsScaleInput, name?: string) => {
  if (!value) {
    return 0
  }

  const parsedValue = typeof value === 'string' ? parseInt(value, 10) : value

  if (isNaN(parsedValue) || String(parsedValue) !== String(value) || parsedValue < 0 || parsedValue > MAX_TACHYONS_SCALE) {
    if (name) {
      console.warn(`Invalid ${name} value. It should be an integer between 0 and ${MAX_TACHYONS_SCALE}.`)
    }
    return 0
  }

  return parsedValue
}


const Submenu: StorefrontFunctionComponent<SubmenuProps> = ({
  isOpen,
  width,
  children,
  blockClass,
  orientation = Orientation.horizontal,
  paddingTop = 4,
  paddingBottom = 4,
}) => {
  const classes = generateBlockClass(styles.CustomSubmenu, blockClass)

  return(
    <div className={`${width === '100%' ? '' : 'relative'}`}>
      <div
        className={classNames(`absolute left-0 bg-base pt${parseTachyonsValue(paddingTop, 'paddingTop')} pb${parseTachyonsValue(paddingBottom, 'paddingBottom')} bw1 bb b--muted-3 z-2`,
          {
            dn: !isOpen,
            flex: isOpen,
            'w-100': width === '100%',
            'w-auto ml6': width === 'auto',
          }
        )}
      >
        <section className={classNames(classes, 'w-100 flex justify-center', { 'flex-column': orientation === Orientation.vertical })}>{children}</section>
      </div>
    </div>  
  )
}

enum Orientation {
  horizontal = 'horizontal',
  vertical = 'vertical',
}


export interface SubmenuProps extends SubmenuSchema {
  isOpen: boolean
  orientation: Orientation
  paddingTop: number | string
  paddingBottom: number | string
  blockClass?: string
}

interface SubmenuSchema {
  width: '100%' | 'auto'
}

const messages = defineMessages({
  submenuTitle: {
    defaultMessage: '',
    id: 'admin/editor.menu.submenu.title',
  },
  submenuWidthTitle: {
    defaultMessage: '',
    id: 'admin/editor.menu.item.submenuWidth.title',
  },
})

// tslint:disable: object-literal-sort-keys
Submenu.getSchema = () => ({
  title: messages.submenuTitle.id,
  type: 'object',
  properties: {
    blockClass: {
      title: 'admin/editor.blockClass.title',
      description: 'admin/editor.blockClass.description',
      type: 'string',
      isLayout: true,
    },
    submenuWidth: {
      title: messages.submenuWidthTitle.id,
      enum: ['100%', 'auto'],
      default: 'auto',
    },
  },
})

export default Submenu
