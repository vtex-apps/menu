# VTEX Menu
[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors)

## Description

The VTEX Menu app is store component that shows a bar with links and drop-down menus, and this app is used by store theme.

:loudspeaker: **Disclaimer:** Don't fork this project; use, contribute, or open issue with your feature request.

## Release schedule

| Release |       Status        | Initial Release | Maintenance LTS Start | End-of-life | Store Compatibility |
| :-----: | :-----------------: | :-------------: | :-------------------: | :---------: | :-----------------: |
|  [2.x]  | **Current Release** |   2018-11-27    |                       |             |         2.x         |
|  [1.x]  | **Maintenance LTS** |   2018-08-17    |      2018-11-27       | March 2019  |         1.x         |

See our [LTS policy](https://github.com/vtex-apps/awesome-io#lts-policy) for more information.

## Table of Contents

- [Usage](#usage)
  - [Blocks API](#blocks-api)
    - [Configuration](#configuration)
  - [Styles API](#styles-api)
    - [CSS namespaces](#css-namespaces)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [Tests](#tests)

## Usage

This app uses our store builder with the blocks architecture. To know more about Store Builder [click here.](https://help.vtex.com/en/tutorial/understanding-storebuilder-and-stylesbuilder#structuring-and-configuring-our-store-with-object-object)

We add the menu as a block in our [Store Header](https://github.com/vtex-apps/store-header/blob/master/store/interfaces.json).

To configure or customize this app, you need to import it in your dependencies in `manifest.json`.

```json
  dependencies: {
    "vtex.menu": "2.x"
  }
```

Then, add `vtex.menu@2.x:menu` block into your app theme as we do in our [Store theme app](https://github.com/vtex-apps/store-theme/blob/master/store/blocks.json). Since the menu block is composed by a list of `menu-item` you should also add them to the app theme.

Now, you can change the behavior of the menu block that is in the store. See an example of how to configure:

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
```

### Blocks API

When implementing this app as a block, various inner blocks may be available. The following interface lists the available blocks within menu and describes if they are required or optional.

```json
"menu-link": {
	"component": "index"
}
```

The menu has no required or allowed block. So, any menu block implementation do not need any block inside of menu.

#### Configuration

Through the Storefront, you can change the menu's behavior and interface. However, you also can make in your theme app, as Store theme does. The menu have `menu-item` as children. The props of the `menu-item` are as it follows:

MenuItem:

| Prop name      | Type     | Description                                          | Default value |
| -------------- | -------- | ---------------------------------------------------- | ------------- |
| `type`         | `String` | the type of the menu item. Can be `category` or `custom`                                            | `caterogy`           |
| `id`         | `String` | the ID of the menu item                                            | N/A           |
| `highlight`         | `boolean` | if the item should have highlight                                            | N/A           |
| `iconPosition`         | `String` | the icon position relative to the menu item text. Can be `left` or `right`                                           | `left`          |
| `iconProps`         | `IconProps` | props of the icon                                           | N/A           |
| `itemProps`         | `CategoryItem` or `CustomItem` | props of the item                                           | N/A           |

Menu:

| Prop name      | Type     | Description                                          | Default value |
| -------------- | -------- | ---------------------------------------------------- | ------------- |
| `items`| `MenuItemProps[]` | It receives an array of props of `MenuItem`s and render them, you can pass this through the site editor | `[]` | 

IconProps:

| Prop name      | Type     | Description                                          | Default value |
| -------------- | -------- | ---------------------------------------------------- | ------------- |
| `id`         | `String` | the id of the icon  | N/A           |
| `isActive`         | `boolean` | if the item is active  | `true`          |
| `size`         | `number` | the icon size | 16           |
| `viewBox`         | `String` | the viewbox of the icon  | `0 0 16 16`           |
| `activeClassName`         | `String` | the classname of the icon when `isActive` is true  | N/A           |
| `mutedClassName`         | `String` | the classname of the icon when `isActive` is false  | N/A           |

CategoryItem:

| Prop name      | Type     | Description                                          | Default value |
| -------------- | -------- | ---------------------------------------------------- | ------------- |
| `categoryId`         | `number` | the id of the category of the item  | N/A           |
| `text`         | `String` | the text of the menu item  | N/A          |


CustomItem:

| Prop name      | Type     | Description                                          | Default value |
| -------------- | -------- | ---------------------------------------------------- | ------------- |
| `type`         | `String` | the type of the menu item. Can be `internal` or `external` | `internal`           |
| `href`         | `String` | the link where the menu item will lead to  | N/A |
| `noFollow`         | `boolean` | no follow attribute  | N/A          |
| `tagTitle`         | `String` | tag of the menu item  | N/A          |
| `text`         | `String` | text of the menu item  | N/A          |

### Styles API

This app provides some CSS classes as an API for style customization.

To use this CSS API, you must add the `styles` builder and create an app styling CSS file.

1. Add the `styles` builder to your `manifest.json`:

```json
  "builders": {
    "styles": "1.x"
  }
```

2. Create a file called `vtex.menu.css` inside the `styles/css` folder. Add your custom styles:

```css
.container {
  margin-top: 10px;
}
```

#### CSS namespaces

Below, we describe the namespaces that are defined in the menu.

| Token name   | Description                                          | Component Source                     |
| ------------ | ---------------------------------------------------- | ------------------------------------ |
| `container`  | The main container of menu                           | [index](/react/index.tsx)            |
| `linkLeft`   | Link container when the link is to be left aligned   | [index](/react/index.tsx)            |
| `linkMiddle` | Link container when the link is to be center aligned | [index](/react/index.tsx)            |
| `linkRight`  | Link container when the link is to be right aligned  | [index](/react/components/index.tsx) |
| `submenuAccordion`  | The sub menu accordion | [SubmenuAccordion](/react/SubmenuAccordion.tsx) |
| `submenu`  | The sub menu | [Submenu](/react/Submenu.tsx) |
| `menuItem`  | The menu item | [MenuItem](/react/MenuItem.tsx) |
| `menuContainer`  | The menu container | [Menu](/react/Menu.tsx) |
| `styledLink`  | Link to the StyledLink | [StyledLink](/react/components/StyledLink.tsx) |
| `styledLinkContainer`  | Link container of the StyledLink | [StyledLink](/react/components/StyledLink.tsx) |
| `styledLinkIcon`  | Link to the icons in the StyledLink | [StyledLink](/react/components/StyledLink.tsx) |

## Troubleshooting

You can check if others are passing through similar issues [here](https://github.com/vtex-apps/menu/issues). Also feel free to [open issues](https://github.com/vtex-apps/menu/issues/new) or contribute with pull requests.

## Contributing

Check it out [how to contribute](https://github.com/vtex-apps/awesome-io#contributing) with this project. 

## Tests

To execute our tests go to `react/` folder and run `yarn test`

### Travis CI

[![Build Status](https://travis-ci.org/vtex-apps/menu.svg?branch=master)](https://travis-ci.org/vtex-apps/menu)

## Contributors

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
<table><tr><td align="center"><a href="http://giovanapereira.com.br/"><img src="https://avatars3.githubusercontent.com/u/26018620?v=4" width="100px;" alt="Giovana Pereira"/><br /><sub><b>Giovana Pereira</b></sub></a><br /><a href="https://github.com/vtex-apps/menu/commits?author=giovanapereira" title="Code">💻</a></td></tr></table>

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!