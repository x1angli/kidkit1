# 加法小花园

A dependency-free, installable progressive web app for practicing all 25 combinations of operands 1–5 (answers 2–10).

Run `npm start`, then open http://127.0.0.1:4173. Tap 开始 to start Mandarin readings. Each equation is read twice before moving to the next cell, looping after 5+5. Select any cell, pause, step backward/forward, replay, or change the reading speed under 设置.

Speech supports Mandarin and English. Settings offers language and voice selection, preferring natural/neural voices when the device exposes them. Pitch stays at its natural value (1.0); slow, normal, and fast rates are 0.9, 1.12, and 1.3. Equations are spoken as continuous sentences without pauses between words. This is not a recorded child voice. Voice quality and offline availability depend on installed system voices. Add a Mandarin voice in your device settings if needed. Playback pauses when the page is hidden.

Deploy the `dist` directory to any HTTPS static host. In Chrome/Edge, use the installation button when offered, or the browser install menu. On iPhone/iPad, open in Safari and choose Share → Add to Home Screen. The interface works offline after the first successful service worker installation; speech may still require a network connection depending on the voice.

`npm run check` checks JavaScript syntax. The application has no external scripts, fonts, analytics, or account requirements in its source. Sites hosting adds its own private access layer.
