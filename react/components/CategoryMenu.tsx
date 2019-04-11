import React, { FunctionComponent } from 'react'
import { Query } from 'react-apollo'

import categoryWithChildren from '../graphql/categoryWithChildren.graphql'
import StyledLink from './StyledLink'

const CategoryLink: FunctionComponent<any> = ({ category: { name, href, titleTag } }: {category: Category }, isTitle) => (
  <StyledLink
    title={titleTag}
    to={href}
    isTitle={isTitle}
  >
    {name}
  </StyledLink>
)

const CategoryMenu: FunctionComponent<CategoryMenuProps> = ({ categoryId }: CategoryMenuProps) => {

  return (
    <Query query={categoryWithChildren} variables={{ id: categoryId }}>
      {({ data, loading, error }) => {
        if(error || loading){
          //TODO add loader and error message
          return null
        }

        const { category, category: { children } } : { category: Category } = data
        return <>
          <CategoryLink category={category} isTitle/>
          {children.map((child: Category) => 
            <li key={child.id}>
                <CategoryLink category={child}/>
            </li>
          )}
        </>
      }}
    </Query>
  )
}

interface CategoryMenuProps{
    categoryId: number
}


interface Category{
  id: number
  titleTag: string
  href: string
  name: string
  children: Category[]
}

export default CategoryMenu