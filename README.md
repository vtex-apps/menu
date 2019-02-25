# VTEX Menu

## Description

The VTEX Menu app is store component that shows a bar with links and drop-down menus, and this app is used by store theme.

:loudspeaker: **Disclaimer:** Don't fork this project; use, contribute, or open issue with your feature request.

## Release schedule

| Release |       Status        | Initial Release | Maintenance LTS Start | End-of-life | Store Compatibility |
| :-----: | :-----------------: | :-------------: | :-------------------: | :---------: | :-----------------: |
|  [2.x]  | **Current Release** |   2018-11-27    |                       |             |         2.x         |
|  [1.x]  | **Maintenance LTS** |   2018-08-17    |      2018-11-27       | March 2019  |         1.x         |

See our [LTS policy](https://github.com/vtex-apps/awesome-io#lts-policy) for more information.

## Continuous Integrations

### Travis CI

[![Build Status](https://travis-ci.org/vtex-apps/menu.svg?branch=master)](https://travis-ci.org/vtex-apps/menu)

## Table of Contents

- [Usage](#usage)
  - [Blocks API](#blocks-api)
    - [Configuration](#configuration)
  - [Styles API](#styles-api)
    - [CSS namespaces](#css-namespaces)
- [Troubleshooting](#troubleshooting)
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

Then, add `menu-link` block into your app theme as we do in our [Store theme app](https://github.com/vtex-apps/store-theme/blob/master/store/blocks.json).

Now, you can change the behavior of the menu block that is in the store header. See an example of how to configure:

```json
"menu-link": {
    "props": {
      "links": [
        {
          "typeOfRoute": "internal",
          "page": "store/home",
          "position": "right",
          "text": "Atendimento",
        }
      ]
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

Through the Storefront, you can change the menu's behavior and interface. However, you also can make in your theme app, as Store theme does.

| Prop name | Type          | Description                                   | Default value |
| --------- | ------------- | --------------------------------------------- | ------------- |
| `links`   | `Array(Link)` | Array of links that should appear in the menu | []            |

Link:

| Prop name      | Type     | Description                                          | Default value |
| -------------- | -------- | ---------------------------------------------------- | ------------- |
| `text`         | `String` | Link text                                            | N/A           |
| `internalPage` | `String` | Internal page path to redirect                       | N/A           |
| `params`       | `String` | Parameters to pass when redirect to an internal page | N/A           |
| `externalPage` | `String` | External page path to redirect                       | N/A           |
| `typeOfRoute`  | `String` | The route type, it can be `internal` or `external`   | N/A           |
| `page`         | `String` | Page route to redirect when the link is clicked      | N/A           |
| `position`     | `String` | Link position                                        | N/A           |

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

## Troubleshooting

You can check if others are passing through similar issues [here](https://github.com/vtex-apps/menu/issues). Also feel free to [open issues](https://github.com/vtex-apps/menu/issues/new) or contribute with pull requests.

## Tests

To execute our tests go to `react/` folder and run `npm test`
