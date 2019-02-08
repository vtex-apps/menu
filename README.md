# VTEX Menu

## Description

The VTEX Menu is an app that shows a bar with links and dropdown menus and it is used by the Dreamstore product.

:loudspeaker: **Disclaimer:** Don't fork this project, use, contribute, or open issue with your feature request.

## Release schedule
| Release  | Status              | Initial Release | Maintenance LTS Start | End-of-life | Dreamstore Compatibility
| :--:     | :---:               |  :---:          | :---:                 | :---:       | :---: 
| [1.x]    | **Maintenance LTS** |  2018-08-17     | 2018-11-27            | March 2019  | 1.x
| [2.x]    | **Current Release** |  2018-11-27     |                       |             | 2.x


## Continuous Integrations 

### Travis CI 

[![Build Status](https://travis-ci.org/vtex-apps/menu.svg?branch=master)](https://travis-ci.org/vtex-apps/menu)


## Table of Contents
- [Usage](#usage)
  - [Blocks API](#blocks-api)
    - [Configuration](#configuration)
  - [Styles API](#styles-api)
- [Troubleshooting](#troubleshooting)
- [Tests](#tests)

## Usage

This app uses our store builder with the blocks architecture. To know more about Store Builder [click here.](https://help.vtex.com/en/tutorial/understanding-storebuilder-and-stylesbuilder#structuring-and-configuring-our-store-with-object-object)

To use this app, you need to add it in your `dependencies` in the `manifest.json` file.

```json
  dependencies: {
    "vtex.menu": "2.x"
  }
```

Then, add the `menu-link` block into our app theme, as we do in our [Dreamstore app](https://github.com/vtex-apps/dreamstore/blob/master/store/blocks.json). 

### Blocks API
:construction: :construction: :construction:

This app has an interface that describes what rules must be implemented by a block when you want to use the menu app.

```json
{
  "menu-link": {
    "component": "index"
  }
}
```

#### Configuration 
Through the Storefront, you can change the behavior and interface of the menu. However, you also can make in your theme app, as Dreamstore does.

| Prop name          | Type          | Description                                                            |
| ------------------ | ------------- | ---------------------------------------------------------------------- |
| `links`            | `Array(Link)` | Array of links that should appear in the menu                          |

Link:

| Prop name          | Type          | Description                                                            |
| ------------------ | ------------- | ---------------------------------------------------------------------- |
| `text`             | `String`      | Link text                                                              |
| `internalPage`     | `String`      | Internal page path to redirect                                         |
| `params`           | `String`      | Parameters to pass when redirect to an internal page                   |
| `externalPage`     | `String`      | External page path to redirect										  |
| `typeOfRoute`      | `String`      | The route type, it can be `internal` or `external`                     |
| `page`             | `String`      | Page route to redirect when the link is clicked                        |
| `position`         | `String`      | Link position 								                          |

### Styles API
:construction: :construction: :construction:

## Troubleshooting
You can check if others are passing through similar issues [here](https://github.com/vtex-apps/menu/issues). Also feel free to [open issues](https://github.com/vtex-apps/menu/issues/new) or contribute with pull requests.

## Tests

Run the tests with the command
```
cd react && npm t
```
