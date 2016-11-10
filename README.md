# Front-end at VI Company - Work in Progress

_All code in any code-base should look like a single person typed it, no matter how many people contributed._

## General

* We highly regard Accessibility and Web Standards.
* We use Progressive Enhancement as much as possible.
* We support the latest [Evergreen Browsers](#evergreen-browsers) (but often also older browsers, because of the previous points).

## JavaScript (ES6+)

* We write vanilla JavaScript ([ES6+](http://www.ecma-international.org/ecma-262/7.0/)). Not that we don't like React, Angular or the latest Framework X, but often we don't need it.
* Our ES6+ code gets transpiled with [Browserify](http://browserify.org) and [Babel](https://babeljs.io) to ES5.
* We write modular JS and use polyfills (or better [ponyfills](https://github.com/sindresorhus/ponyfill)) and modules from NPM.
* We publish our own tools and shareable code on [Github](https://github.com/vicompany) and [NPM](https://www.npmjs.com/search?q=vi-company).
* We use [ESLint](http://eslint.org) and our own [config](https://www.npmjs.com/package/eslint-config-vi) to lint our JavaScript code.

## CSS (Sass)

* We write modular Sass using the `SCSS` [syntax](http://www.sass-lang.com/documentation/file.SASS_REFERENCE.html#syntax).
* We use [BEM](https://en.bem.info) for class names.
* Combined with a sprinkle of [SMACSS](https://smacss.com) for states.
* And we follow [Atomic design](http://atomicdesign.bradfrost.com) as design methodology.
* We use [Stylelint](http://stylelint.io) and our own [config](https://www.npmjs.com/package/stylelint-config-vi) to lint our Sass code.

## Tooling

* We use [Grunt](http://gruntjs.com/) for compiling JS, CSS, optimization and other tasks.

## Editor plugins

Whether you use [Visual Studio Code](https://code.visualstudio.com), [Sublime Text](https://www.sublimetext.com) or any other editor. At least you should use the following plugins.

* [EditorConfig](http://editorconfig.org)
* [ESLint](http://eslint.org)
* [Stylelint](http://stylelint.io)

## Additional information

### Evergreen Browsers

The term _evergreen browser_ refers to a browser that gets updated automatically to future versions. 
Therefor browser versions become less of a focus and, more importantly, new web technology becomes available to users and us developers quicker.

* [The Evergreen Web by Scott Hanselman](http://www.hanselman.com/blog/TheEvergreenWeb.aspx)
* [Evergreen Browsers by Rob Eisenberg](http://eisenbergeffect.bluespire.com/evergreen-browsers/)
