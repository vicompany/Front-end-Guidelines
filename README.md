# The VI Company Front-end Guidelines

## Table of Contents

- [Principles](#principles)
- [Security and Privacy](#security-and-privacy)
  - [General Data Protection Regulation](#general-data-protection-regulation)
  - [Resources](#resources)
- [Quality Assurance](#quality-assurance)
  - [Code Style](#code-style)
  - [Automated tests](#automated-tests)
    - [Functional](#functional)
    - [Non-functional](#non-functional)
- [Contineous Integration and Contineous Deployment](#contineous-integration-and-contineous-deployment)


## Principles

- We highly regard Accessibility and Web Standards.
- We use [Progressive Enhancement](https://www.gov.uk/service-manual/technology/using-progressive-enhancement) as much as possible.
- We support evergreen browsers. See [.browserslistrc](recipes/.browserslistrc).


## Security and Privacy

### General Data Protection Regulation

See [GDPR – A Practical Guide For Developers](https://techblog.bozho.net/gdpr-practical-guide-developers/).

### Resources

- https://owasp.org/www-project-secure-headers/
- https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers#security


## Quality Assurance

We value high quality code.

### Code Style

We enforce a code style through tools, such as linters.

Language   | Tool         | Guidelines
---------- | ------------ | ----------
General    | EditorConfig | See [.editorconfig](recipes/.editorconfig)
CSS        | StyleLint    | See [stylelint-config-vi](https://github.com/vicompany/stylelint-config-vi)
JavaScript | ESLint       | See [eslint-config-vi](https://github.com/vicompany/eslint-config-vi)


### Automated tests

We decide what tests are required on a per-project basis.

#### Functional

We often end up only unit testing.

- JavaScript with [Jest](https://jestjs.io/)
- UI Component with [Testing Library](https://testing-library.com/) and Jest

#### Non-functional

- Code quality and security with [SonarQube](https://www.sonarqube.org/)
- Dependency vulnerability checks with [Snyk](https://snyk.io/)


## Contineous Integration and Contineous Deployment

TODO