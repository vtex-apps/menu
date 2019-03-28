import React, { Component } from 'react'
import { Query } from 'react-apollo'
import category from '../graphql/category.graphql'
import StyledLink from './StyledLink'

class CategoryItem extends Component<CategoryItemProps, State> {
  public static getDerivedStateFromError() {
    return { hasError: true }
  }

  public state = { hasError: false }

  public componentDidCatch(error: any) {
    console.log({ error })
  }

  public render() {
    const { categoryId, text, typography, isHovered } = this.props

    if (this.state.hasError) {
      return null
    }

    return (
      <Query query={category} variables={{ id: categoryId }}>
        {({ data, loading, error }) => {
          if (error) {
            throw new Error(`GraphQL error while rendering Menu rendered Category id ${categoryId}`)
          }

          if (loading) {
            // TODO: Add a ContentLoader here
            return null
          }

          return (
            <StyledLink 
              isHovered={isHovered}
              typography={typography}
              to={data.category.href}>
              {text ? text : data.category.name}
            </StyledLink>
          )
        }}
      </Query>
    )
  }
}

export interface CategoryItemProps extends CategoryItemSchema {
  isHovered: boolean
  typography?: string
}

interface State {
  hasError: boolean
}

export default CategoryItem