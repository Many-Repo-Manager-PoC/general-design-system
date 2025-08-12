import { Header } from "@/docs-widgets/header/header";
import { Sidebar } from "@/docs-widgets/sidebar/sidebar";
import { components } from "@/mdx/components";
import { MDXProvider } from "@/mdx/provider";
import { Slot, component$ } from "@qwik.dev/core";
import type { RequestHandler } from "@qwik.dev/router";

export const onGet: RequestHandler = async ({ cacheControl }) => {
  // Control caching for this request for best performance and to reduce hosting costs:
  // https://qwik.builder.io/docs/caching/
  cacheControl({
    // Always serve a cached response by default, up to a week stale
    staleWhileRevalidate: 60 * 60 * 24 * 7,
    // Max once every 5 minutes, revalidate on the server to get a fresh version of this page
    maxAge: 60 * 5

    // public: false,
    // maxAge: 0,
    // sMaxAge: 0,
    // staleWhileRevalidate: 0,
  });
};

export default component$(() => {
  return (
    <MDXProvider components={components}>
      <Header />
      <main class="grid lg:grid-cols-[200px_1fr] max-w-screen-xl mx-auto gap-10">
        <Sidebar />
        <div>
          <Slot />
        </div>
      </main>
    </MDXProvider>
  );
});
