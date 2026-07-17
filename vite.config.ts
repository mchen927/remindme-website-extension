import { defineConfig } from "vite";
import { crx } from "@crxjs/vite-plugin";
import manifest from "./src/manifest.config";

// This is Vite's configuration file. Vite is the tool that turns our
// TypeScript source into the plain JavaScript that Chrome can run.
//
// The `crx(...)` plugin is the special piece: it teaches Vite about Chrome
// extensions. It reads our manifest, bundles each entry point (background,
// content script, popup) correctly, and even gives us live-reload while we
// develop. Without it, Vite would treat this like a normal website and the
// extension wouldn't work.
export default defineConfig({
  plugins: [crx({ manifest })],
});
