import { defineManifest } from "@crxjs/vite-plugin";

// THE MANIFEST — the single most important file in any extension.
// Chrome reads this to understand what our extension is and, crucially,
// WHICH FILE runs in WHICH of the isolated "worlds" we talked about.
//
// We write it in TypeScript (instead of a plain manifest.json) so that
// `defineManifest` gives us autocomplete and catches typos. The crx plugin
// converts this into a real manifest.json at build time.
export default defineManifest({
  // Must be 3. Manifest V2 is retired; Chrome only accepts V3 now.
  manifest_version: 3,

  name: "RemindMe",
  version: "0.1.0",
  description:
    "Sticky-note reminders and nudges that appear on the websites you choose.",

  // PERMISSIONS — capabilities we're asking Chrome for.
  //   storage → save the user's rules on their machine
  //   tabs    → find out which website the user is currently on
  permissions: ["storage", "tabs"],

  // HOST PERMISSIONS — which websites we're allowed to run on.
  // "<all_urls>" means every site. That's fine while developing; before a
  // public release we'd narrow this so users see a friendlier permission prompt.
  host_permissions: ["<all_urls>"],

  // THE SERVICE WORKER — our "brain." No UI. Chrome starts it in response to
  // events and shuts it down when idle. `type: "module"` lets us use modern
  // `import` syntax inside it.
  background: {
    service_worker: "src/background/index.ts",
    type: "module",
  },

  // CONTENT SCRIPTS — code injected INTO web pages. This is the only world
  // that can touch the page's DOM, so our on-screen widget will live here.
  //   matches   → inject into every page
  //   run_at    → wait until the page has finished loading before injecting
  content_scripts: [
    {
      matches: ["<all_urls>"],
      js: ["src/content/index.ts"],
      run_at: "document_idle",
    },
  ],

  // THE TOOLBAR POPUP — the little window shown when the user clicks our icon.
  // It's just an HTML page.
  action: {
    default_popup: "src/ui/popup/index.html",
  },
});
