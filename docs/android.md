# Cloud Cram Android (Capacitor, Option A)

Sideload a signed APK on your phone. Quiz assets are **bundled in the APK** (no `server.url`, no hosted WebView). The Netlify/GitHub PWA is unchanged for browser users.

## Decision (#110)

- **Option A:** bundle web assets → ship a new signed APK for each update (same keystore, higher `versionCode`).
- **Not used:** `server.url`, hybrid remote shell, or loading https://cloudcramquizzes.netlify.app in the WebView.
- **Origin:** `https://localhost` (pinned in `native/capacitor.config.json`). **Do not change** `androidScheme` or `hostname` without Export → Import (#109); a new origin wipes WebView storage.

## Toolchain (one-time)

1. **Node.js** 22+ (required by `@capacitor/cli` 8.6.x; 22 LTS recommended).
2. **JDK 21** — [Adoptium Temurin 21](https://adoptium.net/). Set `JAVA_HOME` to the JDK install.
3. **Android Studio** — latest stable with **Android SDK** (API 35 recommended; min SDK follows Capacitor defaults).
4. In Studio: **Settings → Languages & Frameworks → Android SDK** — install **Android SDK Platform** and **Android SDK Build-Tools**.

## Project layout

| Path | Purpose |
|------|---------|
| `native/package.json` | Capacitor 8.x CLI and plugins (lockfile committed) |
| `native/capacitor.config.json` | `webDir: www`, bundled origin, no `server.url` |
| `native/scripts/sync-www.js` | Copies runtime assets from repo root → `native/www/` |
| `native/android/` | Android Studio project |
| `native/www/` | Generated copy (gitignored) |

`applicationId` is **`com.earthboundtrev.cloudcram`** — keep this stable forever.

## Build steps (every APK)

1. From repo root, install web dependencies are not required (static site).
2. `cd native`
3. `npm install` (first time and after dependency bumps)
4. `npm run sync:www` — refreshes `www/` from root and updates `build-meta.js` from `sw.js` `CACHE_NAME`
5. `npx cap sync android`
6. `npx cap open android` — opens Android Studio on `native/android`

### Release APK in Studio

7. **Build → Generate Signed App Bundle / APK → APK**
8. Choose **release**, select your **existing keystore** (never commit `.jks` / passwords to the repo)
9. Success looks like: Studio shows the path to `app-release.apk` under `native/android/app/release/` (exact folder shown in the dialog).

### Version bumps (each publish)

| Where | What |
|-------|------|
| `native/android/app/build.gradle` | `versionCode` (integer, must increase every update) and `versionName` (e.g. `1.0.1`) |
| `native-app.js` | `NATIVE_APP_VERSION` (display string, keep aligned with `versionName`) |
| Root `sw.js` | Bump `CACHE_NAME` **only when** a precached web asset changes |

**Same keystore every time.** Android refuses over-the-air sideload updates if the signing certificate changes (`INSTALL_FAILED_UPDATE_INCOMPATIBLE`). Losing the keystore means uninstall + reinstall, which **wipes** on-device progress unless you **Export** first (#109).

### Optional checksum (official distribution)

Publish SHA-256 of the APK and the signing-cert SHA-256 next to GitHub Release assets. Distribute only over HTTPS.

## Sideload on your phone

1. Copy `app-release.apk` to the phone (USB, Files, or secure download).
2. Open the APK with **Files** or **Chrome**.
3. If prompted, allow **Install unknown apps** for that app (**Settings → Apps → Special access → Install unknown apps**). *Take a screenshot when you enable this — it is easy to forget which app needs permission.*
4. Tap **Install**. If Play Protect warns, only proceed with **Install anyway** when you trust the file you built.
5. Launch **Cloud Cram**. First launch may show a dismissible **Import progress** card (PWA → app migration).

## If it fails

| Symptom | Fix |
|---------|-----|
| Unsigned / debug-only APK | Use **Generate Signed App Bundle / APK** with your release keystore, not an unsigned artifact |
| **App not installed** / `INSTALL_FAILED_UPDATE_INCOMPATIBLE` | Wrong signing key; use the same keystore as the installed app, or Export → uninstall → install fresh |
| Play Protect blocks install | Only install builds you made; use **Install anyway** if you verified the APK checksum |

## Updates (Option A)

1. Change web assets or native code as needed; bump `versionCode` / `versionName`.
2. Re-run sync → `cap sync` → signed release APK.
3. Sideload over the existing app (same key). Progress in WebView storage is kept. Service worker is **not** used in the native WebView, so new bundles are not masked by an old SW cache.

## Keystore hygiene

- **Back up the keystore** and passwords in your password manager. Loss = cannot update in place.
- Never put keystore files, `keystore.properties`, or passwords in git, issues, or CI logs. `.gitignore` blocks common patterns; optional `gitleaks` workflow can scan PRs.

## WebView storage / debugging

- App storage is separate from Chrome on the same phone.
- To inspect: USB debugging on, `chrome://inspect` → look for WebView at `https://localhost`.

## PWA vs Android UI

- In the Android app, **Update app** (service worker) is hidden — sideload a new APK to update bundled code.
- Settings shows **App {versionName} · {CACHE_NAME}** (e.g. `App 1.0.0 · cloudcram-v49`).
- **Delete all my data** still clears local storage, IndexedDB, and caches (export first if needed).

## Export / import in WebView

Settings → **Your data** → Export / Import. Export uses the system share sheet (`@capacitor/share` / `@capacitor/filesystem`). Import uses the system file picker (no extra storage permission).

## CI

Full `lint.yml` runs on every PR. An optional non-blocking `assembleDebug` workflow may run on `native/**` changes; it is **not** required to merge.