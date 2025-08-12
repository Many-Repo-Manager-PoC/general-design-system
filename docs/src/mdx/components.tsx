import { type Component, Slot, component$ } from "@qwik.dev/core";
import { Link } from "@qwik.dev/router";
import { Showcase } from "./showcase";

export const components: Record<string, Component> = {
  Showcase,
  a: Link,
  pre: component$(() => {
    return (
      <pre class="bg-black text-white whitespace-pre-wrap my-4">
        <Slot />
      </pre>
    );
  }),
  h2: component$(() => {
    return (
      <h2 class="mt-12 mb-4">
        <Slot />
      </h2>
    );
  })
};
