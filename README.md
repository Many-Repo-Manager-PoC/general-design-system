# General Design System

A styled UI component library that you can consume in your application, using [Tailwind CSS](https://tailwindcss.com/)

> To contribute to the project, read the contributing file.

## Vision

The components intend to be easy to customize, performant, composable, and accessible.

## Installation.

Ask to join the General consulting npm organization, when done you can do the following:

Install the package with:

```tsx
npm i -D general-design-system
```

## Installing tailwind

Make sure that you install tailwind, including both the dependency and the vite plugin. Follow the [installation steps here](https://tailwindcss.com/docs/installation/using-vite).

After tailwind is installed, you can find specific use case examples by copy pasting components inside of the project routes (e.g. `src/routes/card`, `src/routes/select`).

## Design Tokens

To use the design tokens from the General Design system, import the design system global.css file into your own.

```css
@import "general-design-system/global.css";

@layer base {
  body {
    /* your styles here */
  }
}
```


