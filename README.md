# dsh-web-mobile

A [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness) plugin that adapts the Web GUI for mobile. On narrow screens (≤768px) the settings dialog becomes a full-screen sheet and the details panel opens as a full-screen drawer; on desktop (>768px) everything stays exactly as before. Pure client plugin.

[![Release v0.1.0](https://img.shields.io/badge/release-v0.1.0-5B4CF0?style=flat-square)](package.json)
[![License: MIT](https://img.shields.io/badge/license-MIT-0B7285?style=flat-square)](LICENSE)
[![DSH](https://img.shields.io/badge/DSH-Web%20Profile-5B4CF0?style=flat-square)](cordis.patch.yml)

## Features

- **Full-screen settings** — the official 800px two-column dialog becomes a full-screen sheet (no radius, no margins), `100dvh` adapts to the address bar, `env(safe-area-inset-*)` clears the notch; the left nav rail becomes a horizontal top bar.
- **Details drawer** — the layout forces the details column to 0px on narrow screens (the built-in `openDetails()` never shows it); this plugin toggles it as a full-screen drawer via a floating button (⋯) with a ✕ close.
- **No iOS input zoom** — `input/textarea/select` font-size ≥ 16px.
- **Desktop unchanged** — every rule is scoped to `@media (max-width: 768px)`.

## Install

GitHub:

```sh
dsh plugin --profile web add github:openslow/dsh-web-mobile
```

npm:

```sh
dsh plugin --profile web add @openslow/dsh-web-mobile
```

Local dev: `dsh plugin --profile web add link:/path/to/dsh-web-mobile`

The repo ships built artifacts (`lib/`), so the GitHub install needs no build step. Restart `dsh web` after installing.

## Build

```sh
pnpm install
pnpm build
```

`lib/` is committed alongside source; rebuild and commit after changing source.

## Verify

- `pnpm verify` type-checks; `dsh --profile web --dump-config` should show the plugin layer.
- Mobile (≤768px): settings full-screen, nav bar horizontal, details drawer opens/closes.
- Desktop (>768px): identical to uninstalled.

## Compatibility

Requires `:has()` (Chromium 105+); animations are disabled under `prefers-reduced-motion: reduce`.

## License

[MIT](LICENSE)

---

中文说明见 [README.zh-CN.md](README.zh-CN.md)。
