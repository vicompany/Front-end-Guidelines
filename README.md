# Front-end at VI Company: Web Standards First

This document defines the core standards for front-end development, prioritizing performance, maintainability, and strict adherence to modern web specifications.

## I. Core Architectural Principle: HTML-First and Progressive Enhancement

Our primary goal is to deliver a robust, functional experience using minimal network resources. This is achieved by adhering to an **HTML-First** methodology, where client-side JavaScript is treated strictly as an enhancement.

### Standards

- **Static Baseline:** All pages must be fully functional and readable with JavaScript disabled.
- **Island Architecture:** We implement the Island Architecture pattern, where all client-side logic is confined to small, independently hydrated, and self-contained units (islands).
- **Minimal Payload:** JavaScript is only shipped to the client when the component explicitly requires interactivity. This strategy is managed via the **Astro** framework, which enforces server-side rendering by default and orchestrates selective client hydration.

## II. Interactivity and Encapsulation Tiers

Client-side interaction is introduced via a tiered dependency model. We prioritize native browser capabilities and encapsulation standards over monolithic frameworks.

| **Tier**   | **Purpose**                                                                                             | **Primary Technology**                               | **Standard Utilized**                |
| ---------- | ------------------------------------------------------------------------------------------------------- | ---------------------------------------------------- | ------------------------------------ |
| **Tier 1** | Simple DOM manipulation, event listeners, observers (e.g., menu toggle, carousel manual slide).         | **Native Browser APIs (Vanilla JS), Web Components** | DOM API, ES Modules, Custom Elements |
| **Tier 2** | High-fidelity, reactive, and state-intensive experiences (e.g., trading grids, real-time data binding). | **Stateful UI Framework (Vue)**                      | Framework-Specific Reactivity        |

### Standards

- **Tier 1 Preference:** Simple [HTML Web Components](https://blog.jim-nielsen.com/2023/html-web-components/) (using the light DOM instead of Shadow DOM) are the preferred mechanism for simple UI interactions. They offer automatic instantiation and life-cycle methods and a container for scoped JavaScript functionality while maintaining global CSS styling.
- **Tier 2 Restriction:** Stateful frameworks (Tier 2) must be reserved only for areas where cross-component reactivity is complex and unavoidable. Hydration must be lazy (e.g., only when visible or idle).

## III. Modularity and Code Organization (Monorepo)

A **Monorepo** structure is mandatory for promoting code sharing, managing dependencies, and establishing clear contract boundaries.

### Structure

- **Applications (/apps/my-app):** The primary rendering layer (Astro pages/layouts) which **consumes** shared packages.
- **Component Library (/packages/components):** Houses all reusable interface elements.
- **Utilities & API (/packages/utils):** Contains loggers, formatters, API client wrappers, etc.
- **Types (/packages/types):** Contains shared types and TypeScript definitions.

### Standards

- **Shared Typing:** All data models and API contracts must be defined in the packages/types workspace and imported by both the API wrappers and UI components.
- **Clear Ownership:** Any component logic that is not tied to the main application's routing or layout must reside within a package.

## IV. Data Handling and Asynchronous Integrity

The front-end must handle data consumption and long-running asynchronous tasks in a non-blocking and predictable manner, aligning with the server's transactional model.

### Standards

- **API Client Integrity:** All network communication must be abstracted behind client wrappers in packages/utils to centralize request handling, error normalization, and logging.
- **Non-Blocking User Experience:** The UI must never block or wait synchronously for long backend processes (e.g., bulk report generation).
  - Initiate the long-running process and confirm acceptance immediately.
  - Implement web sockets or server-sent events to update the user on the job's completion status.

## V. Error Management and Resilience

Frontend code must exhibit resilience by treating expected failure scenarios as part of the normal program flow, reserving exceptions for catastrophic failures.

### Standards

- **Trivial Situations (Expected Failures):** User input validation errors, non-existent records (HTTP 404), or empty search results must be managed via standard return types, not throw/catch.
- **Exceptional Situations (Catastrophic Failures):** Use JavaScript exceptions only for unrecoverable faults (e.g., network disconnects, unhandled API errors, environment misconfiguration).
- **Component Error Boundaries:** Interactive Islands (Tier 3) must implement local error boundaries to prevent catastrophic failure of the entire page due to an isolated component issue.
