# Front-end at VI Company - Work in Progress

## General

* We highly regard accessibility and Web Standards.
* We use progressive enhancement as much as possible.
* We support the latest evergreen browsers (but often also older browsers, because of the previous points).

## JavaScript (ES6+)

* We write vanilla JavaScript (ES6+). Not that we don't like React, Angular or the latest Framework X, but often we don't need it.
* Our ES6+ code gets transpiled with [Browserify](http://browserify.org) and [Babel](https://babeljs.io) to ES5.
* We write modular JS and use polyfills (or better [ponyfills](https://github.com/sindresorhus/ponyfill)) and common modules from NPM.
* We publish our own tools and shareable code on [Github](https://github.com/vicompany) and [NPM](https://www.npmjs.com/search?q=vi-company).
* We use [ESLint](http://eslint.org) and our own [config](https://www.npmjs.com/package/eslint-config-vi) to lint our JavaScript code.

## CSS (Sass)

* We write modular Sass using the `SCSS` [syntax](http://www.sass-lang.com/documentation/file.SASS_REFERENCE.html#syntax).
* We use [BEM](https://en.bem.info) for class names.
* Combined with a sprinkle of [SMACSS](https://smacss.com) for states.
* And we follow [Atomic design](http://atomicdesign.bradfrost.com) as design methodology.
* We use [Stylelint](http://stylelint.io) and our own [config](https://www.npmjs.com/package/stylelint-config-vi) to lint our Sass code.

## Tooling

* We use [Grunt](http://gruntjs.com/) for compiling JS, CSS and other tasks.

## Editor plugins

Whether you use VS Code, Sublime Text or any other editor. You should use at least the following plugins.

* [EditorConfig](http://editorconfig.org)
* [ESLint](http://eslint.org)
* [Stylelint](http://stylelint.io)
