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

```scss
.is-hidden {
	display: none;
}

.is-visible {
	display: block;
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
$module: '.card';

$card_width: 24rem;
$cardBorderColor: #ff69b4;

#{$module} {
	width: $card_width;
	margin-left: $cardWidth / 2;

	border: 1px solid $cardBorderColor;
}
```

**Good**

```scss
$module: '.card';

$card-width: 24rem;
$card-color-border: #ff69b4;

#{$module} {
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
	* Transforms
	* Display & box model
	* Colors & typography
	* Backgrounds & borders
	* Animation
	* Other
	* Transitions
* Although we recommend a newline between the different property groups, feel free to combine different groups in smaller modules.
* For complete list of the propety order see our [stylelint-config](https://github.com/vicompany/stylelint-config-vi/blob/master/index.js).

**Bad**

```scss
$module: '.motor';

#{$module} {
	float: left;
	box-sizing: content-box;
	right: 0;
	opacity: 0.9;
	position: relative;
	display: block;
	background: $gray;
	color: $branding-1;
	text-align: right;
	border: dashed;
	animation: infinite;
	transform: translate(2rem);
	transition: height 2s;
	cursor: pointer;
}
```

**Good**

```scss
$module: '.motor';

#{$module} {
	position: relative;
	right: 0;

	transform: translate(2rem);
	float: left;

	box-sizing: content-box;
	display: block;

	color: $branding-1;
	text-align: right;

	background: $gray;
	border: dashed;

	animation: infinite;

	cursor: pointer;
	opacity: 0.9;

	transition: height 2s;
}
```

```scss
$module: '.motor';

#{$module} {
	position: relative;
	right: 0;

	float: left;
	display: block;

	color: $branding-1;
	text-align: right;

	animation: infinite;
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
${$module} {
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
#{$module} {
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
		color: $branding-2;

		#{$module}__element {
		}
	}

	&[data-module='widget'] {
		border: 4px solid $red;
	}

	&:not(:last-of-type) {
		border-bottom: 1px solid $gray;
	}

	&.is-active {
		background: $branding-3;
	}
```

**Good**

```scss
#{$module} {
	@extend %container;
	@include clearfix;

	padding: 1rem;

	&:hover {
		color: $branding-2;

		#{$module}__element {
		}
	}

	&:not(:last-of-type) {
		border-bottom: 1px solid $gray;
	}

	&:before {
		content: 'foo';
	}

	&[data-module='widget'] {
		border: 4px solid $red;
	}

	&.is-active {
		background: $branding-3;
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
	'extra-large': 	80rem,
	'huge':			90rem
);
```

```scss
$module '.foo';

#{$module} {
	padding: 1rem;

	border: 1px dashed $white;

	@include respond-to(medium) {
		padding: 2rem;

		#{$module}__item {
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

#{$module}__item {
	background: $black;

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
$module '.foo';

#{$module} {
	padding: 1rem;

	border: 1px dashed $white;

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

#{$module}__item {
	background: $black;

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

		color: $white;
	}

	.other-block {
		background: $black;
	}
}
```

**Good**

```scss
$module: '.block';

#{$module} {
	padding: 1rem;
}

#{$module}__text {
	padding: 0;

	color: $white;
}

#{$module}__other-block {
	background: $black;
}
```

## Block

* Module- and filenames won't be abbreviated and are written in lowercase with dashes.
* Module- and filenames are written in singular form: `_button.scss`
* We define the module (class) name on the top of the block in a `$module` variable.

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
$module: '.button-group';

#{$module} {
	position: absolute;
}
```

```scss
$module: '.form';

#{$module} {
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
$module: '.navigation';

#{$module} {
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
$module: '.navigation';

#{$module} {
	position: fixed;
}

#{$module}__item {
	display: inline-block;
}

#{$module}__link {
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
$module: '.toggle';

#{$module}__button {
	padding: 1rem;

	cursor: pointer;

	&:hover {
		+ #{$module}__body {
			display: block;
		}
	}
}

#{$module}__body {
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
$module: '.toggle';

#{$module}__button {
	padding: 1rem;

	cursor: pointer;
}

#{$module}__body {
	display: none;

	#{$module}__button:hover + & {
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
$module: '.button';

#{$module} {
	padding: 1rem;
}

#{$module}--large {
	padding: 2rem;
}
```

**Good**

```scss
$module: '.button';

#{$module} {
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
$module: '.notification';

#{$module} {
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
$module: '.notification';

#{$module} {
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
$module: '.button';

#{$module} {
	padding: 1rem;

	color: $white;

	background: $black;

	&--inverted {
		@extend #{$module};

		color: $black;

		background: transparent;

		&--large {
			@extend #{$module}--inverted;

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
$module: '.button';

#{$module} {
	padding: 1rem;

	color: $white;

	background: $black;

	&--inverted {
		color: $black;

		background: transparent;
	}

	&--large {
		padding: 2rem;
	}
}
```

**Bad**

```scss
$module: '.card';

#{$module} {
	border: 1px solid $black;

	&--hero {
		background: center / cover;

		#{$module}__body {
			padding-top: 10rem;
		}
	}
}

#{$module}__body {
	padding: 1rem;
}
```

**Good**

```scss
$module: '.card';

#{$module} {
	border: 1px solid $black;

	&--hero {
		background: center / cover;
	}
}

#{$module}__body {
	padding: 1rem;

	#{$module}--hero & {
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
$module: '.media';

#{$module} {
	padding: 1rem;

	background: $gray;

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
$module: '.media';

#{$module} {
	padding: 1rem;

	background: $gray;
}

#{$module}__image {
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
$module: '.header';

#{$module} {
	background: $white;
}

#{$module}__logo {
	&:hover {
		transform: scale(2);
	}
}
```

```scss
$module: '.logo';

#{$module} {
	max-width: 10rem;
	padding: 1rem;
}
```