import classNames from 'classnames'
import React, { FunctionComponent, useContext } from 'react'
import { Link } from 'vtex.render-runtime'
import LevelContext from './LevelContext'
import MenuContext from './MenuContext'
import { Icon } from 'vtex.store-icons'

import styles from './StyledLink.css'

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
    children,
    iconProps,
    iconPosition,
    treePath,
    ...rest
  } = props

  const hasLink = to && to !== '#'

  const linkClassNames = classNames(styles.styledLink, 'no-underline pointer', {
    [typography]: true,
    'c-emphasis': highlight,
    'c-muted-1': !highlight && hasTitle && !isTitle,
    'c-on-base': !highlight && !hasTitle,
    'fw5 c-on-base': !highlight && isTitle,
    pointer: !disabled,
  })

  const iconTestId = `icon-${iconPosition}`
  const iconComponent = iconProps ?
    <span className={`${styles.styledLinkIcon} mh2`} data-testid={iconTestId}>
      <Icon 
        id={iconProps.id} 
        isActive={iconProps.isActive}
        size={iconProps.size}
        viewBox={iconProps.viewBox}
        activeClassName={iconProps.activeClassName}
        mutedClassName={iconProps.mutedClassName}
      />
    </span> : null 

  const content = (
    <div className="flex justify-between nowrap">
      {iconPosition === 'left' && iconComponent}
      {children}
      {iconPosition === 'right' && iconComponent}
      {accordion && <div className="ml3 c-muted-2">{active ? '-' : '+'}</div>}
    </div>
  )

  const [path, query] = (to || '').split('?')

  return (
    <div
      className={classNames(styles.styledLinkContainer, 'mh6', {
        pv2: orientation === 'vertical',
        pv5: orientation === 'horizontal' && level === 1,
      })}
    >
      {disabled || !hasLink || accordion ? (
        <span className={linkClassNames}>{content}</span>
      ) : (
        <Link
          to={path}
          {...rest}
          query={query}
          className={linkClassNames}
        >
          {content}
        </Link>
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
  treePath?: string
  iconProps?: IconProps
  iconPosition?: 'left' | 'right'
}

export interface IconProps {
  id: string
  isActive?: boolean
  size?: number
  viewBox?: string
  activeClassName?: string
  mutedClassName?: string
}

interface LinkProps {
  to?: any
  title?: string
  target?: string
  rel?: string
}

StyledLink.defaultProps = {
  iconPosition: 'left'
}

export default StyledLink
