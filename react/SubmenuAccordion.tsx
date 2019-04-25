import React from 'react'
import { defineMessages } from 'react-intl'
import Collapsible from './components/Collapsible'

interface Props {
  isOpen: boolean
}

const SubmenuAccordion: StorefrontFunctionComponent<Props> = ({
  isOpen,
  children,
}) => (
  <Collapsible open={isOpen}>
    <section
      className="w-100 flex pl4 flex"
      style={{
        WebkitOverflowScrolling: 'touch',
        maxHeight: 400,
        overflowY: 'scroll',
      }}>
      {children}
    </section>
  </Collapsible>
)

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
