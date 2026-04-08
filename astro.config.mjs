import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import { defineConfig, fontProviders } from "astro/config";
import remarkGfm from "remark-gfm";
import remarkSmartypants from "remark-smartypants";
import { remarkReadingTime } from "./plugins/remark-reading-time.ts";
import { config } from "./src/config";

export default defineConfig({
  site: config.siteUrl,
  base: config.baseUrl,
  trailingSlash: "never",
  output: "static",
  fonts: [
    {
      provider: fontProviders.fontsource(),
      name: "Oswald",
      cssVariable: "--font-oswald",
    },
    {
      provider: fontProviders.fontsource(),
      name: "Work Sans",
      cssVariable: "--font-work-sans",
    },
    {
      provider: fontProviders.fontsource(),
      name: "JetBrains Mono",
      cssVariable: "--font-jetbrains-mono",
    },
  ],
  experimental: {
    rustCompiler: true,
  },
  prefetch: {
    defaultStrategy: "hover",
  },
  build: {
    assetsInlineLimit: 4096,
    cacheDir: "./.astro-cache",
    rollupOptions: {
      output: {
        crossOrigin: "anonymous",
      },
    },
  },
  integrations: [mdx(), sitemap()],
  markdown: {
    remarkPlugins: [remarkReadingTime, remarkGfm, remarkSmartypants],
  },
});
