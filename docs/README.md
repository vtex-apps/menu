📢 Don't fork this project. Use, contribute, or open issues through [Store Discussion](https://github.com/vtex-apps/store-discussion).

# Menu

<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->

[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors)

<!-- ALL-CONTRIBUTORS-BADGE:END -->

VTEX Menu is a store component that displays a bar containing links and dropdown submenus.

![menu-app](https://cdn.jsdelivr.net/gh/vtexdocs/dev-portal-content@main/images/vtex-menu-0.png)

## Configuration

1. Import the menu app to your dependencies as `manifest.json`. For example:

```json
  "dependencies": {
    "vtex.menu": "2.x"
  }
```

2. Add the `vtex.menu@2.x:menu` block to the [store header](https://github.com/vtex-apps/store-header/blob/master/store/interfaces.json) template.

3. Configure the `menu-item` blocks to build the store menu options. These can be declared in two ways in `vtex.menu@2.x:menu`: as children or as props. The advantage of the second type of `menu-item` configuration is that Site Editor can be used to edit the blocks.

### `menu-item` as children

_Example:_

```json
"vtex.menu@2.x:menu#websites": {
  "children": [
    "menu-item#shop",
    "menu-item#about-us"
  ]
},
"menu-item#shop": {
  "props": {
    "id": "menu-item-shop",
    "type": "custom",
    "highlight": false,
    "blockClassItem": "custom-class"
    "itemProps": {
      "type": "internal",
      "href": "#",
      "noFollow": false,
      "tagTitle": "Shop",
      "text": "Shop"
    },
    "iconProps": {
      "id": "bnd-logo",
      "size": 16,
      "viewBox": "0 0 16 16",
      "activeClassName": "rebel-pink",
      "mutedClassName": "c-action-primary"
    },
    "iconToTheRight": true
  }
}
```

### `menu-item` as props

_Example:_

```json
"vtex.menu@2.x:menu#websites": {
  "props": {
    "items": [
      {
        "id": "menu-item-shop",
        "type": "custom",
        "highlight": false,
        "itemProps": {
          "type": "internal",
          "href": "#",
          "noFollow": false,
          "tagTitle": "Shop",
          "text": "Shop"
        }
      },
      {
        "id": "menu-item-about-us",
        "type": "custom",
        "highlight": false,
        "itemProps": {
          "type": "internal",
          "href": "/about-us",
          "noFollow": false,
          "tagTitle": "about-us",
          "text": "About Us"
        }
      }
    ]
  }
}
```

You can define a submenu for a menu item:

```jsonc
"menu-item#shop": {
  "props": {
    "type": "custom",
    "highlight": false,
    "itemProps": {
      "type": "internal",
      "href": "#",
      "noFollow": false,
      "tagTitle": "Shop",
      "text": "Shop"
    },
  },
  "blocks": ["vtex.menu@2.x:submenu#shop"] // Defining a submenu
},
"vtex.menu@2.x:submenu#shop": {
  "children": [
    "vtex.menu@2.x:menu#submenushop"
  ]
},
"vtex.menu@2.x:menu#submenushop": {
  "children": [
    "menu-item#shop"
  ]
}
```

<div class="alert alert-info">
The Menu block has no prerequisite children. Therefore, Menu block implementations do not need to have any blocks declared within them to function properly.
</div>

The available `menu-item` block props are as follows:

| Prop name         | Type                           | Description                                                                                                                                                                                                                                                           | Default value |
| ----------------- | ------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| `type`            | `string`                       | Menu item type, either `category` or `custom`                                                                                                                                                                                                                         | `category`    |
| `blockClassItem`            | `string`                       | you can pass a class for each  menu item                                                                                                                                                                                                                         | `undefined`    |
| `id`              | `string`                       | Menu item ID                                                                                                                                                                                                                                                          | `undefined`   |
| `highlight`       | `boolean`                      | Whether the item has a highlight                                                                                                                                                                                                                                      | `undefined`   |
| `iconPosition`    | `string`                       | Icon position relative to the menu item text. Either to the `left` or `right`.                                                                                                                                                                                        | `left`        |
| `iconProps`       | `IconProps`                    | Icon props                                                                                                                                                                                                                                                            | `undefined`   |
| `onMountBehavior` | `enum`                         | Whether the submenu should always be automatically displayed when its parent is hovered/clicked on (`open`) or (`close`).                                                                                                                                             | `closed`      |
| `itemProps`       | `CategoryItem` or `CustomItem` | Item props                                                                                                                                                                                                                                                            | `undefined`   |
| `classes`         | `CustomCSSClasses`             | Used to override default CSS handles. To better understand how this prop works, we recommend reading about it [here](https://github.com/vtex-apps/css-handles#usecustomclasses). Please note that this is only useful when importing this block as a React component. | `undefined`   |

- For icons in the menu items:

| Prop name         | Type      | Description                             | Default value |
| ----------------- | --------- | --------------------------------------- | ------------- |
| `id`              | `string`  | Icon ID                                 | N/A           |
| `isActive`        | `boolean` | Whether or not the item is active       | `true`        |
| `size`            | `number`  | Icon size                               | 16            |
| `viewBox`         | `string`  | Icon view box                           | `0 0 16 16`   |
| `activeClassName` | `string`  | Icon classname when `isActive` is true  | N/A           |
| `mutedClassName`  | `string`  | Icon classname when `isActive` is false | N/A           |

- For category-related menu items:

| Prop name    | Type     | Description      | Default value |
| ------------ | -------- | ---------------- | ------------- |
| `categoryId` | `number` | Item category ID | N/A           |
| `text`       | `string` | Menu item text   | N/A           |

- For customized items:

| Prop name  | Type      | Description                                     | Default value |
| ---------- | --------- | ----------------------------------------------- | ------------- |
| `type`     | `string`  | Menu item type, either `internal` or `external` | `internal`    |
| `href`     | `string`  | Link to where the menu item leads               | N/A           |
| `noFollow` | `boolean` | No follow attribute                             | N/A           |
| `tagTitle` | `string`  | Menu item tag                                   | N/A           |
| `text`     | `string`  | Menu item text                                  | N/A           |

#### Customization

To apply CSS customizations to this and other blocks, please follow the instructions in [Using CSS Handles for store customization](https://developers.vtex.com/docs/guides/vtex-io-documentation-using-css-handles-for-store-customization).

| CSS Handle                 |
| -------------------------- |
| `accordionIcon--isClosed`  |
| `accordionIcon--isOpen`    |
| `accordionIcon`            |
| `container`                |
| `linkLeft`                 |
| `linkMiddle`               |
| `linkRight`                |
| `menuContainerNav`         |
| `menuContainer`            |
| `menuItemInnerDiv`         |
| `menuItem`                 |
| `menuItem--isOpen`         |
| `menuItem--isClosed`       |
| `menuLinkDivLeft`          |
| `menuLinkDivMiddle`        |
| `menuLinkDivRight`         |
| `menuLinkNav`              |
| `renderLink`               |
| `styledLinkContainer`      |
| `styledLinkContent`        |
| `styledLinkIcon`           |
| `styledLink`               |
| `submenuAccordion`         |
| `submenuColumn`            |
| `submenuContainer`         |
| `submenuWrapper--isClosed` |
| `submenuWrapper--isOpen`   |
| `submenuWrapper`           |
| `submenu`                  |

## Contributors

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
<table><tr><td align="center"><a href="http://giovanapereira.com.br/"><img src="https://avatars3.githubusercontent.com/u/26018620?v=4" width="100px;" alt="Giovana Pereira"/><br /><sub><b>Giovana Pereira</b></sub></a><br /><a href="https://github.com/vtex-apps/menu/commits?author=giovanapereira" title="Code">💻</a></td></tr></table>

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind are welcome!
