## Package commands

- Run the dev server with `npm run dev`
- Build the library with `npm run build`
- Run the preview server with `npm run preview`

## Composability

Every component in the General Design System has "pieces", or sub-components. You can think of them like regular markup (e.g. div, span, button).

This means they can be easily combined in different ways (on the consumer side) to meet various user needs.

✅ Like this:

```tsx
<TooltipRoot>
  <TooltipTrigger> Button </TooltipTrigger>
  <TooltipContent> Div </TooltipContent>
</TooltipRoot>
```

> Tooltip Root is also a div!

Contributors can combine this with the `PropsOf` type as if it was a JSX div. `<TooltipContent class="min-w-20" />`.

❌ NOT this:

```tsx
<Tooltip
  triggerProps={x}
  triggerClass="md:py-4"
  contentProps={y}
  contentClass="lg:py-2"
/>
```

## Documenting Changes

For the time being, each component inside the `src/components` folder should have a `docs.md` file. This should cover how to use the component, what components are available, and what API's can props that can be used.

## Environment agnostic

The components should be optimized regardless of the environment (SSR, SSG, CSR), the General Design System needs to know when each function should run on the server or the client for consumers. This means avoid the use of visible task when possible, but if it's needed then go for it. (Jack is happy to help anyone that has some confusion here)
