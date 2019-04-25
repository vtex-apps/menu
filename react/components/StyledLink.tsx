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
    accordion,
    highlight,
    isHovered,
    active,
    isTitle,
    disabled,
    to,
    ...rest
  } = props

  const hasLink = to && to !== '#'

  const linkClassNames = classNames('no-underline pointer', {
    [typography]: true,
    'c-emphasis': highlight,
    'c-muted-1': !highlight && hasTitle && !isTitle,
    'c-on-base': !highlight && !hasTitle,
    'fw5 c-on-base': !highlight && isTitle,
    'pointer': !disabled,
  })

  return (
    <div
      className={classNames('mh6 flex justify-between nowrap', {
        pv2: orientation === 'vertical',
        pv5: orientation === 'horizontal' && level === 1,
      })}
    >
      {(disabled || !hasLink) ? (
        <span className={linkClassNames}>{props.children}</span>
      ) : (
        <Link to={to} {...rest} className={linkClassNames} />
      )}
      {accordion && (
      <div className="ml4">
        {active ? '-' : '+'}
      </div>
      )}
    </div>
  )
}

export interface StyledLinkProps extends LinkProps {
  highlight?: boolean
  isHovered?: boolean
  active?: boolean
  isTitle?: boolean
  typography?: string
  disabled?: boolean
  accordion?: boolean
}

interface LinkProps {
  to?: any
  title?: string
  target?: string
  rel?: string
}

export default StyledLink
