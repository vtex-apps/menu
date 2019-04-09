import classNames from 'classnames'
import React, { FunctionComponent, useContext } from 'react'
import { Link } from 'vtex.render-runtime'
import LevelContext from './LevelContext'
import MenuContext from './MenuContext'

const defaultTypography: Record<number, string> = {
  1: 't-body',
  2: 't-small',
  3: 't-small',
}

const StyledLink: FunctionComponent<StyledLinkProps> = props => {
  const level = useContext(LevelContext)
  const { orientation, hasTitle } = useContext(MenuContext)

  const {
    typography = defaultTypography[level],
    highlight,
    isHovered,
    isTitle,
    disabled,
    ...rest
  } = props

  const linkClassNames = classNames('no-underline', {
    [typography]: true,
    'c-emphasis': highlight,
    'c-muted-1 dim': !highlight && hasTitle && !isTitle,
    'c-on-base dim': !highlight && !hasTitle,
    'fw5 c-on-base': !highlight && isTitle,
    pointer: !disabled,
  })

  return (
    <div
      className={classNames('mh6', {
        pv2: orientation === 'vertical',
        pv5: orientation === 'horizontal' && level === 1,
      })}
    >
      {disabled ? (
        <span className={linkClassNames}>{props.children}</span>
      ) : (
        <Link {...rest} className={linkClassNames} />
      )}
    </div>
  )
}

export interface StyledLinkProps extends LinkProps {
  highlight: boolean
  isHovered?: boolean
  isTitle?: boolean
  typography?: string
  disabled?: boolean
}

interface LinkProps {
  to?: any
  title?: string
  target?: string
  rel?: string
}

export default StyledLink
