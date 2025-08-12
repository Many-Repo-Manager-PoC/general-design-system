import { type PropsOf, component$ } from "@qwik.dev/core";

type ImageProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
} & PropsOf<"img">;

/** Docs image component */
export const Image = component$(({ src, alt, width, height, ...rest }: ImageProps) => {
  return (
    // biome-ignore lint/a11y/useAltText: <explanation>
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      loading="lazy"
      decoding="async"
      {...rest}
    />
  );
});
