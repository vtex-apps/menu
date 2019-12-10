# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [Unreleased]
### Fixed
- Docs on submenu

## [2.20.3] - 2019-12-10
### Fixed
- href prop in menu-item should be of type string and not a translatable text.

## [2.20.2] - 2019-12-09
### Added
- New CSS handles.

### Changed
- Updated CSS handles and changed `MenuLink` to function component.

## [2.20.1] - 2019-11-22
### Fixed
- Update docs.

## [2.20.0] - 2019-11-21
### Added
- Allow `info-card`, `flex-layout`, `notification`, `rich-text`, and `image` in `submenu`.

## [2.19.5] - 2019-11-21

### Fixed
- `Item`'s `itemProps` was being overwritten by `{...rest}`, this caused an issue where links modified in the site editor weren't clickable in the menu.

## [2.19.4] - 2019-11-12

## [2.19.3] - 2019-11-12
### Fixed
- Duplicate query name `category`.

## [2.19.2] - 2019-11-04
### Fixed
- Issue on collapsible menu where it wouldn't open properly.

## [2.19.1] - 2019-10-31
### Changed
- Prevent submenu from rendering when it's not active.

## [2.19.0] - 2019-10-30
### Changed
- The `Menu` component is now using the list context and it receive link from site editor now

## [2.18.5] - 2019-10-25
### Chore
- New release to trigger a rebuild enabling lazy evaluation of menu entrypoints

## [2.18.4] - 2019-09-04

### Fixed

- Fix iconId DOM warning from Link

## [2.18.3] - 2019-08-30

## [2.18.2] - 2019-08-29

## [2.18.1] - 2019-08-19

### Fixed

- StyledLink's href when it had a question mark

## [2.18.0] - 2019-07-23

### Added

- MenuItems can have icon now by receiving the `iconProps` and `iconToTheRight` props

## [2.17.2] - 2019-07-16

### Fixed
- Menu items href must be an IO message

## [2.17.1] - 2019-07-16
### Fixed
- Allows accordion submenus to expand the height of their parents.

## [2.17.0] - 2019-07-11
### Added
- Support to `contentSchemas.json` with dynamic form

## [2.16.3] - 2019-07-08
### Changed
- Menu items that are in accordion mode expand instead of going to a link.

## [2.16.2] - 2019-07-02

## [2.16.1] - 2019-07-02

### Added
- Allowed `image` component on sub-menus.

## [2.16.0] - 2019-06-14

### Added
- Blockclass prop.

## [2.15.0] - 2019-06-03
### Added
- Support for vertical orientation and different paddings on Submenu.

## [2.14.2] - 2019-05-28
### Fixed
- Menu messages.

## [2.14.1] - 2019-05-26

### Fixed

- Prop types warning.

## [2.14.0] - 2019-05-25

### Added
- Added CSS override classes at menu and styled link.

## [2.13.2] - 2019-05-23
### Fixed
- Fixes bug where CategoryMenu would break if `children` was null.

## [2.13.1] - 2019-05-08
### Fixed
- `StyledLink` passing query parameters to `Link`'s `to` prop, instead of to `query`.

## [2.13.0] - 2019-04-25

### Added
- New `submenu.accordion` block.

## [2.12.0] - 2019-04-24
### Changed
- Scopes messages by domain

## [2.11.0] - 2019-04-16
### Added
- Render category tree in menu.

## [2.10.0] - 2019-04-16

### Added
- Allow `info-card` inside `submenu` and `submenu-col`.

## [2.9.0] - 2019-04-11
### Changed
- Removed `unstable` flags from new menu models.
- Renamed `col` to `submenu-col`.

### Deprecated
- The blocks with `unstable--` flags are deprecated and will be removed soon.

## [2.8.1] - 2019-04-10

### Fixed

- Add missing translations for Portuguese and Spanish.

## [2.8.0] - 2019-04-09

### Added

- Add to `unstable--menu` and `unstable-second-level-menu` the `title` property.

## [2.7.0] - 2019-03-28

## [2.6.6] - 2019-02-27

### Added

- Token `bg-base` on container
- Snapshot tests with react-testing-library.

## [2.6.5] - 2019-02-14

## [2.6.4] - 2019-02-14

## [2.6.3] - 2019-02-12

## [2.6.2] - 2019-02-09

### Changed

- Add page padding in menu link.

## [2.6.1] - 2019-02-09

### Fixed

- Remove `inheritComponent` from blocks.

## [2.6.0] - 2019-01-28

## [2.5.0] - 2019-01-18

### Changed

- Update React builder to 3.x.

## [2.4.1] - 2019-01-14

### Changed

- Remove `undefined` class.

## [2.4.0] - 2019-01-09

### Changed

- Bye `pages.json`! Welcome `store-builder`.

## [2.3.0] - 2018-12-20

### Added

- Support to messages builder.

## [2.2.0] - 2018-12-18

### Changed

- Add support to CSS modules.

## [2.1.0] - 2018-12-18

### Feature

- Render nothing if there is no links to be displayed.

## [2.0.1] - 2018-11-30

- Update link rendering to include internal/external.

## [2.0.0] - 2018-11-27

### Fixed

- Use design tokens for typography and colors.

## [1.1.0] - 2018-10-31

### Changed

- Move app to typescript.

## [1.0.4] - 2018-09-05

### Changed

- Menu's schema now uses type array.

## [1.0.3] - 2018-08-30

### Fixed

- Links default colors.

## [1.0.2] - 2018-08-24

### Changed

- Change background color to white.

## [1.0.1] - 2018-08-24

### Changed

- Change the layout to a light version.

## [1.0.0] - 2018-08-17

### Changed

- remove border-bottom from `menu`.
- decreased menu height.

## [0.3.0] - 2018-6-11

### Added

- Support for internal and external link routes.
- Internationalization to the schema.

## [0.2.0] - 2018-5-30

### Changed

- Hide menu on mobile mode.

## [0.1.1] - 2018-05-07

### Fixed

- Fix format text of left item.

## [0.1.0] - 2018-05-05

### Added

- Initial files and logic created.
