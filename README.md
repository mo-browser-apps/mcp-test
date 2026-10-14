# Desktop

A desktop application built with MōBrowser and Vanilla TypeScript.

Enter a name and choose Greet to call the application's main process. Use the Light, System, and Dark controls to change the appearance.

## Development

Use Node.js 24.14.1 or later.

```sh
npm ci
npm run dev
```

```sh
npm run gen
npm run typecheck
npm run test:e2e
npm run build
npm run pack
```

The interface and IPC definitions live in `src/renderer`. Window setup and service handlers live in `src/main/index.ts`. Set the app identity and packaging options in `mobrowser.conf.json`; icons are in `assets/`.

Build and package on the target operating system. The configuration includes macOS, Windows, and Linux. Local packaging is unsigned; configure signing in `mobrowser.conf.json` when distributing the app.

Built with MōBrowser 2.18.0. See the [getting-started guide](https://teamdev.com/mobrowser/docs/quickstart/) and [MōBrowser documentation](https://teamdev.com/mobrowser/docs/) for development and packaging.
