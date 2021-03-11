# create-discapp

This repository contains the code for creating a Discapp project.

## Usage

```bash
yarn create discapp [projectName]
```

If `projectName` is not given we will ask you the name of the project.

### Using NPM

By default, create-discapp will use Yarn if it's installed. If you prefer NPM you can pass the `--use-npm` flag:

```bash
yarn create discapp --use-npm [projectName]
```

### Skipping unnecessary questions

You can pass the `--force` or `-f` flag if you want to always use the default option. For example:

```bash
yarn create discapp -f [projectName]
```

## About

This is a utilitary CLI for scaffolding a Discapp project with just one command.
