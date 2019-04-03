import React, { FunctionComponent } from 'react'
import StyledLink from './StyledLink'

const CustomItem : FunctionComponent<CustomItemProps> = (props) => {
  return (
    <StyledLink
      highlight={props.highlight}
      isHovered={props.isHovered}
      typography={props.typography}
      to={props.href}
      title={props.tagTitle}
      {...props.type === 'external'
        ? { target: '_blank' }
        : {}
      }
      {...props.noFollow
        ? { rel: 'nofollow noopener' }
        : {}
      }>
      {props.text}
    </StyledLink>
  )
}

export interface CustomItemProps extends CustomItemSchema {
  isHovered: boolean
  highlight: boolean
  typography?: string
}

export interface CustomItemSchema {
  type: 'internal' | 'external'
  href: string
  noFollow: boolean
  tagTitle: string
  text: string
}

export default CustomItem