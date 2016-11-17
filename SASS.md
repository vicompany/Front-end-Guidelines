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
.navigationSidebar {
	display: flex;
}

#item {
	border: dashed;
}
```

**Good**

```scss
.navigation-sidebar {
	display: flex;
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

We recommend creating JavaScript-specific classes with a `.js-` hook as prefix to bind to. Don't use these class names for CSS styling!

```
<button class="button js-button-toggle">Toggle</button>
```

## States

We use the SMACCS naming convention for global states like `.is-active` and `.is-collapsed`.

Read more about state rules [here](https://smacss.com/book/type-state).

```
.item {
	color: $gray;

	&.is-active {
		color: $black;
	}
}
```

## Extend directive

`@extend` should be avoided because it has unintuitive, unexpected and potentially dangerous behavior, especially when used with nested selectors. Even extending top-level placeholder selectors can cause problems if the order of selectors ends up changing later.

* Using the `@extend` directive is allowed for extending placeholder selectors

**Bad**

```
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

```
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

```
$module: '.card';

$card_width: 24rem;
$cardBorderColor: #ff69b4;

#{$module} {
	width: $card_width;
	margin-left: ($cardWidth / 2);

	border: 1px solid $cardBorderColor;
}
```

**Good**

```
$module: '.card';

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

```
.navSidebar {
	border-radius: 100%;
}
```

**Good**

```
$module: '.navigation-sidebar';

#{$module} {
	border-radius: 100%;
}
```

## Elements

* We don't use the parent selector `&` to define elements.
* We don't use double element names when nesting elements. Read more about this [here](http://getbem.com/faq/#css-nested-elements).

**Bad**

```
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

```
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

* Modifiers will be defined within the module using the parent selector `&`
* We don't use modifiers to define states.
* We don't extend the base module, we use multiple classes: `<a class="btn btn–-big">I'm big</a>`
* We don't use classnames with double modifiers.

**Bad**

```
// <button class="button--inverted--big">Button</button>

$module: '.button';

#{$module} {
	color: $branding-1;

	&--inverted {
		@extend .button;

		color: $branding-2;

		&--big{
			@extend .button--inverted;

			padding: 2rem;
		}
	}
}
```

**Good**

```
// <button class="button button--inverted button--big">Button</button>

$module: '.button';

#{$module} {
	color: $branding-1;

	&--inverted {
		color: $branding-2;
	}

	&--big {
		padding: 2rem;
	}
}
```

## Property declarations

* We use the shorthand to define properties
* When overwriting properties we use the specific selector

**Bad**

```
#{$module} {
	background-repeat: no-repeat;

	&--pim {
		background: repeat;
	}
}
```

**Good**

```
#{$module} {
	background: no-repeat;

	&--pim {
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

```
$module: '.foo';

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

```
$module: '.foo';

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

```
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

```
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

## Module nesting TODO

1. News organism with image atom
2. Both the news organism and image atom are modified in the second example

```
<div class="news">
    <h1 class="news__title">...</h1>
    <div class="news__image">
        <div class="image">...</div>
    </div>
    <div class="news__text">...</div>
</div>

<div class="news--breaking">
    <h1 class="news__title">...</h1>
    <div class="news__image">
        <div class="image--fullsize">...</div>
    </div>
    <div class="news__text">...</div>
</div>
```

## Mixed modules TODO

```
<header class="header">
	<div class="logo header__logo">plaatje</div>
</header>
```
