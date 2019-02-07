Packages
=============
**Our Philosophy:** Any of these packages should be able to be replaced as long as replacing segments conform to a standard API of interaction.


React
----
### `@civility/react`
Contains React components meant to be used with [next.js](https://github.com/zeit/next.js/), and the Civility Store.


Stylesheets
----
### `@civility/stylesheets`
A superset of [Basscss](http://basscss.com/) meant to be coupled with Civility Components.
**It's not reccommended to swap out this piece of Civility** This is the only part of the Civility package-set that wouldn't make sense to replace, because the style classes will be low-level and heavily depended on.


Utilities
----
### `@civility/utilities`
Civility Utilities is a bunch of utilities used within Civility and exported because they might be useful. This is the only explicit internal dependency of Civility. We depend on this for various utilities and methods that deal with a common API. Things like date formatting.
