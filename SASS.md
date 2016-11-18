# SASS guidelines - Work in Progress

## Table of contents
* CSS/SASS
	* Formatting
	* ID selectors
	* Javacript hooks
	* States
	* Extend directives
	* Variable names
* BEM
	*
	*
	*
	*

# CSS/SASS

## Formatting

We use [style-lint](https://github.com/vicompany/stylelint-config-vi) to enforce consistent conventions and avoid errors in our stylesheets.

* Write rule reclarations in lowercase.
* Use dashes, not camelCase in class names.
	* Double underscores `__` and double dashes `--` are allowed when using BEM.
* Do not use ID selectors.

**Bad**

```scss
.sgtAtArms {
	display: flex;
}

#prospect {
	border: dashed;
}
```

**Good**

```scss
.sgt-at-arms {
	display: flex;
}

.prospect {
	border: dashed;
}
```

## ID selectors

While it is possible to select elements by ID in CSS, it should generally be considered an anti-pattern.
* ID selectors introduce an unnecessarily high level of specificity to your rule declarations.
* ID selectors are not reusable.

## JavaScript hooks

Avoid binding to the same class in both your CSS and JavaScript as it can easily lead to breaking code when refactoring CSS.

We recommend creating JavaScript-specific classes with a `.js-` hook as prefix to bind to. Don't use these class names for CSS styling!

```html
<button class="button js-button-toggle">Toggle</button>
```

## States

We use the SMACCS naming convention for global states like `.is-active` and `.is-collapsed`.

Read more about state rules [here](https://smacss.com/book/type-state).

```scss
.patch {
	color: $gray;

	&.is-visible {
		color: $black;
	}
}
```

## Extend directive

`@extend` should be avoided because it has unintuitive, unexpected and potentially dangerous behavior, especially when used with nested selectors. Even extending top-level placeholder selectors can cause problems if the order of selectors ends up changing later.

* Using the `@extend` directive is allowed for extending placeholder selectors

**Bad**

```scss
.pim {
	position: absolute;
	right: 0;

	border-radius 100%;
}

.sebastiaan {
	display: inline-block;

	&:before {
		@extend .pim;

		right: 100%;
	}
}
```

**Good**

```scss
%motorclub {
	position: absolute;
	right: 0;

	border-radius 100%;
}

.pim {
	@extend %motorclub;
}

.sebastiaan {
	display: inline-block;

	&:before {
		@extend %motorclub;

		right: 100%;
	}
}
```

## Variable names

* We recommend variable names to be prefixed by type: `$color-**` or `$font-**`
* Names will be written in lowercase
* We use dashes to separate words in variable identifiers: `$font-size-xl`
* Variables only used within one module will be prefixed by the name of the module:

**Bad**

```scss
$module: '.motor';

$card_width: 24rem;
$cardBorderColor: #ff69b4;

#{$module} {
	width: $card_width;
	margin-left: ($cardWidth / 2);

	border: 1px solid $cardBorderColor;
}
```

**Good**

```scss
$module: '.motor';

$card-width: 24rem;
$card-color-border: #ff69b4;

#{$module} {
	width: $card-width;
	margin-left: ($card-width / 2);

	border: 1px solid $card-color-border;
}
```

# BEM

## Block

* Module- and filenames won't be abbreviated and are lowercase with dashes.
* We define the module (class) name on the top of the block in a `$module` variable.
* We don't abbreviate words to define a module name.
* Module/file names are written in singular form: `_button.scss`.

**Bad**

```scss
.vicePresident {
	position: absolute;
}
```

**Good**

```scss
$module: '.vice-president';

#{$module} {
	position: absolute;
}
```

## Elements

* An element is separated from a block name by a double underscore: `__`
* We don't use the parent selector `&` to define elements.
* We don't use double element names when nesting elements. Read more about this [here](http://getbem.com/faq/#css-nested-elements).

**Bad**

```scss
#{$module} {
	position: fixed;

	&__element {
		display: inline-block;

		&__link {
			color: $black;
		}
	}
}
```

**Good**

```scss
#{$module} {
	position: fixed;
}

#{$module}__element {
	display: inline-block;
}

#{$module}__link {
	color: $black;
}
```

## Modifiers

* An element modifier is separated from a block (or element) name by a double dash: `--`
* Modifiers will be defined within the module using the parent selector: `&`
* We don't use modifiers to define states.
* We don't extend the base module, we use multiple classes: `<a class="btn btn–-big">I'm big</a>`
* We don't use classnames with double modifiers.

**Bad**

```html
<button class="button--inverted--big">
	<i class="button--inverted--big__icon"></i> Button
</button>
```

```scss
$module: '.button';

#{$module} {
	color: $branding-1;

	&__icon {
		width: 1rem;
	}

	&--inverted {
		@extend .button;

		color: $branding-2;

		&--big{
			@extend .button--inverted;

			padding: 2rem;

			&__icon {
				width: 2rem;
			}
		}
	}
}
```

**Good**

```html
<button class="button button--inverted button--big">
	<i class="button__icon"></i> Button
</button>
```

```scss
$module: '.button';

#{$module} {
	color: $branding-1;

	&--inverted {
		color: $branding-2;
	}

	&--big {
		padding: 2rem;

		#{$module}__icon {
			width: 2rem;
		}
	}
}

#{$module}__icon {
	width: 1rem;
}

```

## Property declarations

* We use the shorthand to define properties
* When overwriting properties we use the specific selector

**Bad**

```scss
#{$module} {
	background-repeat: no-repeat;

	&--president {
		background: repeat;
	}
}
```

**Good**

```scss
#{$module} {
	background: no-repeat;

	&--president {
		background-repeat: repeat;
	}
}
```

## Property order

* We sort our properties grouped by type
	* Positioning
	* Transforms
	* Display & box model
	* Colors & typography
	* Backgrounds & borders
	* Animation
	* Other
	* Transitions
* For complete list of the propety order see our [stylelint-config](https://github.com/vicompany/stylelint-config-vi/blob/master/index.js).

**Bad**

```scss
$module: '.prospect';

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
$module: '.prospect';

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

## Nested selectors

* Nested selectors will be defined after the standard property declarations, with the exception of `@extend` and `@include` directives.
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
#{$module} {
	&:before {
		content: 'motorclub';
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

	&[data-module='motor'] {
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
		content: 'motorclub';
	}

	&[data-module='motor'] {
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

```css
$module: '.media';

#{$module} {
	padding: 1rem;

	background: $gray;

	.image {
		margin: 1rem;
	}

	p {
		padding: 0;
	}
}
```

**Good**

```html
<div class="media">
	<div class="media__image">
		<img class="img" src="/img/club/sven.png" alt="Road Captain">
	</div>
	<div class="media__body">
		<p>The Road Captain is responsible for planning and organizing all club runs.</p>
	</div>
</div>
```

```css
$module: '.media';

#{$module} {
	padding: 1rem;

	background: $gray;
}

#{$module}__image {
	margin: 1rem;
}

#{$module}__body {
	padding: 0;
}
```

## Module mix

Mixing of modules is a technique for using different BEM entities on a single DOM node. Read more about mixing modules [here](https://en.bem.info/methodology/quick-start/#mix)
* Combine the behavior and styles of multiple blocks without duplicating code.
* Create new blocks based on existing ones.

```html
<header class="header">
	<img class="logo header__logo" src="/img/logo.svg" alt="Logo">
</header>
```

```css
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

```css
$module: '.logo';

#{$module} {
	max-width: 10rem;
	padding: 1rem;
}
```