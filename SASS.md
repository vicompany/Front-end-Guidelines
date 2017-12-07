# SASS guidelines

*Our styleguide for writing maintainable and scalable CSS and Sass.*

## Table of contents
- [CSS](#css)
  * [Formatting](#formatting)
  * [ID selectors](#id-selectors)
  * [JavaScript hooks](#javascript-hooks)
  * [States](#states)
  * [Property declarations](#property-declarations)
- [SASS](#sass)
  * [Variable names](#variable-names)
  * [Extend directives](#extend-directives)
  * [Property order](#property-order)
  * [Nested selectors](#nested-selectors)
  * [Breakpoints](#breakpoints)
- [BEM](#bem)
  * [Block](#block)
  * [Element](#element)
  * [Modifier](#modifier)
  * [Module nesting](#module-nesting)
  * [Module mix](#module-mix)

# CSS

## Formatting

We use [style-lint](https://github.com/vicompany/stylelint-config-vi) to enforce consistent conventions and avoid errors in our stylesheets.

* Write rule reclarations (selector and properties) in lowercase.
* Use dashes, not camelCase in class names.
	* Double underscores `__` and double dashes `--` are allowed when using [BEM](#bem).
* Do not use ID selectors.

**Bad**

```scss
.siteContainer {
	max-width: 80rem;
}

#item {
	border: dashed;
}
```

**Good**

```scss
.site-container {
	max-width: 80rem;
}

.item {
	border: dashed;
}
```

## ID selectors

While it is possible to select elements by ID in CSS, it should generally be considered an anti-pattern.
* ID selectors introduce an unnecessarily high level of specificity to your rule declarations.
* ID selectors are not reusable.

## JavaScript hooks

Avoid binding to the same class in both your CSS and JavaScript as it can easily lead to breaking code when refactoring CSS.

We recommend creating JavaScript-specific classes with a `.js-` hook as prefix to bind to. Never use these class names for CSS styling!

```html
<button class="button js-button-toggle">Toggle</button>
```

## States

We use the [SMACCS](https://smacss.com/book/type-state) naming convention for (global) states like `.is-active` and `.is-collapsed`. For a good set of state hooks, click [here](https://github.com/chris-pearce/css-guidelines#state-hooks).
* State styles indicate a JavaScript dependency.
* It is easy to use JavaScript to apply (generic) state hooks to a component.
* The property value of a state may be overwritten within a module.
* You are allowed to use the `!important` rule on a style declaration. (Note: Using the `!important` rule is disabled by default by our Stylelint configuration. Check the [Stylelint configuration documentation](https://github.com/stylelint/stylelint/blob/master/docs/user-guide/configuration.md) for more information on how to disable this rule for states.)

```scss
.is-hidden {
	display: none !important;
}

.is-visible {
	display: block !important;
}
```

```scss
.toggle {
	display: none;

	&.is-visible {
		display: inline-block;
	}
}
```

## Property declarations

* We use the property shorthand to define property values.
* When overwriting properties we use the more specific selector.

**Bad**

```scss
.foo {
	padding-left: 1rem;

	background-repeat: no-repeat;

	&:last-child {
		background: repeat;
	}
}
```

**Good**

```scss
.foo {
	padding: 0 0 0 1rem;

	background: no-repeat;

	&:last-child {
		background-repeat: repeat;
	}
}
```

# SASS

## Variable names

* We use American English for naming variables. For example `color` instead of `colour`.
* We recommend variable names to be prefixed by type: `$color-**` or `$font-**`
* Names will be written in lowercase.
* We use dashes to separate words in variable identifiers: `$font-size-xl`
* Variables only used within one module will be prefixed by the name of the module.

**Bad**

```scss
$text: #1e283c;
$brand-1: #e00;

$border-s: 2px;

$weight-regular: 400;
```

**Good**

```scss
$color-text: #1e283c;
$color-brand-1: #e00;

$border-width-s: 2px;

$font-weight-regular: 400;
```

**Bad**

```scss
$card_width: 24rem;
$cardBorderColor: #ff69b4;

.card {
	width: $card_width;
	margin-left: $cardWidth / 2;

	border: 1px solid $cardBorderColor;
}
```

**Good**

```scss
$card-width: 24rem;
$card-color-border: #ff69b4;

.card {
	width: $card-width;
	margin-left: $card-width / 2;

	border: 1px solid $card-color-border;
}
```

## Extend directives

`@extend` should be avoided because it has unintuitive, unexpected and potentially dangerous behavior, especially when used with nested selectors. Even extending top-level placeholder selectors can cause problems if the order of selectors ends up changing later.

* Using the `@extend` directive is allowed for extending placeholder selectors.

**Bad**

```scss
.foo {
	position: absolute;
	right: 0;

	border-radius 100%;
}

.bar {
	display: inline-block;

	&:before {
		@extend .foo;

		right: 100%;
	}
}
```

**Good**

```scss
%placeholder {
	position: absolute;
	right: 0;

	border-radius 100%;
}

.foo {
	@extend %placeholder;
}

.bar {
	display: inline-block;

	&:before {
		@extend %placeholder;

		right: 100%;
	}
}
```

## Property order

* We sort our properties grouped by type:
	* Positioning
	* Display & flex
	* Transforms & floats
	* Box model
	* Colors & typography
	* Backgrounds & borders
	* Animation
	* Transitions
	* Other/unspecified properties can be placed anywhere inbetween
* Although we recommend a newline between the different property groups, feel free to combine different groups in smaller modules.
* For complete list of the propety order see our [stylelint-config](https://github.com/vicompany/stylelint-config-vi/blob/master/index.js).

**Bad**

```scss
.block {
	display: flex;
	margin: 1rem;
	position: relative;
	right: 0;
	z-index: 2;
	flex-direction: column;
	align-items: flex-end;
	transform: translate(2rem);
	animation: infinite;
	text-align: right;
	color: $color-branding-1;
	border: dashed;
	background: $color-gray;
	cursor: pointer;
	transition: height 2s;
	opacity: 0.9;
}
```

**Good**

```scss
.block {
	position: relative;
	right: 0;
	z-index: 2;

	display: flex;
	flex-direction: column;
	align-items: flex-end;

	transform: translate(2rem);

	margin: 1rem;

	color: $color-branding-1;
	text-align: right;
	writing-mode: vertical-rl;

	background: $color-gray;
	border: dashed;

	animation: infinite;

	cursor: pointer;
	opacity: 0.9;

	transition: height 2s;
}
```

## Nested selectors

* We don't nest selectors more than three levels deep. When selectors are nested to deep it is most likely:
	1. Fragile
	2. Overly specific
	3. Not reusable
* Nested selectors will be defined after the standard property declarations, with the exception of `@extend` and `@include` directives in the following order:
	1. Extends
	2. Includes
	3. Standard property declarations
	4. Pseudo classes
	5. Pseudo elements
	6. Attribute selectors
	7. States
	8. Breakpoints

**Bad**

```scss
.block {
	&__selector {
		&:first-of-type {
			p {
				&:before {
					content: '';
				}
			}
		}
	}
}
```

```scss
.block {
	&:before {
		content: 'foo';
	}

	padding: 1rem;

	@include clearfix;

	@extend %container;

	@include respond-to(medium) {
		padding: 2rem;
	}

	&:hover {
		color: $color-branding-2;
	}

	&[data-module='widget'] {
		border: 4px solid $color-red;
	}

	&:not(:last-of-type) {
		border-bottom: 1px solid $color-gray;
	}

	&.is-active {
		background: $color-branding-3;
	}
```

**Good**

```scss
.block {
	@extend %container;
	@include clearfix;

	padding: 1rem;

	&:hover {
		color: $color-branding-2;
	}

	&:not(:last-of-type) {
		border-bottom: 1px solid $color-gray;
	}

	&:before {
		content: 'foo';
	}

	&[data-module='widget'] {
		border: 4px solid $color-red;
	}

	&.is-active {
		background: $color-branding-3;
	}

	@include respond-to(medium) {
		padding: 2rem;
	}
}
```

## Breakpoints

* We use a custom `respond-to` mixin to define our breakpoints.
* We recommend to limit the number of breakpoints to three: `small`, `medium` and `large`.
* It is recommended to use every breakpoint query once within a block, element and modifier.

**Bad**

```scss
$breakpoints: (
	'tiny':			20rem,
	'small':		35rem,
	'medium':		50rem,
	'large':		65rem,
	'extra-large': 		80rem,
	'huge':			90rem
);
```

```scss
.foo {
	padding: 1rem;

	border: 1px dashed $color-white;

	@include respond-to(medium) {
		padding: 2rem;

		.foo__item {
			font-size: $font-size-m;
		}
	}

	&:after {
		margin: 1rem;

		content: '';

		@include respond-to(medium) {
			padding: 2rem;
		}
	}
}

.foo__item {
	background: $color-black;

	font-size: $font-size-s;
}
```

**Good**

```scss
$breakpoints: (
	'small':	35rem,
	'medium':	60rem,
	'large':	80rem
);
```

```scss
.foo {
	padding: 1rem;

	border: 1px dashed $color-white;

	&:after {
		margin: 1rem;

		content: '';
	}

	@include respond-to(medium) {
		padding: 2rem;

		&:after {
			margin: 2rem;
		}
	}
}

.foo__item {
	background: $color-black;

	font-size: $font-size-s;

	@include respond-to(medium) {
		font-size: $font-size-m;
	}
}
```

# BEM

We use the [BEM](https://en.bem.info) approach for writing our CSS classes.
* BEM divides modules into independent blocks.
* It gives your CSS classes more transparency and meaning to other developers.
* BEM modules are far more strict and informative which makes it ideal for developers on larger projects.

```scss
.block {}
.block__element {}
.block--modifier {}
```

BEM ensures that everyone who participates in the development of a project works with a single codebase and speaks the same language. Using proper naming will prepare you for the changes in the code in the future.
* No tag name or ID selectors.
* No dependencies on other blocks or elements. More about module nesting can be read [here](#module-nesting).

Advanced BEM example demonstrating different techniques can be found visiting [this codepen](http://codepen.io/edw1n/pen/rWyRxY).

**Bad**

```scss
.block {
	padding: 1rem;

	p {
		padding: 0;

		color: $color-white;
	}

	.item {
		background: $color-black;
	}
}
```

**Good**

```scss
.block {
	padding: 1rem;
}

.block__text {
	padding: 0;

	color: $color-white;
}

.block__item {
	background: $color-black;
}
```

## Block

* Module- and filenames won't be abbreviated and are written in lowercase with dashes.
* Module- and filenames are written in singular form: `_button.scss`

**Bad**

```scss
.btnGroup {
	position: absolute;
}
```

```scss
.forms {
	padding: 1rem;
}
```

**Good**

```scss
.button-group {
	position: absolute;
}
```

```scss
.form {
	padding: 1rem;
}
```

## Element

* An element is separated from a block name by a double underscore: `__`
* We don't use the parent selector `&` to define elements.
* We don't use a grandchild selector `.module__element__nested` to reference and element that is two (or more) levels deep. Read more about this [here](http://getbem.com/faq/#css-nested-elements) and [here](https://en.bem.info/methodology/quick-start/#element).
* We discourage using any kind of sibling selectors within an element.

**Bad**

```html
<nav>
	<ul class="navigation">
		<li class="navigation__item">
			<a href="#" class="navigation__item__link">Home</a>
		</li>
		<li class="navigation__item">
			<a href="#" class="navigation__item__link">Contact</a>
		</li>
	</ul>
</nav>
```

```scss
.navigation {
	position: fixed;

	&__item {
		display: inline-block;

		&__link {
			text-decoration: none;
		}
	}
}
```

**Good**

```html
<nav>
	<ul class="navigation">
		<li class="navigation__item">
			<a href="#" class="navigation__link">Home</a>
		</li>
		<li class="navigation__item">
			<a href="#" class="navigation__link">Contact</a>
		</li>
	</ul>
</nav>
```

```scss
.navigation {
	position: fixed;
}

.navigation__item {
	display: inline-block;
}

.navigation__link {
	text-decoration: none;
}
```

**Bad**

```html
<div class="toggle">
	<button type="button" class="toggle__button">Hover me</button>
	<div class="toggle__body">
		<p>The President is the chairman of the club chapter.</p>
	</div>
</div>
```

```scss
.toggle__button {
	padding: 1rem;

	cursor: pointer;

	&:hover {
		+ .toggle__body {
			display: block;
		}
	}
}

.toggle__body {
	display: none;
}
```

**Good**

```html
<div class="toggle">
	<button type="button" class="toggle__button">Hover me</button>
	<div class="toggle__body">
		<p>The President is the chairman of the club chapter.</p>
	</div>
</div>
```

```scss
.toggle__button {
	padding: 1rem;

	cursor: pointer;
}

.toggle__body {
	display: none;

	.toggle__button:hover + & {
		display: block;
	}
}
```

## Modifier

* An element modifier is separated from a block (or element) name by a double dash: `--`
* Modifiers will be defined within the module using the parent selector: `&`
* We don't use modifiers to define states.
* We don't extend the base module, instead we use multiple classes: `<a class="btn btn–-large">I'm large</a>`
* We don't use single classnames containing multiple modifiers: `btn--inverted--large`
* If a block modifier changes an element's style, that style should be defined in the respective element block.

**Bad**

```scss
.button {
	padding: 1rem;
}

.button--large {
	padding: 2rem;
}
```

**Good**

```scss
.button {
	padding: 1rem;

	&--large {
		padding: 2rem;
	}
}
```

**Bad**

```html
<div class="notification notification--visible">There is an error!</div>
```

```scss
.notification {
	display: none;

	&--visible {
		display: block;
	}
}
```

**Good**

```html
<div class="notification is-visible">There is an error!</div>
```

```scss
.notification {
	display: none;

	&.is-visible {
		display: block;
	}
}
```

**Bad**

```html
<a href="#" class="button--inverted--large">Go</a>
```

```scss
.button {
	padding: 1rem;

	color: $color-white;

	background: $color-black;

	&--inverted {
		@extend .button;

		color: $color-black;

		background: transparent;

		&--large {
			@extend .button--inverted;

			padding: 2rem;
		}
	}
}
```

**Good**

```html
<a href="#" class="button button--inverted button--large">Go</a>
```

```scss
.button {
	padding: 1rem;

	color: $color-white;

	background: $color-black;

	&--inverted {
		color: $color-black;

		background: transparent;
	}

	&--large {
		padding: 2rem;
	}
}
```

**Bad**

```scss
.card {
	border: 1px solid $color-black;

	&--hero {
		background: center / cover;

		.card__body {
			padding-top: 10rem;
		}
	}
}

.card__body {
	padding: 1rem;
}
```

**Good**

```scss
.card {
	border: 1px solid $color-black;

	&--hero {
		background: center / cover;
	}
}

.card__body {
	padding: 1rem;

	.card--hero & {
		padding-top: 10rem;
	}
}
```

## Module nesting

To avoid positiong or styling of blocks or elements within another block, module nesting can be used to position a module within another module (for example an atom within an organism).
* We recommend only to use nesting for position a module within another one.

**Bad**

```html
<div class="media">
	<img class="image" src="/img/club/sven.png" alt="Road Captain">
	<p>The Road Captain is responsible for planning and organizing all club runs.</p>
</div>
```

```scss
.media {
	padding: 1rem;

	background: $color-gray;

	.image {
		margin: 1rem;
	}
}
```

**Good**

```html
<div class="media">
	<div class="media__image">
		<img class="image" src="/img/club/sven.png" alt="Road Captain">
	</div>
	<div class="media__body">
		<p>The Road Captain is responsible for planning and organizing all club runs.</p>
	</div>
</div>
```

```scss
.media {
	padding: 1rem;

	background: $color-gray;
}

.media__image {
	margin: 1rem;
}
```

## Module mix

Mixing of modules is a technique for using different BEM entities on a single DOM node. Read more about mixing modules [here](https://en.bem.info/methodology/quick-start/#mix).
* Combine the behavior and styles of multiple blocks without duplicating code.
* Create new blocks based on existing ones.

```html
<header class="header">
	<img class="logo header__logo" src="/img/logo.svg" alt="Logo">
</header>
```

```scss
.header {
	background: $color-white;
}

.header__logo {
	&:hover {
		transform: scale(2);
	}
}
```

```scss
.logo {
	max-width: 10rem;
	padding: 1rem;
}
```