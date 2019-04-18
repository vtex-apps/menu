import classNames from 'classnames'
import React from 'react'
import { defineMessages } from 'react-intl'
import SubmenuCollapsible from './components/SubmenuCollapsible'

const Submenu: StorefrontFunctionComponent<SubmenuProps> = ({
  isOpen,
  width,
  mode,
  children,
}) => {
  const isCollapsible = mode === SubmenuMode.collapsible

  if (isCollapsible) {
    return (
      <SubmenuCollapsible isOpen={isOpen}>
        {children}
      </SubmenuCollapsible>
    )
  }

  return (
    <div className={`${width === '100%' ? '' : 'relative'}`}>
      <div
        className={classNames(
          isCollapsible ? 'pv4 pl2' : 'absolute left-0 bg-base pv4 bw1 bb b--muted-3 z-2',
          {
            dn: !isOpen,
            flex: isOpen,
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

export enum SubmenuMode {
  regular = 'regular',
  collapsible = 'collapsible',
}

export interface SubmenuProps extends SubmenuSchema {
  isOpen: boolean
  mode: SubmenuMode
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
