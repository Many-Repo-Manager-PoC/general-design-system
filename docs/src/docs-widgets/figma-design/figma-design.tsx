import { type PropsOf, component$ } from "@qwik.dev/core";

type FigmaDesignProps = {
  id: string;
  title: string;
  height: string;
  width: string;
} & PropsOf<"iframe">;

export const FigmaDesign = component$<FigmaDesignProps>(
  ({ id, title, height, width, ...props }: FigmaDesignProps) => {
    return (
      <iframe
        style="border: 1px solid rgba(0, 0, 0, 0.1);"
        width={width}
        height={height}
        src={"add figma url here"}
        allowFullscreen
        title={title}
        loading="lazy"
        {...props}
      />
    );
  }
);
