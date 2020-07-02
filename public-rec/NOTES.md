# NOTES

## Contentful Plugin

- links to github repo and grabs theme config to pull in values
- looks into directory for templates that can be used in a page container
- looks into directory for components that can be used in a page container

## 🎒 Backpack

- upgrade plugin to be first class plugin with live updating
  - https://www.gatsbyjs.com/docs/integration-guide/source-plugin,

## Layout

- Major layouts e.g. navigation + main + footer
- Minor layouts e.g. holy grail, single column page, grid with side navigation
  - uses css grid underneath

## Release Notes

- Slack notifications
  - dev channel
  - client/release channel
- git commit messages -> asana comments?
- Automate as much as possible
- Release notes
- Dependencies between features?
  - ad-hoc staging pull request
  - e.g. navigation --> desktop navigation & mobile navigation

## Cart

- gatsby-theme-ripperoni-cart
- Always open cart on action
- Show cart loading state initially
- Depending on the result of the action show error state or success state


## Loadable

- ⚠️ Doesn't work with named exports

## Themes

- Core Themes
  - ripperoni-core
  - ripperoni-components
  - ripperoni-store
  - ripperoni-netlify
- Layout Themes
  - ripperoni-account
  - ripperoni-search
  - ripperoni-header?
- Functional Themes
  - ripperoni-301-redirects
  - ripperoni-debug
  - ripperoni-marketing
- Data Themes
  - ripperoni-backpack
  - ripperoni-cms
- Presentation Themes
  - ?

## Account Serverless Function

- _token
  - get => token
- password
  - recover => ok true/false
  - reset => customer
- customer
  - get => customer
  - create => customer
  - loginOrCreate => customer
- address
  - create => customer
  - delete => customer
  - update => customer
  - default => customer

## package.json

- remove dead/unused packages
- straighten out peer/dev/dependencies
  - theme-ui
  - gatsby-plugin-theme-ui
