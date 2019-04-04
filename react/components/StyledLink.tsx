import classNames from 'classnames'
import React, { FunctionComponent, useContext } from 'react'
import { Link } from 'vtex.render-runtime'
import LevelContext from './LevelContext'

const defaultTypography : Record<number, string> = {
  1: 't-body',
  2: 't-small',
  3: 't-small',
}

const StyledLink : FunctionComponent<StyledLinkProps> = (props) => {
  const level = useContext(LevelContext)

  const {
    typography = defaultTypography[level],
    highlight,
    isHovered,
    isTitle,
    ...rest
  } = props

  return (
    <div className={classNames('bb bw1 mh6', {
      'b--action-primary': level === 1 && isHovered,
      'b--transparent': level === 1 && !isHovered || level > 1,
      'dim': level > 1 && isHovered,
      'pv3': level > 1,
      'pv5': level === 1,
    })}>
      <Link
        {...rest}
        className={classNames('pointer no-underline', {
          [typography]: true,
          'c-emphasis': props.highlight,
          'c-on-base': !props.highlight,
        })} />
    </div>
  )
}

export interface StyledLinkProps extends LinkProps {
  highlight: boolean
  isHovered?: boolean
  isTitle?: boolean
  typography?: string
}

interface LinkProps {
  to?: any
  title?: string
  target?: string
  rel?: string
}

export default StyledLink