import { $, component$, useSignal } from "@qwik.dev/core";
import { rawThemeFile } from "general-design-system";

interface TypographySize {
  name: string;
  variable: string;
  size: string;
  lineHeight: string;
  fontWeight: string;
  pixelValues: string;
}

function parseTypographyData(cssContent: string): TypographySize[] {
  const typographySizes: TypographySize[] = [];

  const sizeRegex = /--text-([a-zA-Z0-9-]+):\s*([\d.]+rem);.*?\/\* (\d+px) \*\//g;
  const lineHeightRegex =
    /--text-([a-zA-Z0-9-]+)--line-height:\s*([\d.]+rem);.*?\/\* (\d+px) \*\//g;

  const sizes: Record<string, { value: string; pixels: string }> = {};
  let match: RegExpExecArray | null;
  while ((match = sizeRegex.exec(cssContent)) !== null) {
    const [, variable, value, pixels] = match;
    if (!variable.includes("--line-height")) {
      sizes[variable] = { value, pixels };
    }
  }

  const lineHeights: Record<string, { value: string; pixels: string }> = {};
  while ((match = lineHeightRegex.exec(cssContent)) !== null) {
    const [, variable, value, pixels] = match;
    lineHeights[variable] = { value, pixels };
  }

  for (const variable in sizes) {
    const size = sizes[variable].value;
    const sizePixels = sizes[variable].pixels;
    const lineHeight = lineHeights[variable]?.value || "";
    const lineHeightPixels = lineHeights[variable]?.pixels || "";

    let fontWeight = "400";
    if (variable.includes("h1") || variable.includes("h2") || variable.includes("h3")) {
      fontWeight = "300";
    } else if (variable.includes("bold") || variable.includes("subtitle")) {
      fontWeight = "600";
    }

    const displayName = variable
      .replace(/^(\d)/, "$1")
      .split("-")
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(" ");

    typographySizes.push({
      name: displayName,
      variable,
      size,
      lineHeight,
      fontWeight,
      pixelValues: `${sizePixels} / ${lineHeightPixels}`
    });
  }

  return typographySizes.sort((a, b) => {
    const aSize = Number.parseFloat(a.size);
    const bSize = Number.parseFloat(b.size);
    return bSize - aSize;
  });
}

export default component$(() => {
  const typographySizes = parseTypographyData(rawThemeFile);
  const copiedInfo = useSignal<string | null>(null);

  const copyToClipboard = $((value: string, id: string) => {
    navigator.clipboard.writeText(value);
    copiedInfo.value = id;

    setTimeout(() => {
      if (copiedInfo.value === id) {
        copiedInfo.value = null;
      }
    }, 2000);
  });

  const fontWeightNames: Record<string, string> = {
    "400": "Regular",
    "500": "Medium",
    "600": "SemiBold"
  };

  const textClasses: Record<string, string> = {
    "h1": "text-h1",
    "h2": "text-h2",
    "h3": "text-h3",
    "h4": "text-h4",
    "h5": "text-h5",
    "body-large": "text-body-large",
    "body-small": "text-body-small",
    "body-xs": "text-body-xs",
    "body-xxs": "text-body-xxs",
    "label": "text-label",
    "label-bold": "text-label-bold",
    "subtitle": "text-subtitle"
  };

  return (
    <div class="space-y-16 my-16">
      <h1>Typography System</h1>

      <div class="space-y-12">
        {typographySizes.length === 0 ? (
          <div>No typography data found</div>
        ) : (
          typographySizes.map((type) => {
            const typeId = `type-${type.variable}`;
            const fontWeightName = fontWeightNames[type.fontWeight] || "Regular";
            const textClass = textClasses[type.variable];

            return (
              <div key={typeId} class="border-b border-gray-20 pb-8">
                <div class="flex items-baseline justify-between pb-4">
                  <h2 class="text-xl font-semibold">text-{type.variable}</h2>
                  <code class="text-sm px-2 py-1 bg-gray-200 rounded text-gray-700">
                    text-{type.variable}
                  </code>
                </div>

                <div class="flex flex-wrap items-baseline gap-8">
                  <div class="w-full md:w-1/2 space-y-4">
                    <div class="grid grid-cols-3 gap-2 text-sm text-gray-600">
                      <div>Size</div>
                      <div>Line Height</div>
                      <div>Default Weight</div>
                    </div>
                    <div class="grid grid-cols-3 gap-2">
                      <div>
                        <button
                          type="button"
                          class="px-2 py-1 rounded bg-gray-10 hover:bg-gray-10 transition-colors"
                          onClick$={() => copyToClipboard(type.size, `${typeId}-size`)}
                          title={`Copy size: ${type.size}`}
                        >
                          {copiedInfo.value === `${typeId}-size` ? "Copied!" : type.size}
                        </button>
                      </div>
                      <div>
                        <button
                          type="button"
                          class="px-2 py-1 rounded bg-gray-10 hover:bg-gray-10 transition-colors"
                          onClick$={() =>
                            copyToClipboard(type.lineHeight, `${typeId}-lineheight`)
                          }
                          title={`Copy line height: ${type.lineHeight}`}
                        >
                          {copiedInfo.value === `${typeId}-lineheight`
                            ? "Copied!"
                            : type.lineHeight}
                        </button>
                        <span class="text-gray-50 text-sm ml-2">
                          ({type.pixelValues})
                        </span>
                      </div>
                      <div>
                        <button
                          type="button"
                          class="px-2 py-1 rounded bg-gray-10 hover:bg-gray-10 transition-colors"
                          onClick$={() =>
                            copyToClipboard(fontWeightName, `${typeId}-weight`)
                          }
                          title={`Copy weight: ${fontWeightName} (${type.fontWeight})`}
                        >
                          {copiedInfo.value === `${typeId}-weight`
                            ? "Copied!"
                            : fontWeightName}
                        </button>
                        <span class="text-gray-50 text-sm ml-2">({type.fontWeight})</span>
                      </div>
                    </div>
                  </div>

                  <div class="w-full md:w-1/3 text-hello">
                    <div class={`border border-gray-20 rounded-md p-4 ${textClass}`}>
                      Sample text for {type.variable}
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      <h2 class="text-4xl">Design for typography</h2>

      {/* Add FigmaDesign component here */}
    </div>
  );
});
