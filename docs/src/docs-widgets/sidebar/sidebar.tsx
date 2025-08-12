import { component$, useSignal, useTask$ } from "@qwik.dev/core";
import { useContent, useLocation } from "@qwik.dev/router";

export const Sidebar = component$(() => {
  const { menu } = useContent();
  const loc = useLocation();
  const currentHref = useSignal<string>("");

  useTask$(({ track }) => {
    track(() => loc.url.pathname);

    if (!menu?.items) return;

    for (const item of menu.items) {
      if (loc.url.pathname === item.href) {
        currentHref.value = item.href || "";
        return;
      }
    }
    currentHref.value = "";
  });

  return (
    <aside class="sticky top-20 h-[calc(100vh-5rem)] flex flex-col overflow-y-auto border-gray-10 border-r">
      {/* {menu?.items?.map((item) => (
        <Link
          href={item.href}
          key={item.href}
          class={`py-2 px-3 not-data-current:hover:bg-gray-20 ${currentHref.value === item.href ? "bg-light-blue-10" : ""}`}
          data-current={currentHref.value === item.href}
        >
          {item.text}
        </Link>
      ))} */}
    </aside>
  );
});
