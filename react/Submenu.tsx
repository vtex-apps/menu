import classNames from 'classnames'
import React from 'react'
import { defineMessages } from 'react-intl'

const Submenu: StorefrontFunctionComponent<SubmenuProps> = ({
  isHovered,
  width,
  children,
}) => {
  return (
    <div className={`${width === '100%' ? '' : 'relative'}`}>
      <div
        className={classNames(
          'absolute left-0 bg-base pv4 bw1 bb b--muted-3 z-2',
          {
            dn: !isHovered,
            flex: isHovered,
            'w-100': width === '100%',
            'w-auto ml6': width === 'auto',
          }
        )}
      >
        <section className="w-100 flex justify-center">{children}</section>
      </div>
    </div>
  )
}

interface SubmenuProps extends SubmenuSchema {
  isHovered: boolean
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
