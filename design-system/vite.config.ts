import { qwikVite } from "@qwik.dev/core/optimizer";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import pkg from "./package.json";

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
const { dependencies = {}, peerDependencies = {} } = pkg as any;
const makeRegex = (dep) => new RegExp(`^${dep}(/.*)?$`);
const excludeAll = (obj) => Object.keys(obj).map(makeRegex);

export default defineConfig(() => {
  return {
    build: {
      target: "es2020",
      lib: {
        entry: "./src/index.ts",
        formats: ["es", "cjs"],
        fileName: (format, entryName) =>
          `${entryName}.qwik.${format === "es" ? "mjs" : "cjs"}`
      },
      rollupOptions: {
        output: {
          preserveModules: true,
          preserveModulesRoot: "./src",
          assetFileNames: (assetInfo) => {
            const isCssFile = assetInfo.names?.some((name) => name.endsWith(".css"));

            if (!isCssFile) {
              return "assets/[name]-[hash][extname]";
            }

            return "assets/theme.css";
          }
        },
        // externalize deps that shouldn't be bundled into the library
        external: [
          /^node:.*/,
          ...excludeAll(dependencies),
          ...excludeAll(peerDependencies)
        ]
      }
    },
    plugins: [qwikVite(), tsconfigPaths()]
  };
});
