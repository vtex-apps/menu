import React, { PropsWithChildren } from 'react'
import { useCssHandles, CssHandlesTypes } from 'vtex.css-handles'

const CSS_HANDLES = ['submenuColumn'] as const

interface Props {
  classes: CssHandlesTypes.CustomClasses<typeof CSS_HANDLES>
}

function Column(props: PropsWithChildren<Props>) {
  const { handles } = useCssHandles(CSS_HANDLES, { classes: props.classes })

  return <div className={handles.submenuColumn}>{props.children}</div>
}

export default Column
