import { useMemo } from 'react'
import { NavigationId } from 'navigation'

import MenuItem from '../MenuItem'
import VerticalList from '../SubmenuItemVerticalList'
import HorizontalList from '../SubmenuItemHorizontalList'

// Apparel & Accessories menu -> vertical list -> item
// Home & Decor menu -> horizontal list -> item
// More menu -> menu-item.root -> submenu -> horizontal-list -> vertical-list -> menu-item

// TO BE IMPLEMENTED
// menu -> vertical list -> horizontal list -> item
// menu -> horizontal list -> vertical list -> vertical list

// MAYBE DOESN'T MAKE SENSE
// menu -> horizontal list -> vertical list -> horizontal list -> item

// Apparel & Accessories 10026
// Home & Decor 10033
// More 10004

export interface MockSubConfig {
  List?: React.ComponentType<any>
  TopItem: React.ComponentType<any>
  ListItem: MockSubConfig | React.ComponentType<any> | null
}

export interface MockConfiguration {
  List: React.ComponentType<any>
  subConfig: MockSubConfig
}

export default function useMockConfig(
  id: NavigationId
): MockConfiguration | null {
  return useMemo(() => {
    switch (id) {
      case '10026':
        return {
          List: VerticalList,
          subConfig: {
            TopItem: MenuItem,
            ListItem: MenuItem,
          },
        }
      case '10033':
        return {
          List: HorizontalList,
          subConfig: {
            TopItem: MenuItem,
            ListItem: MenuItem,
          },
        }
      case '10004':
        return {
          List: HorizontalList,
          subConfig: {
            List: VerticalList,
            TopItem: MenuItem,
            ListItem: {
              TopItem: MenuItem,
              ListItem: MenuItem,
            },
          },
        }

      default:
        return null
    }
  }, [id])
}
