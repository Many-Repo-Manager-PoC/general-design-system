import {
  $,
  type QwikIntrinsicElements,
  component$,
  useOnWindow,
  useSignal
} from "@qwik.dev/core";
import type { ContentHeading } from "@qwik.dev/router";
import { cn } from "@/utils/cn";

export const DashboardTableOfContents = component$(
  ({ headings }: { headings: ContentHeading[] }) => {
    const itemIds = headings.map((item) => item.id);
    const activeHeading = useActiveItem(itemIds);

    if (headings.length === 0) {
      return null;
    }

    return (
      <div class="sticky top-0 h-[100vh] space-y-2 px-12 pt-20">
        <div class="text-medium-2 font-bold">On This Page</div>
        <Tree headings={headings} activeItem={activeHeading.value} />
      </div>
    );
  }
);

const useActiveItem = (itemIds: string[]) => {
  const activeId = useSignal<string>();

  useOnWindow(
    "scroll",
    $(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              activeId.value = entry.target.id;
            }
          }
        },
        { rootMargin: "0% 0% -85% 0%" }
      );

      for (const id of itemIds) {
        const element = document.getElementById(id);
        if (element) {
          observer.observe(element);
        }
      }

      return () => {
        for (const id of itemIds) {
          const element = document.getElementById(id);
          if (element) {
            observer.unobserve(element);
          }
        }
      };
    })
  );

  return activeId;
};

type TreeProps = QwikIntrinsicElements["ul"] & {
  headings: ContentHeading[];
  level?: number;
  activeItem?: string;
};

const Tree = component$<TreeProps>(({ headings, level = 1, activeItem }) => {
  return headings.length > 0 && level < 3 ? (
    <ul class={cn("m-0 list-none", { "pl-4": level !== 1 })}>
      {headings.map((heading) => {
        return (
          <li key={heading.id} class={cn("mt-0 pt-2")}>
            <a
              href={`#${heading.id}`}
              onClick$={[
                $(() => {
                  const element = document.getElementById(heading.id);
                  if (element) {
                    const navbarHeight = 90;
                    const elementPosition =
                      element.getBoundingClientRect().top + window.scrollY - navbarHeight;
                    window.scrollTo({
                      top: elementPosition,
                      behavior: "smooth"
                    });
                  }
                })
              ]}
              class={cn(
                heading.level > 2 ? "ml-4" : null,
                "inline-block text-digital-gray-60 dark:text-digital-gray-40 no-underline transition-colors hover:text-digital-gray-100 dark:hover:text-white",
                heading.id === `${activeItem}` &&
                  "font-bold text-interaction-blue-50 dark:text-interaction-blue-20"
              )}
            >
              {heading.text}
            </a>
          </li>
        );
      })}
    </ul>
  ) : null;
});
