import React, { FunctionComponent } from 'react'
import CategoryItem, { CategoryItemProps, CategoryItemSchema } from './CategoryItem'
import CustomItem, { CustomItemProps, CustomItemSchema } from './CustomItem'
import { StyledLinkProps } from './StyledLink';

type ItemComponent = (
  props: CategoryItemProps | CustomItemProps
) => React.ReactElement

const menuItemTypes = {
  category: CategoryItem,
  custom: CustomItem,
}

const Item : FunctionComponent<ItemProps> = (props) => {
  const { type, itemProps, ...rest} = props

  const Comp = menuItemTypes[type] as ItemComponent

  return (
    <Comp {...itemProps} {...rest} />
  )
}

interface ItemProps extends StyledLinkProps {
  type: 'category' | 'custom'
  itemProps: CategoryItemSchema | CustomItemSchema
}

export default Item