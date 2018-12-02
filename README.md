Civility :tophat:
========
[![npm (scoped)](https://img.shields.io/npm/v/@civility/utilities.svg?style=shield)](https://www.npmjs.com/org/civility)
[![dependencies Status](https://david-dm.org/ivebencrazy/civility/status.svg?style=shield)](https://david-dm.org/ivebencrazy/civility)
[![devDependencies Status](https://david-dm.org/ivebencrazy/civility/dev-status.svg?style=shield)](https://david-dm.org/ivebencrazy/civility?type=dev)
[![CircleCI](https://circleci.com/gh/ivebencrazy/civility/tree/master.svg?style=shield)](https://circleci.com/gh/ivebencrazy/civility/tree/master)


Civility is a library, built to be used between all of my personal projects. I am currently using it for [benpevsner.com](https://github.com/ivebencrazy/benpevsner.com) and for the UI of [Favioli](https://github.com/ivebencrazy/favioli).

I am currently putting together all the pieces to make it work; it has usable components and utilities in each package of the monorepo. 1.0.0 will signal that the structure and the defaults I want built in are ready. Anything before that, and you should expect unexpected drastic changes.


Goals
=====
  - Built piece-by-piece; Always have the project in a usable state. Even if the full structure of Civility is not complete, the individual utilities and components should be available to use. Essentially, I just don't want another repo where I add a lot of code, and don't end up using it.
  - Overridable UI using functional css React components
  - Pre-built [Redux](https://redux.js.org/) store with a core of extendable actions, reducers, middleware
  - Swappable services with documented specs (not sure how to handle exactly, yet). Would prefer something where I can generate an api from docs, like [Swagger](https://swagger.io/). Services will probably be one of the earlier pieces built, but some of the last pieces to be solidified.
