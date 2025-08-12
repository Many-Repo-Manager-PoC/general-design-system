import { $, component$, useSignal } from "@qwik.dev/core";

interface SpacingData {
  name: string;
  class: string;
  value: string;
  pixelValue: string;
  description: string;
  type: "container" | "padding" | "margin" | "gap";
}

export default component$(() => {
  const copiedClass = useSignal<string | null>(null);

  const copyToClipboard = $((value: string, id: string) => {
    navigator.clipboard.writeText(value);
    copiedClass.value = id;

    setTimeout(() => {
      if (copiedClass.value === id) {
        copiedClass.value = null;
      }
    }, 2000);
  });

  const spacingData: SpacingData[] = [
    {
      name: "Container Max Width",
      class: "max-w-screen-landing",
      value: "992px",
      pixelValue: "992px",
      description: "Main spacing for a landing page container",
      type: "container"
    },
    {
      name: "Padding 2",
      class: "p-2",
      value: "0.5rem",
      pixelValue: "8px",
      description: "Padding on all sides",
      type: "padding"
    },
    {
      name: "Padding 4",
      class: "p-4",
      value: "1rem",
      pixelValue: "16px",
      description: "Padding on all sides",
      type: "padding"
    },
    {
      name: "Padding 6",
      class: "p-6",
      value: "1.5rem",
      pixelValue: "24px",
      description: "Padding on all sides",
      type: "padding"
    },
    {
      name: "Padding 8",
      class: "p-8",
      value: "2rem",
      pixelValue: "32px",
      description: "Padding on all sides",
      type: "padding"
    },
    {
      name: "Padding 10",
      class: "p-10",
      value: "2.5rem",
      pixelValue: "40px",
      description: "Padding on all sides",
      type: "padding"
    },
    {
      name: "Padding 12",
      class: "p-12",
      value: "3rem",
      pixelValue: "48px",
      description: "Padding on all sides",
      type: "padding"
    },
    {
      name: "Margin 2",
      class: "m-2",
      value: "0.5rem",
      pixelValue: "8px",
      description: "Margin on all sides",
      type: "margin"
    },
    {
      name: "Margin 4",
      class: "m-4",
      value: "1rem",
      pixelValue: "16px",
      description: "Margin on all sides",
      type: "margin"
    },
    {
      name: "Margin 6",
      class: "m-6",
      value: "1.5rem",
      pixelValue: "24px",
      description: "Margin on all sides",
      type: "margin"
    },
    {
      name: "Margin 8",
      class: "m-8",
      value: "2rem",
      pixelValue: "32px",
      description: "Margin on all sides",
      type: "margin"
    },
    {
      name: "Margin 10",
      class: "m-10",
      value: "2.5rem",
      pixelValue: "40px",
      description: "Margin on all sides",
      type: "margin"
    },
    {
      name: "Margin 12",
      class: "m-12",
      value: "3rem",
      pixelValue: "48px",
      description: "Margin on all sides",
      type: "margin"
    }
  ];

  const groupedSpacing = spacingData.reduce(
    (acc, item) => {
      if (!acc[item.type]) {
        acc[item.type] = [];
      }
      acc[item.type].push(item);
      return acc;
    },
    {} as Record<string, SpacingData[]>
  );

  const typeLabels: Record<string, string> = {
    container: "Container Classes",
    padding: "Padding Classes",
    margin: "Margin Classes",
    gap: "Gap Classes"
  };

  return (
    <div class="space-y-16 my-16">
      <h1>Spacing System</h1>

      <div class="space-y-2">
        <div>
          Below is a list of all the spacing utilities in the General Design System.
        </div>
        <p class="text-sm text-gray-600">
          Our spacing system is based on multiples of 8px for consistent visual rhythm.
        </p>
      </div>

      {/* Add FigmaDesign component here */}

      <div class="space-y-12">
        {Object.entries(groupedSpacing).map(([type, items]) => (
          <div key={type} class="space-y-6">
            <div class="flex items-baseline justify-between border-b pb-2">
              <h2 class="text-xl font-semibold">{typeLabels[type]}</h2>
              <code class="text-sm px-2 py-1 bg-gray-200 rounded text-gray-700">
                {type === "container" ? "max-w-*" : `${type}`}
              </code>
            </div>

            <div class="space-y-4">
              {items.map((item) => {
                const itemId = `spacing-${item.class.replace(/[^a-zA-Z0-9]/g, "-")}`;
                return (
                  <div key={itemId} class="border border-gray-20 rounded-md p-4">
                    <div class="flex items-center justify-between mb-3">
                      <h3 class="font-medium">{item.name}</h3>
                      <button
                        type="button"
                        class="px-3 py-1 rounded bg-gray-10 hover:bg-gray-20 transition-colors font-mono text-sm"
                        onClick$={() => copyToClipboard(item.class, itemId)}
                        title={`Copy class: ${item.class}`}
                      >
                        {copiedClass.value === itemId ? "Copied!" : item.class}
                      </button>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <span class="text-gray-600">Value:</span>
                        <span class="ml-2 font-mono">{item.value}</span>
                      </div>
                      <div>
                        <span class="text-gray-600">Pixels:</span>
                        <span class="ml-2 font-mono">{item.pixelValue}</span>
                      </div>
                      <div>
                        <span class="text-gray-600">Description:</span>
                        <span class="ml-2">{item.description}</span>
                      </div>
                    </div>

                    {type !== "container" && (
                      <div class="mt-4 p-3 bg-gray-5 rounded border-l-4 border-core-blue-40">
                        <div class="text-xs text-gray-600 mb-2">Visual Example:</div>
                        <div
                          class={`bg-core-blue-10 border-2 border-dashed border-core-blue-30 rounded ${item.class} inline-block`}
                        >
                          <div class="bg-core-blue-20 rounded text-xs px-2 py-1">
                            Content with {item.class}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div class="bg-gray-5 rounded-lg p-6 border border-gray-20">
        <h3 class="text-lg font-semibold mb-4">Usage Notes</h3>
        <ul class="space-y-2 text-sm">
          <li>
            • <strong>Container:</strong> Use{" "}
            <code class="bg-gray-200 px-1 rounded">max-w-screen-landing</code> for main
            page containers
          </li>
          <li>
            • <strong>Padding:</strong> Use{" "}
            <code class="bg-gray-200 px-1 rounded">p-*</code> classes for internal spacing
          </li>
          <li>
            • <strong>Margin:</strong> Use{" "}
            <code class="bg-gray-200 px-1 rounded">m-*</code> classes for external spacing
          </li>
          <li>
            • <strong>Gap:</strong> Use{" "}
            <code class="bg-gray-200 px-1 rounded">gap-*</code> classes for spacing
            between flex/grid items
          </li>
          <li>• All spacing values are multiples of 8px for consistent visual rhythm</li>
        </ul>
      </div>
    </div>
  );
});
