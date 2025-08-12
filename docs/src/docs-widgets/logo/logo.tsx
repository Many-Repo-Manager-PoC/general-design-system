import { component$ } from "@qwik.dev/core";
import { Link } from "@qwik.dev/router";

export const Logo = component$(() => {
  return (
    <Link href="/" class="flex items-center gap-3 h-10">
      <span class="text-3xl italic text-white font-sans-light">General</span>
    </Link>
  );
});
