import React from 'react'

import DefaultMenuItem from './MenuItem'

type NavigationId = number

interface Navigation {
  id: NavigationId
  MenuItem: React.ComponentType
}

interface Props {
  navigation?: Partial<Navigation>
}

const defaultNavigation: Navigation = {
  id: 10000,
  MenuItem: DefaultMenuItem,
}

export default function Menu(props: Props) {
  const { navigation: navProp = defaultNavigation } = props
  const { id, MenuItem } = {
    ...defaultNavigation,
    ...navProp,
  }

  return (
    <div>
      id - {id}
      <MenuItem />
    </div>
  )
}
