# SASS guidelines - Work in Progress

## Module name

* We define the module (class) name on the top of the document in a $module variable.

```
$module: '.foo';

#{$module} {
	position: relative;
}
```

## Element

```
#{$module} {
	&__element {
		display: inline-block;
	}
}
```

## Block Modifier

```
#{$module} {
	&__element {
		background: $white url('/img/foo.png') no-repeat;
	}
}

#{$module}--modifier {
	&__element {
		background-color: $black;
	}
}
```

## Element Modifier

```
#{$module} {
	&__element {
		display: inline-block;

		color: $white

		&--modifier {
			color: $black;
		}
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

1. extends
2. includes
3. properties
4. pseudo classes
5. pseudo elements
6. states
7. breakpoints
8. elements

```
#{$module} {
	@extend %container;
	@include clearfix;

	padding: 1rem;

	&:hover {
		color: $branding-2;
	}

	&:not(:last-of-type) {
		border-bottom: 1px solid $gray;
	}

	&:before {
		content: 'foo';
	}

	&.is-active {
		background: $branding-3;
	}

	@include respond-to(medium) {
		padding: 2rem;
	}

	&__element {
		margin: 0;
	}
}
```