# AGENTS.md

Firefox/Zen browser WebExtension (MV2) that intercepts keyboard media keys to control YouTube videos.

## Structure

| File | Purpose |
|---|---|
| `manifest.json` | MV2 extension manifest; content script on `*.youtube.com/*` |
| `content.js` | All logic: Media Session API handlers + YouTube DOM control |

## Behavior

| Key | Action |
|---|---|
| `⏪` (previoustrack) once | Restart video from `currentTime = 0` |
| `⏪` twice within 800ms | Click YouTube's previous video button (or `#navigation-button-up button` on Shorts) |
| `⏩` (nexttrack) once | Click YouTube's next video button (or `#navigation-button-down button` on Shorts) |

## Key architecture

- No background scripts, no popup UI, no extra permissions beyond host matches.
- Uses `navigator.mediaSession.setActionHandler` — Firefox's supported path for hardware media keys. The `commands` manifest key with `MediaPrevTrack`/`MediaNextTrack` is **not supported in Firefox**; do not attempt that approach.
- Content script re-registers handlers on YouTube SPA navigation (MutationObserver on `<title>`) and on `<video>` `play` events.
- Double-press detection: counter + 800ms timer in the `previoustrack` handler.

## Install for testing

```
about:debugging#/runtime/this-firefox → Load Temporary Add-on → select manifest.json
```

## No toolchain

Pure vanilla JS — no build step, no linter, no test framework. Edit the two files directly.
