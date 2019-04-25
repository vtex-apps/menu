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
    <div className="pl4 flex">
      <section
        className="w-100 flex"
        style={{
          WebkitOverflowScrolling: 'touch',
          maxHeight: 400,
          overflowY: 'scroll',
        }}>
        <div>
          {children}
        </div>
      </section>
    </div>
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
