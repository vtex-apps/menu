import classNames from 'classnames'
import React, { FunctionComponent, useContext } from 'react'
import { useCssHandles } from 'vtex.css-handles'
import { Link } from 'vtex.render-runtime'
import { Icon } from 'vtex.store-icons'

import LevelContext from './LevelContext'
import MenuContext from './MenuContext'

const CSS_HANDLES = [
  'styledLink',
  'styledLinkIcon',
  'styledLinkContainer',
  'styledLinkContent',
  'accordionIcon',
  'styledLink-custom',
] as const

const defaultTypography: Record<number, string> = {
  1: 't-body',
  2: 't-small',
  3: 't-small',
}

const StyledLink: FunctionComponent<StyledLinkProps> = props => {
  const level = useContext(LevelContext)
  const { orientation, hasTitle } = useContext(MenuContext)
  const { handles, withModifiers } = useCssHandles(CSS_HANDLES)

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
    iconId,
    iconProps,
    iconPosition,
    treePath,
    blockClass,
    blockClassItem,
    ...rest
  } = props

  const hasLink = to && to !== '#'

  const linkClassNames = classNames(
    withModifiers('styledLink', highlight ? 'highlight' : ''),
    withModifiers('styledLink-custom', blockClassItem ?? ''),
    'no-underline pointer',

    {
      [typography]: true,
      'c-emphasis': highlight,
      'c-muted-1': !highlight && hasTitle && !isTitle,
      'c-on-base': !highlight && !hasTitle,
      'fw5 c-on-base': !highlight && isTitle,
      pointer: !disabled,
    }
  )

  const iconTestId = `icon-${iconPosition}`
  const iconComponent = iconProps?.id ? (
    <span className={`${handles.styledLinkIcon} mh2`} data-testid={iconTestId}>
      <Icon
        id={iconProps.id}
        isActive={iconProps.isActive}
        size={iconProps.size}
        viewBox={iconProps.viewBox}
        activeClassName={iconProps.activeClassName}
        mutedClassName={iconProps.mutedClassName}
      />
    </span>
  ) : null

  const content = (
    <div className={`${handles.styledLinkContent} flex justify-between nowrap`}>
      {iconPosition === 'left' && iconComponent}
      {children}
      {iconPosition === 'right' && iconComponent}
      {accordion && (
        <div
          className={`${withModifiers(
            'accordionIcon',
            active ? 'isOpen' : 'isClosed'
          )} ml3 c-muted-2`}
        >
          {active ? '-' : '+'}
        </div>
      )}
    </div>
  )

  return (
    <div
      className={classNames(handles.styledLinkContainer, 'mh6', {
        pv2: orientation === 'vertical',
        pv5: orientation === 'horizontal' && level === 1,
      })}
    >
      {disabled || !hasLink || accordion ? (
        <span className={linkClassNames}>{content}</span>
      ) : (
        <Link to={to} {...rest} className={linkClassNames}>
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
  iconId?: string
  iconProps?: IconProps
  blockClass?: string
  blockClassItem?: string
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
  iconPosition: 'left',
}

export default StyledLink
