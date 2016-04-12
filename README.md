<p align='center'>
  <img width='300' src='https://cloud.githubusercontent.com/assets/691940/14400225/44d78056-fdf5-11e5-9c83-f12ece2fae3a.jpg'>
</p>

# webseed
A starter kit for [avenger](http://github.com/buildo/avenger)-based react web applications.

## Setup
- Run `npm install`
- create a `config.json` in the project root (refer to the example files)

## Development
```sh
npm start
```

It will start a webpack-dev-server, running at hostname/port specified in the `config.json`.

# What you get
A basic avenger application, with some common functionalities already in place.

## Table of Contents
1. [Queries](#queries)
2. [Commands](#commands)
3. [Authentication](#authentication)
4. [i18n](#i18n)
5. [Components taxonomy](#components-taxonomy)
6. [Basic components](#basic-components)
7. [Domain model](#domain-model)

## Queries
[`avenger`](https://github.com/buildo/avenger) allows declaring data dependencies via `Query`.
Using `react-avenger` a component can declare a dependency from a query.

An example of usage is shown in [`app/containers/HelloContainer.js`](https://github.com/buildo/webseed/blob/master/src/app/containers/HelloContainer.js), that uses the `user` query.

Queries definitions are in [`app/queries.js`](https://github.com/buildo/webseed/blob/master/src/app/queries.js). This webseed comes with an example query, which is the aforementioned `user` query.

## Commands
[`avenger`](https://github.com/buildo/avenger) also provides `Command`. A `Command` execute an action and potentially invalidates a set of queries. As with queries, `react-avenger` provides a way of declaring the commands needed by a component.

An example of usage is shown in [`app/containers/LoginContainer.js`](https://github.com/buildo/webseed/blob/master/src/app/containers/LoginContainer.js), that uses the `doLogin` command.

Commands definitions are in [`app/commands.js`](https://github.com/buildo/webseed/blob/master/src/app/commands.js). This webseed comes with two example commands: `doLogin` and `doLogout`.

## Authentication
Authentication is provided by `AuthContainer` and `LoginContainer`

`LoginContainer` displays a login interface, with username and password fields. When the form is submit, it invokes the `doLogin` command. The HTTP request is stubbed and it returns a fake token, which is stored in a cookie.

`LoginContainer` automatically automatically redirects to `/` whenever immediately after a successful login and/or when navigating to it with a token already present.

`AuthenticatedContainer` is the dual of `LoginContainer`. When navigating to it without a token, it automatically redirects to `/login`. Also, it listens to changes of the app state and if the token is invalidated (i.e. removed), it performs the same redirection.

## i18n
Several i18n facilities are provided (built on top of `react-intl`).

[`app/Hello/Hello.js`](https://github.com/buildo/webseed/blob/master/src/app/components/Hello/Hello.js) shows an example of using the `intlMethods` decorator to access the i18n facilities.

The greeting displayed to the user is translated using `this.formatMessage` (injected by the decorator).

```js
const greeting = this.formatMessage('Hello.hello');
```

This looks for the `Hello.hello` translation key for the current locale, whose definition file is placed in `app/locales/{localeName}.json`. For instance, [`en.json`](https://github.com/buildo/webseed/blob/master/src/app/locales/en.json) contains:

```json
{
  "locales": ["en"],
  "messages": {
    "Hello": {
      "hello": "hello"
    }
  }
}
```

so `greeting` will evaluate to `"Hello"`.

In order to keep the bundle size as small as possible, locale files are dynamically requested according to the user's preferred language (this uses the webpack bundle splitting feature).

Same goes for the [`Intl.js` polyfill](https://github.com/andyearnshaw/Intl.js/) required by some browsers (e.g. Safari): it is provided as a separate bundle and requested only if needed.

## Components taxonomy
Components can conceptually be of three kinds:

 - *handlers*: components referenced directly by react-router's routes. They don't manage data.
 - *containers*: components managing data. They don't do any layout.
 - *plain components*: pure components receving data and returing some JSX
 
A more extended description is available at: https://github.com/buildo/webseed/blob/master/components-taxonomy.md

## Basic components
Basic components are a special kind of plain components.
They are building blocks for all the application's components. They are highly reusable components, and they are often customization over third parties components.

This webseed comes with a dependency on [`buildo/react-components`](https://github.com/buildo/react-components) and some of them are cherry-picked in [`app/components/Basic/index.js`](https://github.com/buildo/webseed/blob/master/src/app/components/Basic/index.js).

An example of customization over a third-party component is [`app/components/Basic/LoadingSpinner/LoadingSpinner.js`](https://github.com/buildo/webseed/blob/master/src/app/components/Basic/LoadingSpinner/LoadingSpinner.js).

## Domain model
> A domain model is a system of abstractions that describes selected aspects of a sphere of knowledge, influence, or activity (a domain).

-- *https://en.wikipedia.org/wiki/Domain_model*

A domain model represents the abstractions we want to work with. In a revenge app, they're modeled using  [`tcomb`](https://github.com/gcanti/tcomb/).
`tcomb` allows for both definition and runtime validation of the domain objects. Whenever an object does not conform to its definition, `tcomb` will raise a warning (only in development).

This is especially useful when interacting with a REST API that may change over time. Any change or error in the API spec will be caught early on by the `tcomb` validation, allowing for a fast debugging experience.

Each domain object is defined in [`/app/domain`](https://github.com/buildo/revenge-webseed/tree/master/src/app/domain). This webseed ships with an example definition for the `User` domain object ([`app/domain/User.js`](https://github.com/buildo/revenge-webseed/tree/master/src/app/domain/User.js)).
