# Susan Rossman — Copywriter & Creative Director · Portfolio

A fast, dependency-free portfolio site built to show a broad range of copywriting
across media, with an About section, résumé and contact links. No build step, no
frameworks — just HTML, CSS and a little vanilla JavaScript, so it deploys
anywhere and stays easy to edit.

```
index.html          All page content (heavily commented — start here)
styles/style.css    Colours, type and layout (tokens at the top)
scripts/main.js     Mobile nav, work filtering, reading modal, scroll reveal
assets/             Your résumé PDF and portrait photo go here
```

## Making it yours

Everything you need to change is in **`index.html`**. Open it and search for
`PLACEHOLDER` — each one marks text to replace with your own words. In particular:

1. **Hero headline & lede** — the first writing anyone reads. Make it yours.
2. **About section** — your real story, in your voice (this section *is* a sample).
3. **Work samples** — replace the eight sample pieces with your own. Each piece is
   one `<article class="work-card">` block; copy the pattern to add more. The full
   sample that opens in the reading panel lives in the `<template>` inside each card.
   Keep the **Role / Brief / Result** framing — it's what people hiring you read for.
4. **Contact details** — email, LinkedIn and résumé links (search `RESUME LINK`).

### Filtering by medium

Each work card has a `data-category` attribute. It must match one of the filter
buttons: `campaign`, `web`, `email`, `social`, `editorial`, `script`, `product`,
`print`. Add or rename categories by editing both the filter buttons and the
cards' `data-category` values.

### Your résumé and photo

- Drop your résumé PDF in `assets/` and update the three résumé links in
  `index.html` (search `RESUME LINK`). The links currently point to
  `assets/susan-rossman-resume.pdf`.
- Add a square-ish photo at `assets/portrait.jpg`, then swap the initials block in
  the About section for an `<img>` (there's a note in the HTML).

### Colours & fonts

Open `styles/style.css`. The palette, fonts and spacing are defined as CSS
variables at the very top (`:root { … }`), with a matching dark-mode block right
below. Change a few values there to re-skin the whole site. Dark mode follows the
visitor's system setting automatically.

## Previewing locally

It's just static files, so you can open `index.html` directly — but a tiny local
server avoids browser quirks:

```bash
# Python 3
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Publishing it online

**GitHub Pages (free):**
1. Push this repository to GitHub.
2. Repo **Settings → Pages → Build and deployment**.
3. Source: *Deploy from a branch*. Branch: your default branch, folder `/ (root)`.
4. Save. Your site appears at `https://<username>.github.io/<repo>/` in a minute or two.

**Netlify / Vercel (free, custom domains):**
- Netlify: drag the project folder onto <https://app.netlify.com/drop>, or connect
  the repo. No build command; publish directory is the project root.
- Both let you add a custom domain like `susanrossman.com` in a few clicks.

## Accessibility & performance notes

- Semantic HTML, a skip link, keyboard-operable modal with focus trapping, and
  visible focus outlines.
- Respects `prefers-reduced-motion` and `prefers-color-scheme`.
- No tracking, no heavy dependencies — the only external request is Google Fonts,
  which you can remove for a fully self-contained site if you prefer.
