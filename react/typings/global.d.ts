import { FunctionComponent } from 'react'

declare global {
  interface StorefrontComponent<P = {}> extends FunctionComponent<P> {
    getSchema(props: P): object
  }

  interface MenuSchema {
    orientation?: 'vertical' | 'horizontal'
    textType?: Typography
  }

  enum Typography {
    heading1 = 't-heading-1',
    heading2 = 't-heading-2',
    heading3 = 't-heading-3',
    heading4 = 't-heading-4',
    heading5 = 't-heading-5',
    body = 't-body',
    small = 't-small',
    mini = 't-mini',
  }

  interface MenuItemSchema {
    id: string
    type: 'category' | 'custom'
    iconId: string
    highlight: boolean
    itemProps: CategoryParams  | CustomParams
  }

  interface CategoryItemSchema {
    categoryId: number
    text: string
  }

  interface CustomItemSchema {
    type: 'internal' | 'external'
    href: string
    noFollow: boolean
    tagTitle: string
    text: string
  }

  interface SubmenuSchema {
    width: '100%' | 'auto'
  }
}