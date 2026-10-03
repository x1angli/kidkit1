# KidKit · 加法小花园

A colorful, installable addition practice app for children. Practice all 25 combinations of numbers 1–5 with Mandarin or English readings, playback controls, and offline support.

## Run locally

```sh
cd little-addition
npm start
```

Open http://127.0.0.1:4173.

## Validate

```sh
cd little-addition
npm run check
node check-behavior.cjs
```

## Install or host

The `little-addition/dist` folder contains the complete static app. The `little-addition-pwa.zip` archive contains the same deployable files. Serve the app over HTTPS to enable installation and offline caching.

## Live app

https://x1angli.github.io/kidkit1/

On Android, open in Chrome and choose Install app. On iPhone or iPad, open in Safari, choose Share, then Add to Home Screen. After the first online visit, the interface works offline. Speech availability offline depends on the installed device voices.

Pushes to master automatically validate and deploy little-addition/dist through GitHub Pages.

