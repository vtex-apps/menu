📢 Don't fork this project. Use, contribute, or open issues through [Store Discussion](https://github.com/vtex-apps/store-discussion).

# VTEX Menu

[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors)

VTEX Menu is a store component responsible for displaying a bar containing links and drop-down sub-menus. 

![menu-app](https://user-images.githubusercontent.com/52087100/68619014-5af1c680-04a9-11ea-9cdc-23468bd55c23.png)

## Configuration

1. Import the menu's app to your dependencies as `manifest.json`, for example:

```
  dependencies: {
    "vtex.menu": "2.x"
  }
```
2. Add the `vtex.menu@2.x:menu` block to the [store header](https://github.com/vtex-apps/store-header/blob/master/store/interfaces.json) template.

3. To build the store's menu options, you need to configure the `menu-item` blocks. These can be declared in two different ways in `vtex.menu@2.x:menu`: as children or as props. The advantage of this latest `menu-item` configuration compared is that Site Editor can be used to edit the blocks. 

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
 "menu-item#about-us": {
   "props":
      {
        "id": "menu-item-about-us",
        "type": "custom",
        "iconId": null,
        "highlight": false,
        "itemProps": {
          "type": "internal",
          "href": "/about-us",
          "noFollow": false,
          "tagTitle": "about-us",
          "text": "About Us"
        }
      }
    }
```

### `menu-item` as props

_Example:_

```
"vtex.menu@2.x:menu#websites": {
    "props": {
      "items": [
        {
          "id": "menu-item-shop",
          "type": "custom",
          "iconId": null,
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
          "iconId": null,
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

<div class="alert alert-info">
The Menu block has no prerequisite children. Therefore, any menu block implementation does not need to have any blocks declared within it to properly function. 
</div>

The available `menu-item` block props are as follows:

| Prop name      | Type     | Description                                          | Default value |
| -------------- | -------- | ---------------------------------------------------- | ------------- |
| `type`         | `String` | Menu item type, either `category` or `custom`                                            | `caterogy`           |
| `id`         | `String` | menu item ID                                           | N/A           |
| `highlight`         | `boolean` | Whether the item has highlight                                            | N/A           |
| `iconPosition`         | `String` | Icon position relative to the menu item text. Either to the `left` or `right`                                           | `left`          |
| `iconProps`         | `IconProps` | Icon props                                           | N/A           |
| `itemProps`         | `CategoryItem` or `CustomItem` | Item props                                           | N/A           |
- For icons in the menu items:

| Prop name      | Type     | Description                                          | Default value |
| -------------- | -------- | ---------------------------------------------------- | ------------- |
| `id`         | `String` | Icon ID  | N/A           |
| `isActive`         | `boolean` | Whether the item is active or not | `true`          |
| `size`         | `number` | Icon size | 16           |
| `viewBox`         | `String` | Icon view box   | `0 0 16 16`           |
| `activeClassName`         | `String` | Icon classname when `isActive` is true  | N/A           |
| `mutedClassName`         | `String` | Icon classname when `isActive` is false  | N/A           |

- For category related menu items:

| Prop name      | Type     | Description                                          | Default value |
| -------------- | -------- | ---------------------------------------------------- | ------------- |
| `categoryId`         | `number` | Item category ID  | N/A           |
| `text`         | `String` | Menu item text  | N/A          |

- For customized items:

| Prop name      | Type     | Description                                          | Default value |
| -------------- | -------- | ---------------------------------------------------- | ------------- |
| `type`         | `String` | Menu item type, either `internal` or `external` | `internal`           |
| `href`         | `String` |  Link to where the menu item leads  | N/A |
| `noFollow`         | `boolean` | No follow attribute  | N/A          |
| `tagTitle`         | `String` | Menu item tag  | N/A          |
| `text`         | `String` | Menu item text  | N/A          |

#### Customization

| CSS Handle   | Description                                          | Component Source                     |
| ------------ | ---------------------------------------------------- | ------------------------------------ |
| `container`  | Menu's main container                           | [index](/react/index.tsx)            |
| `linkLeft`   | Link container when link is aligned to the left  | [index](/react/index.tsx)            |
| `linkMiddle` | Link container when link is center-aligned | [index](/react/index.tsx)            |
| `linkRight`  | Link container when link is aligned to the right | [index](/react/components/index.tsx) |
| `submenuAccordion`  |  Sub menu accordion | [SubmenuAccordion](/react/SubmenuAccordion.tsx) |
| `submenu`  |  Sub menu | [Submenu](/react/Submenu.tsx) |
| `menuItem`  |  Menu item | [MenuItem](/react/MenuItem.tsx) |
| `menuContainer`  | Menu container | [Menu](/react/Menu.tsx) |
| `styledLink`  | Link to StyledLink | [StyledLink](/react/components/StyledLink.tsx) |
| `styledLinkContainer`  | Link StyledLink container | [StyledLink](/react/components/StyledLink.tsx) |
| `styledLinkIcon`  | Link to StyledLink icons | [StyledLink](/react/components/StyledLink.tsx) |

## Contributors

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
<table><tr><td align="center"><a href="http://giovanapereira.com.br/"><img src="https://avatars3.githubusercontent.com/u/26018620?v=4" width="100px;" alt="Giovana Pereira"/><br /><sub><b>Giovana Pereira</b></sub></a><br /><a href="https://github.com/vtex-apps/menu/commits?author=giovanapereira" title="Code">💻</a></td></tr></table>

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
