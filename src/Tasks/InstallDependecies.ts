import path from 'path'
import execa from 'execa'
import ora from 'ora'
import Inquirer from 'inquirer'

import { logSuccess, logError } from '../Terminal'
import { Task } from './Task'
import { state } from '../state'

export class InstallDependencies implements Task {
  public description = 'Install the dependencies'

  private async shouldUseYarn() {
    try {
      await execa('yarnpkg', ['--version'])
      return true
    } catch (error) {
      return false
    }
  }

  public async execute() {
    let shouldInstall = true

    if (!state.force) {
      const answers = await Inquirer.prompt([
        {
          type: 'confirm',
          name: 'shouldInstall',
          message: 'Install the project dependencies?',
          default: true,
        },
      ])

      shouldInstall = answers.shouldInstall
    }

    if (shouldInstall) {
      state.client = this.shouldUseYarn() ? 'yarn' : 'npm'

      try {
        const loading = ora('Installing dependencies').start()

        await execa(state.client, ['install'], {
          cwd: path.join(process.cwd(), state.projectName),
        })

        loading.stop()

        logSuccess('The dependencies has has been successfully installed.')
      } catch (error) {
        logError(
          'An error has happened while trying to install your dependencies.'
        )
        console.error(error.message)
      }
    } else {
      logSuccess('You choose not to install the dependencies.')
    }
  }
}
