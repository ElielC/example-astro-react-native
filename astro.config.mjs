// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";

import react from "@astrojs/react";
import stripFlowTypesPlugin from "./remove-flow-plugin";

// https://astro.build/config
export default defineConfig({
  integrations: [
    starlight({
      title: "React Native Paper",
      social: [
        {
          icon: "github",
          label: "GitHub",
          href: "https://github.com/withastro/starlight",
        },
      ],
      sidebar: [
        {
          label: "Guides",
          items: [
            // Each item here is one entry in the navigation menu.
            { label: "Example Guide", slug: "guides/example" },
          ],
        },
        {
          label: "Reference",
          autogenerate: { directory: "reference" },
        },
      ],
    }),
    react(),
  ],
  vite: {
    plugins: [
      // @ts-ignore
      stripFlowTypesPlugin(),
    ],
    resolve: {
      alias: {
        "react-native": "react-native-web",
      },
      // Prioritize .web.js etc. if your library or its deps provide them
      extensions: [
        ".web.js",
        ".web.jsx",
        ".web.ts",
        ".web.tsx",
        ".mjs",
        ".js",
        ".ts",
        ".jsx",
        ".tsx",
        ".json",
      ],
    },
    optimizeDeps: {
      include: [
        "react-native-web",
        "react-native-safe-area-context",
        "react-native-paper", // Explicitly include your design system
        "@babel/runtime/helpers/objectSpread2",
      ],
      esbuildOptions: {
        loader: { ".js": "jsx", ".mjs": "jsx" },
        mainFields: ["module", "main"],
        resolveExtensions: [
          ".web.js",
          ".web.jsx",
          ".web.ts",
          ".web.tsx",
          ".mjs",
          ".js",
          ".ts",
          ".jsx",
          ".tsx",
          ".json",
        ],
      },
    },
    ssr: {
      // Ensure these are bundled and processed by Vite for SSR, not treated as external CJS
      noExternal: [
        "react-native-web",
        /^react-native-web\/.*/,
        "react-native-paper", // Your design system
        /^react-native-paper\/.*/,
        "@babel/runtime",
        /^@babel\/runtime\/.*/,
        "@babel/runtime/helpers/objectSpread2",
        /^@babel\/runtime\/helpers\/objectSpread2\/.*/,
      ],
      optimizeDeps: {
        include: [
          "react-native-web",
          "react-native-safe-area-context",
          "react-native-paper", // Explicitly include your design system
          "@babel/runtime/helpers/objectSpread2",
        ],
        esbuildOptions: {
          loader: { ".js": "jsx", ".mjs": "jsx" },
          mainFields: ["module", "main"],
          resolveExtensions: [
            ".web.js",
            ".web.jsx",
            ".web.ts",
            ".web.tsx",
            ".mjs",
            ".js",
            ".ts",
            ".jsx",
            ".tsx",
            ".json",
          ],
        },
      },
    },
  },
});
