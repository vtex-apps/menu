declare module 'navigation' {
  type NavigationId = number | string

  interface NavigationItem {
    id: NavigationId
    label?: string
    link?: string
    subNavigation?: NavigationId
  }

  interface Navigation {
    id: NavigationId
    title?: string
    items: NavigationItem[]
  }

  interface MenuItemProps {
    id: NavigationId
    navigationItem: NavigationLeafItem | NavigationItem
    children?: React.ReactNode
  }

  interface MenuItemLeafProps extends MenuItemProps {
    [key: string]: any
  }

  type PossibleWrappedElements = 'children' | 'items'

  // This is useful if the user wants to change the order between
  // children and the items of the menu
  type WrapElements = 'all' | 'none' | PossibleWrappedElements

  interface SubmenuProps {
    id: NavigationId
    navigation: {
      id: NavigationId
      Item?: React.ComponentType
    }
    children?: React.ReactNode
    wrapElements?: WrapElements
  }
}
