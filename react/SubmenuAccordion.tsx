import classNames from 'classnames'
import React from 'react'
import { defineMessages } from 'react-intl'
import Collapsible from './components/Collapsible'

import { generateBlockClass } from '@vtex/css-handles' 

import styles from './SubmenuAccordion.css' 

interface Props {
  isOpen: boolean,
  blockClass?: string
}

const SubmenuAccordion: StorefrontFunctionComponent<Props> = ({
  isOpen,
  children,
  blockClass
}) => {
  const classes = generateBlockClass(styles.CustomSubmenuAccordion, blockClass)

  return(
    <Collapsible open={isOpen}>
      <section
        className={classNames(classes, "w-100 flex pl4 flex")}
        style={{
          WebkitOverflowScrolling: 'touch',
          maxHeight: 400,
          overflowY: 'scroll',
        }}>
        {children}
      </section>
    </Collapsible>
  )
}

const messages = defineMessages({
  submenuTitle: {
    defaultMessage: '',
    id: 'editor.menu.submenu.title',
  },
})

SubmenuAccordion.getSchema = () => ({
  title: messages.submenuTitle.id,
  type: 'object',
  properties: {
    blockClass: {
      title: 'admin/editor.blockClass.title',
      description: 'admin/editor.blockClass.description',
      type: 'string',
      isLayout: true,
    }
  }
})

export default SubmenuAccordion
