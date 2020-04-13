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
    navigationItem: NavigationItem
    children?: React.ReactNode
    linkItemClasses?: string
  }

  type PossibleWrappedElements = 'children'

  // This is useful if the user wants to change the order between
  // children and the items of the menu
  type WrapElements = 'none' | PossibleWrappedElements

  interface SubmenuProps {
    id: NavigationId
    SubmenuList?: React.ComponentType
    children?: React.ReactNode
    wrapElements?: WrapElements
  }
}
