import React, { FunctionComponent } from 'react'
import StyledLink, { StyledLinkProps } from './StyledLink'

const CustomItem : FunctionComponent<CustomItemProps> = (props) => {
  const { type, noFollow, tagTitle, text, href, ...rest } = props

  return (
    <StyledLink
      {...rest}
      to={href}
      title={tagTitle}
      {...type === 'external'
        ? { target: '_blank' }
        : {}
      }
      {...noFollow
        ? { rel: 'nofollow noopener' }
        : {}
      }>
      {props.text}
    </StyledLink>
  )
}

export interface CustomItemProps extends CustomItemSchema, StyledLinkProps {}

export interface CustomItemSchema {
  type: 'internal' | 'external'
  href: string
  noFollow: boolean
  tagTitle: string
  text: string
}

export default CustomItem