declare module 'navigation' {
  type NavigationId = number | string

  interface NavigationItem {
    id: NavigationId
    label: string | undefined
    link?: string
    subNavigation?: NavigationId
  }

  interface Navigation {
    id: NavigationId
    title?: string
    items: NavigationItem[]
  }

  interface MenuItemDefaultProps {
    id: NavigationId
    navigationItem: NavigationItem
  }

  interface MenuItemProps extends MenuItemDefaultProps {
    [key: string]: any
  }

  type PossibleWrappedElements = 'children' | 'items'

  // This is useful if the user wants to change the order between
  // children and the items of the menu
  type WrapElements = 'all' | 'none' | PossibleWrappedElements

  interface SubmenuDefaultProps {
    id: NavigationId
    navigation: {
      id: NavigationId
      Item?: React.ComponentType
    }
    children?: React.ReactNode
    wrapElements?: WrapElements
  }

  interface SubmenuProps extends SubmenuDefaultProps {
    [key: string]: any
  }
}
