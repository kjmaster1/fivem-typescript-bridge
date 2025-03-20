# fivem-typescript-bridge

A boilerplate for creating FiveM resources with TypeScript that comes with a bridge and functions for multiple common frameworks. Built on top of the Overextended boilerplate found [here](https://github.com/overextended/fivem-typescript-boilerplate)

## Getting Started

### Node.js v18+

Install any LTS release of [`Node.js`](https://nodejs.org/) from v18.

### pnpm

Install the [`pnpm`](https://pnpm.io/installation) package manager globally.

```
npm install -g pnpm
```

### Setup

Initialise your own repository by using one of the options below.

- [Create a new repository](https://github.com/new?template_name=fivem-typescript-bridge&template_owner=kjmaster1) using this template.
- [Download](https://github.com/kjmaster1/fivem-typescript-bridge/archive/refs/heads/main.zip) the template directly.
- Use the [GitHub CLI](https://cli.github.com/).
  - `gh repo create <name> --template=kjmaster1/fivem-typescript-bridge`

Navigate to your new directory and execute the following command to install dependencies.

```
pnpm install
```

## Development

Use `pnpm watch` to actively rebuild modified files while developing the resource.

During web development, use `pnpm web:dev` to start vite's webserver and watch for changes.

## Build

Use `pnpm build` to build all project files in production mode.

To build and create GitHub releases, tag your commit (e.g. `v1.0.0`) and push it.

## Layout

- [/dist/](dist)
  - Compiled project files.
- [/locales/](locales)
  - JSON files used for translations with [ox_lib](https://overextended.dev/ox_lib/Modules/Locale/Shared).
- [/scripts/](scripts)
  - Scripts used in the development process, but not part of the compiled resource.
- [/src/](src)
  - Project source code.
- [/static/](static)
  - Files to include with the resource that aren't compiled or loaded (e.g. config).
