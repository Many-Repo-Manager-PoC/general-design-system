import { type PropsOf, Slot, component$ } from "@qwik.dev/core";

export const Button = component$<PropsOf<"button">>(({ ...props }: PropsOf<"button">) => {
  return (
    <button {...props} type="button">
      <Slot />
    </button>
  );
});
