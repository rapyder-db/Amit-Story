# Rapyder Cloud Quest

A static 3-level browser platform story game for Rapyder, CloudEVA, OneLenz, and the public founder-led Amit Gupta narrative arc.

## Run Locally

Open `index.html` in a browser.

## GitHub Pages Deployment

This project is static and does not require a build step.

Recommended deployment structure:

```text
rapyder-cloud-quest-game/
  .nojekyll
  index.html
  src/
  mascot/
  docs/
  tools/
```

GitHub Pages options:

1. Put these files at the root of a repository and enable Pages from the `main` branch root.
2. Or put this folder inside a repository and publish it from a GitHub Pages-compatible branch/folder after preserving this folder structure.

The game uses relative paths such as `./src/hero/Rapyder_Run.png`, so `index.html` must stay beside `src/`, `mascot/`, and `docs/`.

## Notes

- No server is required.
- No API keys are required.
- All gameplay assets are local PNG, CSS, and JavaScript files.
- OneLenz hero assets use URL-safe filenames such as `OneLenz_Run.png`.
