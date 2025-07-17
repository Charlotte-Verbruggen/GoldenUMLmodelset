# Golden UML Dataset Website

Built with [TypeScript](https://www.typescriptlang.org/) + [React](https://react.dev/) + [Vite](https://vite.dev/)

Component Library: [shadcn](https://ui.shadcn.com/) with [Tailwind](https://tailwindcss.com/)


## Requirements

- [yarn](https://yarnpkg.com/) package manager (latest version)
- [Node.js](https://nodejs.org/en) Version 18+ (recommended to use [nvm](https://github.com/nvm-sh/nvm) to easily manage Node versions)

## Build

All build scripts have to be executed from the `website/` directory. Navigate to the directory through:

```bash
cd website/
```

Then, install all the dependencies:

```bash
yarn install
```

To build the website, execute the following:

```
yarn run build
```

This will also run a prebuild script to create the `models.json` file and ZIP archives of the models in the dataset. After executing the script, all relevant artifacts of the website can be found in the `dist/` directory.

## Development

```
yarn run dev
```