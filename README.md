# Flossworks website

Public marketing + legal website for the **Flossworks – Stitch & Track** Android app, published by **Flossworks Cross-Stitch LLC**.

Its primary job is to host the **privacy policy** required by the Google Play Console.

**Google Play privacy policy URL:** `https://flossworkscross-stitch.com/privacy`

## What's here

Plain static HTML/CSS — no build step, no framework, no dependencies. Easy for a human or an AI agent to edit.

```
index.html      Landing page (/)
privacy.html    Privacy Policy (/privacy)  ← the Play Console URL
support.html    Support / contact (/support)
terms.html      Terms of Use (/terms, optional)
404.html        Not-found page
styles.css      Shared styles (edit colors in the :root block at the top)
robots.txt      Crawler rules
sitemap.xml     Sitemap
```

> Clean URLs (`/privacy` instead of `/privacy.html`) work automatically on
> Cloudflare Pages — it serves `privacy.html` at the path `/privacy`.

## Editing

Open any `.html` file and edit the content. Shared look-and-feel lives in
`styles.css`. The header and footer are duplicated in each page (kept simple on
purpose — no templating). If you change a footer link, update it in every page.

The privacy policy contains an **HTML comment at the top** mapping the app's
behavior to the Google Play **Data Safety** form, plus a confirm-before-release
checklist. Read it before each app release.

## Local preview

No build needed. Either:

- Open `index.html` directly in a browser, **or**
- Serve the folder so clean URLs/links behave like production:

```sh
# Python (any OS with Python 3)
python -m http.server 8080
# then visit http://localhost:8080/

# or Node
npx serve .
```

## Hosting layout

This site is a standalone repo published to GitHub as
**`DranakCorps-bot/FlossworksMiniSite`** (the site files live at the repo root).
The Cross-Stitch Android app is NOT here — it has its own repo
(`DranakCorps-bot/FlossworksAndroidApp`, kept private). Cloudflare Pages
connects to `FlossworksMiniSite` and serves it from the root.

## Deploy — Cloudflare Pages

Day-to-day deploys are automatic: commit and push to `main` and Cloudflare
rebuilds in ~1 minute.

**Pages project settings:**
- Framework preset: **None**
- Root directory: **`/`** (repo root — the default)
- Build command: *(leave blank)*
- Build output directory: **`/`**

### First-time setup (dashboard)
1. Make sure this repo is pushed to `FlossworksMiniSite` (see below).
2. Cloudflare dashboard → **Workers & Pages → Create → Pages → Connect to Git**.
3. Select the **`FlossworksMiniSite`** repo. Set the build settings above.
   **Save and Deploy.**
4. Confirm the temporary `*.pages.dev` URL loads.
5. **Custom domains** → add `flossworkscross-stitch.com` and
   `www.flossworkscross-stitch.com`. Since DNS is already on Cloudflare,
   Pages will offer to create the records for you — approve them.

### Push to GitHub
From this folder (`CrossStitchPatternStudio/website/`):

```powershell
git remote add origin https://github.com/DranakCorps-bot/FlossworksMiniSite.git
git push -u origin main
```

## Notes / open items
- No "Get it on Google Play" badge yet — add it to `index.html` only after the
  Play listing is confirmed live.
- Support email used throughout: `support@flossworkscross-stitch.com`.
- Do not publish the company's physical address or a personal phone number.
