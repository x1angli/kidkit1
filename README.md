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
