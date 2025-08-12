import { metaGlobComponents, rawComponents } from "@/utils/component-import";
import { Tabs } from "@kunai-consulting/qwik";
import {
  type Component,
  type PropsOf,
  component$,
  useSignal,
  useTask$
} from "@qwik.dev/core";
import { cn } from "general-design-system";
import { Highlight } from "./highlight";

import { isDev } from "@qwik.dev/core/build";
import { useLocation } from "@qwik.dev/router";

type ShowcaseProps = PropsOf<"div"> & {
  name?: string;
};

export const Showcase = component$<ShowcaseProps>(({ name, ...props }) => {
  const location = useLocation();
  const componentPath = `/src/routes${location.url.pathname}examples/${name}.tsx`;

  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  const MetaGlobComponentSig = useSignal<Component<any>>();
  const componentCodeSig = useSignal<string>();

  useTask$(async () => {
    MetaGlobComponentSig.value = isDev
      ? await metaGlobComponents[componentPath]()
      : metaGlobComponents[componentPath];
    componentCodeSig.value = isDev
      ? await rawComponents[componentPath]()
      : rawComponents[componentPath];
  });

  return (
    <Tabs.Root>
      <Tabs.List class="mt-4 flex flex-row gap-6">
        <Tabs.Trigger class="text-black">Preview</Tabs.Trigger>
        <Tabs.Trigger class="text-black">Code</Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content
        class={cn("mt-5 rounded-lg border-2 border-gray-20 p-8", props.class)}
      >
        <section class="flex flex-col items-center text-black">
          {MetaGlobComponentSig.value && <MetaGlobComponentSig.value />}
        </section>
      </Tabs.Content>
      <Tabs.Content class="mt-5">
        <Highlight code={componentCodeSig.value || ""} />
      </Tabs.Content>
    </Tabs.Root>
  );
});
