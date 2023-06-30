This is the template code using [`hygen`](https://www.hygen.io/) for new data sources.

It generates:

- UI component in `components` folder
- importer code in `importers` folder, where the core logic/types/constants of importer lives
- mediator code in `mediators` folder, the mediator between importer and UI component

## Prerequisite

Run `yarn install` to install `hygen`

## How to use

To add a new data source, run

```shell
yarn hygen ds new
```

It will prompt for you to fill out the name of data source

```shell
What's name of data source?
```

Or you can pass data source name as a param, like this

```shell
yarn hygen ds new --name "google travel"
```

You can also generate part of the templates by doing:

```
yarn hygen ds new:mediator
```
