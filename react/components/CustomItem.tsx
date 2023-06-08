import React, { FunctionComponent } from 'react'
import { injectIntl } from 'react-intl'
import { formatIOMessage } from 'vtex.native-types'

import StyledLink, { StyledLinkProps } from './StyledLink'

const CustomItem: FunctionComponent<
  CustomItemProps & { intl: any }
> = props => {
  const {
    type,
    noFollow,
    tagTitle,
    text,
    href,
    intl,
    blockClassItem,
    ...rest
  } = props

  return (
    <StyledLink
      blockClassItem={blockClassItem}
      {...rest}
      to={href}
      title={formatIOMessage({ id: tagTitle, intl })}
      {...(type === 'external' ? { target: '_blank', rel: 'noopener' } : {})}
      {...(noFollow ? { rel: 'nofollow noopener' } : {})}
    >
      {formatIOMessage({ id: text, intl })}
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
  blockClassItem?: string
}

export default injectIntl(CustomItem)
