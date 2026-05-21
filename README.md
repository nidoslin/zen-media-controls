# Zen Media Controls

Firefox/Zen WebExtension that routes keyboard media keys (⏪/⏩) to YouTube.

| Press              | Action                           |
|--------------------|----------------------------------|
| ⏪ (previoustrack)  | Restart video from beginning     |
| ⏪⏪ (double)        | Previous video / Short           |
| ⏩ (nexttrack)      | Next video / Short               |

## Install

1. Set `xpinstall.signatures.required = false` in `about:config`
2. `about:addons` → gear icon → "Install Add-on From File..." → `dist/zen_extension_media_buttons.xpi`

## Build

```sh
python3 -m zipfile -c dist/zen_extension_media_buttons.xpi manifest.json content.js
```
