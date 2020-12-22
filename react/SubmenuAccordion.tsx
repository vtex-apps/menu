import React from 'react'
import { defineMessages } from 'react-intl'
import { useCssHandles, CssHandlesTypes } from 'vtex.css-handles'

import Collapsible from './components/Collapsible'

const CSS_HANDLES = ['submenuAccordion'] as const

interface Props {
  isOpen: boolean
  blockClass?: string
  classes?: CssHandlesTypes.CustomClasses<typeof CSS_HANDLES>
}

const SubmenuAccordion: StorefrontFunctionComponent<Props> = ({
  isOpen,
  classes,
  children,
}) => {
  const { handles } = useCssHandles(CSS_HANDLES, { classes })

  return (
    <Collapsible open={isOpen}>
      <section className={`${handles.submenuAccordion} w-100 flex pl4 flex`}>
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
