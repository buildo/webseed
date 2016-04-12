# Components taxonomy

From a props/data perspective, there are three main kinds of components:

## Handlers

React router entry points, they exist solely to be referenced in `app/routes.js`
and describe the (nested) routes layout.

They should not manage data (so no `@connect`, no `@queries`, ...) nor layout/UI "in the small" (so no `@skinnable`).

They can however, and typically have to, lay-out different children components (a child `Handler` or other components), and they do so making use of layout component helpers, such as `FlexView` or more custom ones.
We should strive to keep the `Handler`s template as simple as possible, and reuse simple and complex layout components in multiple `Handler`s when possible.

They are non pure: because they can render react-router `RouteHandler`s
(actually only `Handlers` containing a `<RouteHandler>` can't be pure - leaf `Handler`s could in theory,
but since we try to keep all data handling in separated `Container`s, described below,
possible performance issues requiring "pure" optimizations should be confined there)

For the same reason, `Handler`s rendering both `Container`s and children `Handler`s should try to do so in separate sub-trees:
one to be kept unpure (the `<RouteHandler>` one), the other optimized by default

## Containers

Components managing data, shouldn't do layout at all.

They are typically decorated with `@connect` and/or `@queries`, `@commands`, `@loading`

They should always be decorated with `@skinnable(contains(ContainedComponent))`

For the reasons above, they can theoretically be defined as mapping functions from connected (possibly async) state to `props` passed to the contained components.
While this is not implemented yet, it can still be enforced avoiding in `Container`s everything that's not props manipulation.

## Plain Components

Just pure components. Typically `@skinnable()` and always (except for very rare stateful exceptions) `@pure`

They should not be decorated with `@connect`, `@queries`, `@commands`

# Directory layout

`Handler`s should stay inside `src/app/routes/...`

A `Container` and the contained component should stay in the same folder, named as the `Component` itself,
and the folder should have an `index.js` file exporting the `Container` e.g.:
```
Basic
|_ WorklistDropdown
  |_ index.js
  |_ WorklistDropdown.js
  |_ WorklistDropdownContainer.js
  |_ [worklistDropdownContainer.scss]
```
Same story if the component doesn't have any container:
```
Basic
|_ Card
  |_ index.js
  |_ Card.js
  |_ [card.scss]
```
In this way, we can always import from `Basic/Component` wheter it is a container or not
