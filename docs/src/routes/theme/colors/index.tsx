import { $, component$, useSignal } from "@qwik.dev/core";
import { rawThemeFile } from "general-design-system";

interface ColorData {
  name: string;
  variable: string;
  shades: {
    shade: string;
    value: string;
  }[];
}

function parseColorData(cssContent: string): ColorData[] {
  const colorVariables: Record<string, ColorData> = {};

  // Match colors with number suffixes (e.g., --color-core-blue-10)
  const numberedRegex = /--color-([a-zA-Z0-9-]+)-(\d+):\s*(#[0-9a-f]+);/g;
  let match: RegExpExecArray | null;

  while ((match = numberedRegex.exec(cssContent)) !== null) {
    const [, colorName, shade, value] = match;

    if (!colorVariables[colorName]) {
      const displayName = colorName
        .split("-")
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join(" ");

      colorVariables[colorName] = {
        name: displayName,
        variable: colorName,
        shades: []
      };
    }

    colorVariables[colorName].shades.push({
      shade,
      value
    });
  }

  const singleRegex = /--color-([a-zA-Z0-9-]+):\s*(#[0-9a-f]+);/g;
  let singleMatch: RegExpExecArray | null;

  while ((singleMatch = singleRegex.exec(cssContent)) !== null) {
    const [, fullColorName, value] = singleMatch;

    const hasNumberedVariants = Object.keys(colorVariables).some(
      (key) => fullColorName.startsWith(`${key}-`) || fullColorName === key
    );

    if (!hasNumberedVariants) {
      const displayName = fullColorName
        .split("-")
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join(" ");

      colorVariables[fullColorName] = {
        name: displayName,
        variable: fullColorName,
        shades: [
          {
            shade: "base",
            value
          }
        ]
      };
    }
  }

  for (const group of Object.values(colorVariables)) {
    group.shades.sort((a, b) => {
      if (a.shade === "base") return -1;
      if (b.shade === "base") return 1;
      return Number.parseInt(a.shade) - Number.parseInt(b.shade);
    });
  }

  const colorArray = Object.values(colorVariables);

  return colorArray.sort((a, b) => {
    if (a.variable === "core-blue") return -1;
    if (b.variable === "core-blue") return 1;

    if (a.variable === "light-blue") return -1;
    if (b.variable === "light-blue") return 1;

    if (a.variable === "gray") return -1;
    if (b.variable === "gray") return 1;

    return a.name.localeCompare(b.name);
  });
}

export default component$(() => {
  const colorGroups = parseColorData(rawThemeFile);
  const copiedColor = useSignal<string | null>(null);

  const copyToClipboard = $((value: string, id: string) => {
    navigator.clipboard.writeText(value);
    copiedColor.value = id;

    setTimeout(() => {
      if (copiedColor.value === id) {
        copiedColor.value = null;
      }
    }, 2000);
  });

  return (
    <div class="space-y-16 my-16">
      <h1>Color System</h1>

      {colorGroups.length === 0 ? (
        <div>No color data found</div>
      ) : (
        colorGroups.map((group) => (
          <div key={group.variable} class="space-y-4">
            <div class="flex items-baseline justify-between border-b pb-2">
              <h2>{group.name}</h2>
              <code class="text-sm px-2 py-1 rounded">
                {group.shades.length === 1 && group.shades[0].shade === "base"
                  ? `text-${group.variable}`
                  : `text-${group.variable}-[shade]`}
              </code>
            </div>
            <div class="flex flex-wrap justify-end gap-4">
              {group.shades.map((shade) => {
                const colorId = `${group.variable}-${shade.shade}`;
                return (
                  <span key={colorId} class="w-24 flex flex-col">
                    <button
                      type="button"
                      class="h-16 w-full rounded-md border relative cursor-pointer outline-none group border-gray-30"
                      style={{ backgroundColor: shade.value }}
                      onClick$={() => copyToClipboard(shade.value, colorId)}
                      title={`Copy color: ${shade.value}`}
                      aria-label={`Copy ${group.name} ${shade.shade} color: ${shade.value}`}
                      aria-live="polite"
                    >
                      {copiedColor.value === colorId ? (
                        <span class="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white font-medium rounded-md z-20">
                          Copied!
                        </span>
                      ) : (
                        <span class="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 text-white text-xs font-medium rounded-md opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity z-10">
                          Copy color
                        </span>
                      )}
                    </button>
                    <div class="mt-2 flex justify-between">
                      {shade.shade !== "base" && (
                        <span class="text-sm font-medium">{shade.shade}</span>
                      )}
                      <span
                        class={`text-sm text-gray-500 ${shade.shade === "base" ? "ml-auto" : ""}`}
                      >
                        {shade.value}
                      </span>
                    </div>
                  </span>
                );
              })}
            </div>
          </div>
        ))
      )}
    </div>
  );
});
