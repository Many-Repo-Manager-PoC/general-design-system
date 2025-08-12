import { component$ } from "@qwik.dev/core";
import { Link, useLocation } from "@qwik.dev/router";
import { Logo } from "../logo/logo";

export const Header = component$(() => {
  const loc = useLocation();

  const isTheme = loc.url.pathname.startsWith("/theme/");
  const isComponents = loc.url.pathname.startsWith("/components/");
  const isTemplates = loc.url.pathname.startsWith("/templates/");
  const highlightClasses = "border-light-blue-20 text-light-blue-20";

  return (
    <header class="flex items-center justify-center bg-core-blue-70 h-20 sticky top-0 z-10">
      <div class="max-w-screen-xl flex justify-between items-center w-full">
        <Logo />
        <div class="flex items-center gap-10 text-white">
          <Link
            class={`h-20 flex items-center border-b-2 hover:border-light-blue-20 ${
              isTheme ? highlightClasses : "border-transparent"
            }`}
            href="/theme/colors"
          >
            Theme
          </Link>
          <Link
            class={`h-20 flex items-center border-b-2 hover:border-light-blue-20 ${
              isComponents ? highlightClasses : "border-transparent"
            }`}
            href="/components/button"
          >
            Components
          </Link>
          <Link
            class={`h-20 flex items-center border-b-2 hover:border-light-blue-20 ${
              isTemplates ? highlightClasses : "border-transparent"
            }`}
            href="/templates/header"
          >
            Templates
          </Link>
        </div>
      </div>
    </header>
  );
});
