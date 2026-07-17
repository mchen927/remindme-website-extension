# RemindMe — Learning Journal

This folder is the written record of how we're building **RemindMe**, a Chrome
extension that shows sticky-note reminders and nudges on the websites you choose.

Each numbered doc covers one "part" of the build. Read them in order; each one
explains not just *what* we did but *why*, so you can rebuild the understanding
later, not just the code.

## The big idea

Every reminder is a **Rule** with three pieces:

1. **Trigger** — when do I fire? (you visit a matching website)
2. **Action** — what do I do? (show a widget, block the page, play a sound…)
3. **State** — runtime memory (last shown, snoozed until…)

Build the rule engine once, and every feature is just a new kind of action.

## The four "worlds" of an extension

An extension is several isolated programs that talk by **message-passing**:

| World | File | Can it touch the web page? | Job |
|-------|------|----------------------------|-----|
| Service worker | `src/background/` | ❌ | The brain: watch navigation, match rules |
| Content script | `src/content/` | ✅ | Draw the widget on the page |
| Popup | `src/ui/popup/` | (its own page) | Quick "add reminder for this site" |
| Options/dashboard | `src/ui/options/` | (its own page) | Manage all rules |

## Table of contents

- [00 — Fundamentals](./00-fundamentals.md) — npm, versions, building, `dist/`, the manifest, and how to read the code
- [01 — Project Foundation](./01-project-foundation.md) — scaffolding that loads in Chrome ✅

## How to run the project

```bash
npm install     # once, to get the build tools
npm run dev     # develop with live-reload  → loads from dist/
npm run build   # produce a clean dist/ for loading into Chrome
```

Then in Chrome: `chrome://extensions` → enable **Developer mode** → **Load
unpacked** → select the `dist/` folder.
