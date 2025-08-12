import { component$ } from "@qwik.dev/core";

export default component$(() => {
  return (
    <div class="flex flex-col gap-16 my-16">
      <h1>Icons</h1>
      <span>Below is a list of all the icons in the General Design System.</span>

      {/* Add FigmaDesign component here */}

      <a href="https://heroicons.com/" target="_blank" rel="noreferrer">
        You can find the rest of the Heroicons library here.
      </a>
    </div>
  );
});
