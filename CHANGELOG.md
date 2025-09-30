## Unreleased

* [Fix to avoid rendering of the context menu and scrollbar at every mouse move](https://github.com/flower-platform/react-timeline-10000/pull/99)
* [Change color used for BackgroundGradient](https://github.com/flower-platform/react-timeline-10000/pull/96)

## v2.10.0

* [Default split size](https://github.com/flower-platform/react-timeline-10000/pull/94/files)

## v2.9.0

* [Fix to allow variable row heights + programmatic scroll](https://github.com/flower-platform/react-timeline-10000/pull/69/files) 
* [Small fix for resize cursor size](https://github.com/flower-platform/react-timeline-10000/pull/89/files)

## v2.8.0, v2.8.1

* [Add `zoomEnabled` flag](https://github.com/flower-platform/react-timeline-10000/pull/90/files)
* [Small fix for context menu on mobile and item leave event](https://github.com/flower-platform/react-timeline-10000/pull/86/files)
* [Update comment for rct9k-items-inner style class](https://github.com/flower-platform/react-timeline-10000/pull/88/files)

## v2.7.5

* [Allow group.id to be any number (remove the "consecutive numbers starting from 0" restriction)](https://github.com/flower-platform/react-timeline-10000/pull/74/files)

## v2.7.4

* Updated `@famiprog-foundation/tests-are-demo` @ v1.0.1.

## v2.7.3

* [Improved API for Context Menu](https://github.com/flower-platform/react-timeline-10000/pull/79)
* [Add z-index to now marker to show on top of items, layers](https://github.com/flower-platform/react-timeline-10000/pull/82)
* [Small fix for zoom when have multiple instances, catch the event only if mouse is on our instance body](https://github.com/flower-platform/react-timeline-10000/pull/81)
* [Small issue at update when useMoment props is true](https://github.com/flower-platform/react-timeline-10000/pull/83)

## v2.7.1

* Updated `@famiprog-foundation/scriptable-ui` @ v1.0.0.

## v2.7.0

* [Zoom](https://github.com/flower-platform/react-timeline-10000/pull/58) and [small fix for Firefox](https://github.com/flower-platform/react-timeline-10000/pull/80)

## v2.6.1

* [Error when moving the mouse and the grid inside the gantt in not yet rendered](https://github.com/flower-platform/react-timeline-10000/pull/77)

## v2.6.0

* Internal: for `demo-app`, upgraded storybook version to v7.5. It also uses vite now.
* Small issue: on props changed, the width of the table was reset to the original value.
* [Highlighted interval positioned at the beginning of the gantt was not displayed](https://github.com/flower-platform/react-timeline-10000/pull/70)
* [Controlled/uncontrolled split + rename `onTableResize` into `onSplitChange`](https://github.com/flower-platform/react-timeline-10000/pull/75)
* [Add `displayItemOnSeparateRowIfOverlap` property](https://github.com/flower-platform/react-timeline-10000/pull/72/files)

## v2.5.0

* [Separated lib and demo-app](https://github.com/flower-platform/react-timeline-10000/commit/b5936969f7ffe67a52139c04b2275849e9c5b078)
* [Upgraded to TAD v0.11.0](https://github.com/flower-platform/react-timeline-10000/commit/a87a58b74898e3a5017b8e4d5028e9e5a4c0f325), generated screenshots, .md reports, and first .md docs 

## v2.4.1

### Fixed

* [Reseting start/end date didn't work](https://github.com/flower-platform/react-timeline-10000/pull/65)

## v2.4.0

### Added

* [Horizontal scrollbar](https://github.com/flower-platform/react-timeline-10000/pull/57)
* [Added `onTableResize` property](https://github.com/flower-platform/react-timeline-10000/pull/62)

### Fixed

* [External drag and drop doesn't work](https://github.com/flower-platform/react-timeline-10000/pull/60)
* [Changing the `width` property of the table didn't updated of the UI](https://github.com/flower-platform/react-timeline-10000/pull/59)
* [Various small isues](https://github.com/flower-platform/react-timeline-10000/pull/63)
  * Problem with the scroll after reseting the `groups`
  * `SplitPanel` has `absolute` position instead of `relative`position 
  * Exception when dragging above the timeline
  * Exception when reseting the `groups` of a gantt that was scrolled
  * Gantt surface was not receiving events because of the `backgroundLayers`
  * Background layers were overlapping the vertical scrollbar

## v2.3.0

### Added

* [A `<Table>` is used for displaying rows](https://github.com/flower-platform/react-timeline-10000/pull/52), i.e. in the left part of the Gantt. `<Table>` comes from the [FixedDataTable lib](https://schrodinger.github.io/fixed-data-table-2/). This addition is **not backwards compatible**.

## v2.2.4

### Added

* `forceDragToCreateMode` example in storybook
* `forceDragToCreateMode` test case

### Changed

* [Modify selection trigger: from `click` to `mouseDown`](https://github.com/flower-platform/react-timeline-10000/pull/50)

### Fixed

* Drag to create rectangle was blue instead of green when `forceDragToCreateMode = true` 
* [Parameter `selectedItems` of `onSelectionChange` handler was `number[]` instead of `(number|string)[]`](https://github.com/flower-platform/react-timeline-10000/pull/51)

## v2.2.3

### Fixed

Right click selection didn't worked on custom segments with a complex children hierarchy

## v2.2.2

### Fixed

* [Various small issues](https://github.com/flower-platform/react-timeline-10000/pull/47)
  * drag to create popup auto-closing 
  * visual improvements of the selected and hovered segments style
  * Error in console when running an action without `run` property defined 
  * Right clicking on one segments caused drag to select on the entire row
  * A semantic-ui `Icon` can be passed to IAction.icon 
  * On Firefox a thin blue line appeared on top of segments
  * Improve storybook documentation for "drag to create" feature

## v2.2.1

### Added

* [In some places, key of type string was not supported](https://github.com/flower-platform/react-timeline-10000/pull/40). Now keys of type `number | string` are supported.

### Fixed

* [Bug related to `key of type string was not supported`](https://github.com/flower-platform/react-timeline-10000/pull/45)

## v2.2.0

### Added

* [Click and double click handler for a group](https://github.com/flower-platform/react-timeline-10000/pull/11)
* [Drag to create](https://github.com/flower-platform/react-timeline-10000/pull/25)
* [Context menu and selection](https://github.com/flower-platform/react-timeline-10000/pull/37)

### Fixed

* [Various small isues](https://github.com/flower-platform/react-timeline-10000/pull/29)
  * style was considered mandatory in HighlightedInterval
  * align BackgroundLayer with TimelineBody
  * rowLayers were not rendererd correctly after update
  * typo
  * weekends calculation depended on moment.locale
  * remove margin and border from selection box
* [Drag to create issues](https://github.com/flower-platform/react-timeline-10000/pull/32)
  * selection was going up on mouse move on different browsers
  * right click was prevented even if it was not in `drag to create` mode
* Item click was not working for complex renderers. A special css class was searched only 2 levels. Now there is a loop, so deeper nesting is possible.

## v2.1.1

### Fixed

* [In some cases, depending on the parent DomElem, scrollbars appear/disappear in an infinite loop](https://github.com/flower-platform/react-timeline-10000/issues/26)

## v2.1.0

### Added

* [Background layer: vertical grid, highlight weekends, highlighted intervals, now marker, markers](https://github.com/flower-platform/react-timeline-10000/pull/19)

## v2.0.2

### Fixed

* [Upgraded color lib and code updated](https://github.com/flower-platform/react-timeline-10000/pull/20)

## v2.0.1

The first official version published since the project was forked from `react-timeline-9000` to `@famiprog-foundation/react-gantt`.

### Added

| Short description | Issue | Pull request #19| 
| - | - | - |
| Multiple columns / table mode. | React9k/react-timeline-9000#190 | React9k/react-timeline-9000#243 |
| Support for milliseconds. | React9k/react-timeline-9000#196 | React9k/react-timeline-9000#239 | 
| Use of date/millis for compatibility w/ Redux. Moment.js support is still kept. | React9k/react-timeline-9000#221 | React9k/react-timeline-9000#241 | 
| Storybook | React9k/react-timeline-9000#234 | React9k/react-timeline-9000#237 | 
| Improved ItemRenderer and nice default styles | | [commit](https://github.com/flower-platform/react-timeline-10000/commit/e005eab4b4fbee1c737c2ebf323ad65304cdc26f)
| Generate TypeScript `.d.ts` files. Storybook uses TS | | [commit](https://github.com/flower-platform/react-timeline-10000/commit/a6bb813fe2c229c97aff306d3bf9c79ce23e6503)
| minor | | React9k/react-timeline-9000#257 |
| minor | | React9k/react-timeline-9000#260 |
| minor | React9k/react-timeline-9000#271 | React9k/react-timeline-9000#272 |

## v1.1.2
### Added
- Pass resolution props to timeline

## v1.1.1
### Fixed
- Selection UI would bleed when working on very dense timeline rows
with borders and/or margins

## v1.1.0
### Changed
- Selection UI now matches functionality

## v1.0.14
### Added
- Prop to customize shallow render logic

## v1.0.13
### Added
- Option for shallow re-render check

## v1.0.12
### Fixed
- Console error when loading page [#144]
- Row layers only worked with min 1 item in row [#145]


## v1.0.11
### Added
- Row layers
- Change log
### Fixed
- Selection box bug
- Better class names [#138]

## v1.0.10
### Fixed
- Fix a critical bug introduced in V1.0.9


## v1.0.9
### Changes
- Make it so that only selected items can be dragged & resized


## v1.0.8
### Changes
- Optimize demo build size
- Throttle mouse movement
### Fixed
- Restrict dragging to timeline


## v1.0.7
### Added
- Add a group title renderer
### Fixed
- Fix edge case bug for timebar


## v1.0.6
### Added
- Add namespacing to timeline [#112]
### Changes
- Single time lable for top bar [#118]
### Fixed
- Remove dependancy on style.css [#116]
- Current-time cursor error [#115]
- Duplicate key error [#117]
- Month calc error [#119]


## v1.0.5
### Added
- Added auto-documentation
### Changed
- Throttled mouse move - for performance
### Fixed
- Fixed issue with timebar 
- Don't require style.css [#104]
- Fix demo single select [#135]
- Demo not working [Smaller build size] [#128]


## v1.0.4
### Changed
- Swapped to inline source maps
- Allow for custom timebar time format prop
### Removed
- Removed excessive console logging
### Fixed
- Fix no-render on ie11
- Fix null indicator in top timebar


## v1.0.3
### Added
- Got NPM working
