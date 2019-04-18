import React, { FunctionComponent } from 'react'
import Collapsible from './Collapsible'

interface Props {
  isOpen: boolean
}

const SubmenuCollapsible: FunctionComponent<Props> = ({
  isOpen,
  children,
}) => {
  return (
    <Collapsible isOpen={isOpen}>
      <div className="pv4 pl2 flex">
        <section className="w-100 flex justify-center">
          {children}
        </section>
      </div>
    </Collapsible>
  )
}

export default SubmenuCollapsible

