import classNames from 'classnames'
import { range } from 'ramda'
import React from 'react'
import { defineMessages } from 'react-intl'

const MAX_TACHYONS_SCALE = 11
export type TachyonsScaleInput = string | number | undefined

/** TODO: This function is copied from the flex-layout app.
 * It should probably be exported to a separate package.
 */
const parseTachyonsValue = (value: TachyonsScaleInput, name?: string) => {
  if (!value) {
    return 0
  }

  const supportedValues = range(0, MAX_TACHYONS_SCALE + 1).map(String)

  if (!supportedValues.includes(String(value))) {
    if (name) {
      console.warn(
        `Invalid ${name} value ("${value}"). It should be an integer between 0 and ${MAX_TACHYONS_SCALE}.`
      )
    }

    return 0
  }

  return typeof value === 'string' ? parseInt(value, 10) : value
}

const Submenu: StorefrontFunctionComponent<SubmenuProps> = ({
  isOpen,
  width,
  children,
  orientation = Orientation.horizontal,
  paddingTop = 4,
  paddingBottom = 4,
}) => (
  <div className={`${width === '100%' ? '' : 'relative'}`}>
    <div
      className={classNames(`absolute left-0 bg-base pt${parseTachyonsValue(paddingTop)} pb${parseTachyonsValue(paddingBottom)} bw1 bb b--muted-3 z-2`,
        {
          dn: !isOpen,
          flex: isOpen,
          'w-100': width === '100%',
          'w-auto ml6': width === 'auto',
        }
      )}
    >
      <section className={classNames('w-100 flex justify-center', { 'flex-column': orientation === Orientation.vertical })}>{children}</section>
    </div>
  </div>
)

enum Orientation {
  horizontal = 'horizontal',
  vertical = 'vertical',
}


export interface SubmenuProps extends SubmenuSchema {
  isOpen: boolean
  orientation: Orientation
  paddingTop: number | string
  paddingBottom: number | string
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
    submenuWidth: {
      title: messages.submenuWidthTitle.id,
      enum: ['100%', 'auto'],
      default: 'auto',
    },
  },
})

export default Submenu
