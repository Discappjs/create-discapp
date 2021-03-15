#!/usr/bin/env node
import { Command } from 'commander'

import packageJson from '../package.json'
import { state } from './state'
import { logError, logStep } from './Terminal'
import {
  Interview,
  CloneProject,
  InstallDependencies,
  PostInstall,
  Congrats,
  Task,
} from './Tasks'

const program = new Command()

program
  .version(packageJson.version)
  .arguments('[directory]')
  .option('--use-npm', 'Forces usage of NPM instead of Yarn')
  .option('-f, --force', 'Always use the default options when avaible')
  .description('Creates a Discapp project')
  .action((directory, options) => {
    console.log(options)

    if (options.useNpm) {
      state.client = 'npm!'
    }

    if (options.force) {
      state.force = true
    }

    state.projectName = directory
  })
  .parse(process.argv)

/**
 * If project name is not defined, then we should ask
 * the project name
 */
if (state.projectName === undefined) {
  state.shouldAskProjectName = true
}

/**
 * Tasks to execute
 */
const tasks: { new (): Task }[] = [
  Interview,
  CloneProject,
  InstallDependencies,
  PostInstall,
  Congrats,
]

/**
 * Executes the tasks and exits
 */
export async function executeTaks() {
  let i = 1

  for (const Task of tasks) {
    try {
      const task = new Task()

      logStep(i++, tasks.length, task.description)
      await task.execute()
      console.log('\n')
    } catch (error) {
      logError('An error has happened while trying to scaffold your project.')
      console.error(error)
      process.exit(1)
    }
  }

  process.exit(0)
}

executeTaks()
