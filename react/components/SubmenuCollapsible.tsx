import React, { FunctionComponent } from 'react'

interface Props {
  isOpen: boolean
}

const SubmenuCollapsible: FunctionComponent<Props> = ({
  isOpen,
  children,
}) => {
  return (
    <div className="overflow-hidden"
      style={{
        height: isOpen ? 'auto' : '0',
      }}>
      <div className="pv4 pl2 flex">
        <section className="w-100 flex justify-center">{children}</section>
      </div>
    </div>
  )
}

export default SubmenuCollapsible

