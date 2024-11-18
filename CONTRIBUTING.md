# Contributing

The following documentation is only for the maintainers of this repository.

- [Monorepo setup](#monorepo-setup)
- [Project overview](#project-overview)
- [Installation](#installation)
- [Develop the lib](#develop-the-lib)
- [Release the lib](#release-the-lib)
- [Available commands](#commands)
- [CI](#ci)

## Monorepo setup

This repository is managed as a monorepo with [PNPM workspace](https://pnpm.io/workspaces) to handle the installation of the npm dependencies and manage the packages interdependencies.

It's important to note that PNPM workspace doesn't hoist the npm dependencies at the root of the workspace as most package manager does. Instead, it uses an advanced [symlinked node_modules structure](https://pnpm.io/symlinked-node-modules-structure). This means that you'll find a `node_modules` directory inside the packages folders as well as at the root of the repository.

The main difference to account for is that the `devDependencies` must now be installed locally in every package `package.json` file rather than in the root `package.json` file.

## Project overview

This project is split into two major sections, [packages/](packages/) and [samples/](samples/).

### Lib

Under [lib/](lib/) is the actual library.

### Sample

Under [sample/](sample/) is the sample application to test the library.

## Installation

This project uses PNPM, therefore, you must install [PNPM](https://pnpm.io/installation) v9+ first:

```bash
npm install -g pnpm
```

To install the library project, open a terminal at the root of the workspace and execute the following command:

```bash
pnpm install
```

### Setup Retype

[Retype](https://retype.com/) is the documentation platform that Squide is using for its documentation. As this project is leveraging a few [Pro features](https://retype.com/pro/) of Retype.

Everything should work fine as-is but there are a few limitations to use Retype Pro features without a wallet with a licence. If you want to circumvent these limitations, you can optionally, setup your [Retype wallet](https://retype.com/guides/cli/#retype-wallet).

To do so, first make sure that you retrieve the Retype license from your Vault (or ask IT).

Then, open a terminal at the root of the workspace and execute the following command:

```bash
npx retype wallet --add <your-license-key-here>
```

## Develop the library

We recommend opening two [VSCode terminals](https://code.visualstudio.com/docs/terminal/basics#_managing-multiple-terminals) to develop the library.

With the first terminal, execute the following script:

```bash
pnpm dev
```

With the second terminal, start the sample application with the following script:

```bash
pnpm dev-sample
```

You can then open your favorite browser and navigate to `http://localhost:8080/` to get a live preview of your code.

## Release the library

When you are ready to release the library, you must follow the following steps:
1. Run `pnpm changeset` and follow the prompt. For versioning, always follow the [SemVer standard](https://semver.org/).
2. Commit the newly generated file in your branch and submit a new Pull Request (PR). Changesets will automatically detect the changes and post a message in your pull request telling you that once the PR closes, the versions will be released.
3. Find someone to review your PR.
4. Merge the Pull request into `main`. A GitHub action will automatically trigger and update the version of the packages and publish them to [npm](https://www.npmjs.com/). A tag will also be created on GitHub tagging your PR merge commit.

### Troubleshooting

#### Github

Make sure you're Git is clean (No pending changes).

#### NPM

Make sure GitHub Action has **write access** to the selected npm packages.

#### Compilation

If the library failed to compile, it's easier to debug without executing the full release flow every time. To do so, instead, execute the following command:

```bash
pnpm build
```

By default, library compilation output will be in it's respective *dist* directory.

#### Linting errors

If you got linting error, most of the time, they can be fixed automatically using `eslint . --fix`, if not, follow the report provided by `pnpm lint`.

## Commands

From the project root, you have access to many commands. The most important ones are:

### dev

Build the shell packages for development and start the watch processes.

```bash
pnpm dev
```

### dev-sample

Build the sample application for development and start the dev servers.

```bash
pnpm dev-sample
```

### dev-docs

Build the [Retype](https://retype.com/) documentation for development and start the Retype dev server. If you are experiencing issue with the license, refer to the [setup Retype section](#setup-retype).

```bash
pnpm dev-docs
```

### build

Build the library for release.

```bash
pnpm build
```

### build-sample

Build the sample application for release.

```bash
pnpm build-basic
```

### serve-sample

Build the sample application for deployment and start a local web server to serve the application.

```bash
pnpm serve-basic
```

### test

Run the unit tests.

```bash
pnpm test
```

### lint

Lint the files.

```bash
pnpm lint
```

### changeset

To use when you want to publish a new version of the library. Will display a prompt to fill in the information about your new release.

```bash
pnpm changeset
```

### clean

Clean the library and the sample application (delete `dist` folder, clear caches, etc..)

```bash
pnpm clean
```

### reset

Reset the monorepo installation (delete `dist` folders, clear caches, delete `node_modules` folders, etc..)

```bash
pnpm reset
```

### list-outdated-deps

Checks for outdated dependencies. For more information, view [PNPM documentation](https://pnpm.io/cli/outdated).

```bash
pnpm list-outdated-deps
```

### update-outdated-deps

Update outdated dependencies to their latest version. For more information, view [PNPM documentation](https://pnpm.io/cli/update).

```bash
pnpm update-outdated-deps
```

## CI

We use [GitHub Actions](https://github.com/features/actions) for this repository.

You can find the configuration in the [.github/workflows](.github/workflows/) folder and the build results are available [here](https://github.com/gsoft-inc/wl-squide/actions).

We currently have 3 builds configured:

### Changesets

This action runs on a push on the `main` branch. If there is a file present in the `.changeset` folder, it will publish the new package version on npm.

### CI

This action will trigger when a commit is done in a PR to `main` or after a push to `main` and will run `build`, `lint-ci` and `test` commands on the source code.

### Retype

This action will trigger when a commit is done in a PR to `main` or after a push to `main`. The action will generate the documentation website into the `retype` branch. This repository [Github Pages](https://github.com/gsoft-inc/wl-web-configs/settings/pages) is configured to automatically deploy the website from the `retype` branch.

If you are having issue with the Retype license, make sure the `RETYPE_API_KEY` Github secret contains a valid Retype license.