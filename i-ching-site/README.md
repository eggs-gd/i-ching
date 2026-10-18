# I Ching: Shape of Momentum

Static SvelteKit landing page for the I Ching: Shape of Momentum app.
Lives in the [i-ching](https://github.com/eggs-gd/i-ching) repository and is published
with the PWA to [iching.eggs.gd](https://iching.eggs.gd).

## Development

```sh
yarn install
yarn dev
```

## Checks

```sh
yarn run check
yarn build
```

## GitHub Pages

The app's `yarn build:pwa` copies the PWA into `static/pwa`. Pushing this folder
on `main` runs `.github/workflows/deploy.yml` at the repository root, which builds
this site and deploys it. The landing page is the domain root; the app is at `/pwa`.
