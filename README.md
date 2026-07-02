# Made By Hxvac

One-page Next.js website for the Made By Hxvac content editing business.

## Tech

- Next.js
- Tailwind CSS
- Framer Motion
- Static export friendly for GitHub Pages

## Run Locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Build

```bash
npm run build
```

The static site exports to `out/`.

## GitHub Pages

For a user or organization site, build normally:

```bash
npm run build
```

For a project page hosted under a repository path, set the base path before building:

```bash
NEXT_PUBLIC_BASE_PATH=/your-repo-name npm run build
```

Then deploy the generated `out/` folder with GitHub Pages, GitHub Actions, or a Pages deploy action.

The `npm run deploy` script currently runs the static build so you can connect it to your preferred GitHub Pages workflow.

## Content

- The logo and currency marks are rendered in code so the GitHub Pages build does not require binary image uploads.
- Featured work uses embedded YouTube Shorts in `app/page.tsx`.
- The three current Shorts are:
  - `https://www.youtube.com/shorts/BzlSTymTo6k`
  - `https://www.youtube.com/shorts/F5gVRL4hT24`
  - `https://www.youtube.com/shorts/GHWY8XjprR0`
