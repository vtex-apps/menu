import React, { useMemo } from 'react'
import classnames from 'classnames'
import { NavigationId } from 'navigation'

import MenuItem from '../MenuItem'
import VerticalList from '../SubmenuItemVerticalList'
import HorizontalList from '../SubmenuItemHorizontalList'

// menu -> vertical list -> item
// menu -> horizontal-list -> vertical-list -> menu-item
// menu -> horizontal list -> item
// menu -> vertical list -> horizontal list -> item
// menu -> horizontal list -> vertical list -> vertical list

// MAYBE DOESN'T MAKE SENSE
// menu -> horizontal list -> vertical list -> horizontal list -> item

// only vertical 10026
// only horizontal 10033
// horizontal -> vertical 10004
// vertical -> horizontal 10040
// horizontal -> vertical -> vertical 10041
// brands -> horizontal 10081

// This would work just like a block
function BrandMenuItem(props: any) {
  const { linkItemClasses, ...rest } = props
  // this is like you were using blockClass
  const classes = classnames(linkItemClasses, 'vtex-menu-2-x-modifierBrand')
  return (
    <MenuItem linkItemClasses={classes} {...rest}>
      <img
        alt="Shirt"
        style={{ width: '100%' }}
        src="https://storecomponents.vtexassets.com/arquivos/ids/155553-500-auto?width=500&height=auto&aspect=true"
      />
    </MenuItem>
  )
}

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
      case '10040':
        return {
          List: VerticalList,
          subConfig: {
            List: HorizontalList,
            TopItem: MenuItem,
            ListItem: {
              TopItem: MenuItem,
              ListItem: MenuItem,
            },
          },
        }
      case '10041':
        return {
          List: HorizontalList,
          subConfig: {
            List: VerticalList,
            TopItem: MenuItem,
            ListItem: {
              List: VerticalList,
              TopItem: MenuItem,
              ListItem: {
                TopItem: MenuItem,
                ListItem: MenuItem,
              },
            },
          },
        }
      case '10081':
        return {
          List: HorizontalList,
          subConfig: {
            TopItem: MenuItem,
            ListItem: BrandMenuItem,
          },
        }
      default:
        return null
    }
  }, [id])
}
