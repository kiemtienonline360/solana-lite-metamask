# solana-lite-metamask
A MetaMask Browser Extension on Solana blockchain network to make it easier for users to use the Solana blockchain.
It is also a crypto wallet & gateway to blockchain apps.

We're in the early stages of the modification now, with more work to do and more effort to do.

# The new projects using for this project
 - solana-query: https://github.com/kiemtienonline360/solana-query
 - solana-block-tracker: https://github.com/kiemtienonline360/solana-block-tracker
 - solana-keyring-controller: https://github.com/kiemtienonline360/solana-keyring-controller

# What we done
 - Support import/export accounts
 - Support create new accounts

https://youtu.be/3JYjvMO17kg

# What we next
...

## Building locally

- Install [Node.js](https://nodejs.org) version 10
- Install [Yarn](https://yarnpkg.com/en/docs/install)
- Install dependencies: `yarn`
- Copy the `.metamaskrc.dist` file to `.metamaskrc`
- Build the project to the `./dist/` folder with `yarn dist`.
- Optionally, to start a development build (e.g. with logging and file watching) run `yarn start` instead.
    - To start the [React DevTools](https://github.com/facebook/react-devtools) and [Redux DevTools Extension](http://extension.remotedev.io)
      alongside the app, use `yarn start:dev`.
      - React DevTools will open in a separate window; no browser extension is required
      - Redux DevTools will need to be installed as a browser extension. Open the Redux Remote Devtools to access Redux state logs. This can be done by either right clicking within the web browser to bring up the context menu, expanding the Redux DevTools panel and clicking Open Remote DevTools OR clicking the Redux DevTools extension icon and clicking Open Remote DevTools.
        - You will also need to check the "Use custom (local) server" checkbox in the Remote DevTools Settings, using the default server configuration (host `localhost`, port `8000`, secure connection checkbox unchecked)

Uncompressed builds can be found in `/dist`, compressed builds can be found in `/builds` once they're built.

## Contributing

### Running Tests

Run tests with `yarn test`.

You can also test with a continuously watching process, via `yarn watch`.

You can run the linter by itself with `yarn lint`.

## Architecture

[![Architecture Diagram](./docs/architecture.png)][1]

## Development

```bash
yarn
yarn start
```

## Build for Publishing

```bash
yarn dist
```
