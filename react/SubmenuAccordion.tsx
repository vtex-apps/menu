import classNames from 'classnames'
import React from 'react'
import { defineMessages } from 'react-intl'
import Collapsible from './components/Collapsible'

import { generateBlockClass } from '@vtex/css-handles'

import styles from './SubmenuAccordion.css'

interface Props {
  isOpen: boolean
  blockClass?: string
}

const SubmenuAccordion: StorefrontFunctionComponent<Props> = ({
  isOpen,
  children,
  blockClass,
}) => {
  const classes = generateBlockClass(styles.submenuAccordion, blockClass)

  return (
    <Collapsible open={isOpen} >
      <section className={classNames(classes, 'w-100 flex pl4 flex')}>
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
})

export default SubmenuAccordion
