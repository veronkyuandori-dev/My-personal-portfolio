---
name: WebGL preview fallback
description: The hosted preview sandbox may not expose a WebGL context even when Three.js is installed.
---

The portfolio background must keep a scroll-reactive CSS fallback when WebGL is unavailable in the preview environment.

**Why:** The preview browser can fail to create a WebGL context, which would otherwise leave the wallpaper static or blank.

**How to apply:** Probe WebGL before creating a Three.js renderer and keep the fallback image animated with the same scroll and section-profile values.