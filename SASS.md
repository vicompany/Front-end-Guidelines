# SASS guidelines - Work in Progress

## Module name

* We define the module (class) name on the top of the document in a $module variable:
	* `$module: '.button';`
* We **don't** abbreviate words to define a module name:
	* ~~`_btn.scss`~~
* Module/file names are written in singular form:
	* `_button.scss`
	* ~~`_btns.scss`~~

```
$module: '.pim';

#{$module} {
	border-radius: 100%;
}
```

## Element

* We don't use the parent selector `&` to define elements:
	```
	#{$module} {
		&__element {
			display: inline-block;
		}
	}
	```
* We don't use double element names:
	```
	#{$module} {
		&__element__link {
			display: inline-block;
		}
	}
	```

Example:

```
$module: '.panel';

#{$module} {
	position: relative;
}

#{$module}__element {
	display: inline-block;
}

#{$module}__link {
	color: $gray;
}
```

## Block Modifier

* Modifiers will be defined within the module using the parent selector `&`
* We don't use modifiers to define states.
* Double modifiers are not allowed:
	```
	#{$module} {
		color: $branding-1;

		&--modifier--modifier2 {
			color: $branding-3
		}
	}
	```

```
#{$module} {
	padding: 1rem;

	&__element {
		color: $branding-1;
	}

	&--modifier {
		padding: 2rem;

		#{$module}__element {
			color: $branding-2;
		}
	}

	&--modifier-modifier2 {
		color: $branding-3;
	}
}
```

## Element Modifier

```
#{$module}__element {
	display: inline-block;

	color: $white

	&--modifier {
		color: $black;
	}
}
```

## Property order

```
$module: '.foo';

#{$module} {
	position: relative;
	right: 0;

	transform: translate(2rem);
	float: left;

	display: flex;
	margin: 0 0 0 1rem;

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

## Includes/extends, pseudio classes/elements and states

1. Extends
2. Includes
3. Properties
4. Pseudo classes
5. Pseudo elements
6. Attribute selectors
7. States
8. Breakpoints

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

## Variable names

* Variable names will be prefixed by type: `$color-**`
* Names will be written in lowercase
* We use dashes to separate words in variable identifiers: `$font-size-xl`
* Module scoped variables will be prefixed by the name of the module:

	```
	$module: '.card';

	$card-width: 24rem;

	#{$module} {
		width: $card-width;
		margin-left: ($card-width / 2);
	}
	```