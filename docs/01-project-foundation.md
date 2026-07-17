# Part 1 — Project Foundation

**Goal:** get the *smallest possible* extension loading in Chrome and printing
"hello" from each world. No features yet — just proof that the plumbing works.

**Why start this way?** If a bare extension loads and logs correctly, the wiring
is sound and every future feature is just filling in a box. If we built features
first and it didn't load, we'd have ten suspects instead of zero.

---

## What we built

A folder that looks like this:

```
remindme-website-extension/
├── package.json          # project info + npm scripts + dependency list
├── tsconfig.json         # TypeScript compiler settings
├── vite.config.ts        # tells Vite to build a Chrome extension
├── .gitignore            # files we never commit (node_modules, dist)
├── src/
│   ├── manifest.config.ts    # THE manifest — Chrome's map of the extension
│   ├── background/index.ts   # service worker (the brain)
│   ├── content/index.ts      # content script (runs inside web pages)
│   └── ui/popup/
│       ├── index.html        # the toolbar popup's page
│       └── popup.ts          # the popup's script
└── docs/                 # this learning journal
```

---

## The toolchain, explained

We are NOT writing raw extension files by hand. We use two tools:

- **Vite** — a build tool. It takes our TypeScript source and turns it into the
  plain JavaScript a browser can run. It's fast and gives us live-reload.
- **`@crxjs/vite-plugin`** — a plugin that teaches Vite about Chrome extensions.
  It reads our manifest, bundles each entry point (background / content / popup)
  the special way extensions require, and generates the real `manifest.json`.

Install command we ran:

```bash
npm install -D vite typescript @types/chrome @crxjs/vite-plugin@latest
```

`-D` means "dev dependency" — tools needed to *build* the project, not shipped
inside the extension itself. `@types/chrome` gives TypeScript knowledge of the
`chrome.*` API so we get autocomplete and error-checking.

> **Real-world moment:** npm first installed a *beta* of the crx plugin and
> warned that a *stable* 2.0 exists. We upgraded with
> `npm install -D @crxjs/vite-plugin@latest` (landed on 2.7.1). Lesson: read the
> install warnings — they often tell you exactly what to fix.

---

## The manifest is the center of everything

`src/manifest.config.ts` is where Chrome learns which file runs in which world:

- `background.service_worker` → our brain (no UI, event-driven, killed when idle)
- `content_scripts` → code injected into every page (`matches: <all_urls>`)
- `action.default_popup` → the HTML shown when you click the toolbar icon
- `permissions` → `storage` (save rules) + `tabs` (know the current site)
- `host_permissions` → `<all_urls>` (allowed to run on any site, for now)

We write it in TypeScript via `defineManifest(...)` so typos become red squiggles
instead of a silently broken extension. At build time the plugin converts it into
a plain `dist/manifest.json`.

### What the build produced

Running `npm run build` generated `dist/manifest.json`. Notice how the plugin
**rewrote our file paths** to point at the compiled output — e.g. our
`src/content/index.ts` became a hashed file like `assets/index.ts-CwVmDuiz.js`,
and it added a `service-worker-loader.js` and a `web_accessible_resources` entry.
That rewriting is exactly the tedious work the crx plugin does for us.

---

## The three "hello" files

Each is intentionally almost empty — they only prove their world runs:

- **`background/index.ts`** logs `service worker is alive` and listens for
  `onInstalled` (fires once when installed/updated).
- **`content/index.ts`** logs `content script loaded on: <hostname>` — proving
  Chrome injects our code into real websites.
- **`popup/index.html` + `popup.ts`** — a styled 260px card whose script flips
  the text to `Popup is working 🎉`.

---

## Two ways to run it

- `npm run dev` — development mode with **live-reload**: edit a file and the
  extension updates automatically. Best while actively coding.
- `npm run build` — produces a clean `dist/` folder. Best for a stable load.

Either way, **you load the `dist/` folder into Chrome, never the source.**

## Loading into Chrome (do this once)

1. Go to `chrome://extensions`.
2. Turn on **Developer mode** (top-right toggle).
3. Click **Load unpacked** and choose the `dist/` folder.
4. The RemindMe icon appears in the toolbar.

### How to see each world's "hello"

- **Popup:** click the toolbar icon → you should see "Popup is working 🎉".
- **Content script:** open any website, then open DevTools (F12) → Console →
  you should see `[RemindMe] content script loaded on: ...`.
- **Service worker:** on `chrome://extensions`, find RemindMe and click the
  **"service worker"** link → a console opens showing `service worker is alive`.

---

## Mental model to keep

> The manifest assigns each file to a world. The worlds are isolated and talk by
> messages. The service worker forgets everything when idle, so durable data
> lives in `chrome.storage`. The content script is the only one that can draw on
> the page.

## Key terms

- **Manifest V3 (MV3):** the current required extension format.
- **Service worker:** background script with no UI; event-driven; ephemeral.
- **Content script:** JS injected into web pages; can touch the DOM.
- **Popup / options page:** normal HTML pages that make up the extension's UI.
- **`dist/`:** the compiled extension we actually load into Chrome.

## Next part

**Part 2 — Data & Storage:** define the `Rule` TypeScript type and a small typed
wrapper around `chrome.storage` so every world reads and writes rules the same
safe way.
