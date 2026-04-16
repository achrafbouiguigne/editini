import { defineConfig, fontProviders } from "astro/config";

export default defineConfig({
  output: "static",
  compressHTML: true,
  build: {
    inlineStylesheets: "auto",
  },
  experimental: {
    fonts: [
    {
      name: "Bebas Neue",
      cssVariable: "--font-bebas",
      provider: fontProviders.google(),
      weights: [400],
      styles: ["normal"],
      subsets: ["latin"],
      fallbacks: ["Impact", "sans-serif"],
    },
    {
      name: "Syne",
      cssVariable: "--font-syne",
      provider: fontProviders.google(),
      weights: [400, 600, 700, 800],
      styles: ["normal"],
      subsets: ["latin"],
      fallbacks: ["system-ui", "sans-serif"],
    },
    {
      name: "DM Sans",
      cssVariable: "--font-dm-sans",
      provider: fontProviders.google(),
      weights: [300, 400, 500],
      styles: ["normal", "italic"],
      subsets: ["latin"],
      fallbacks: ["system-ui", "sans-serif"],
    },
    ],
  },
});
