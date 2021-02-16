import path from 'path'
import execa from 'execa'

import { Terminal } from '../Terminal'
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
    const shouldInstall = await Terminal.askQuestion(
      'You want us to install your dependencies? [Y/n]',
      'Whether we should install your dependencies. We will preferentially install with Yarn, if available.',
      'y'
    )

    if (shouldInstall.toLowerCase().startsWith('y')) {
      state.client = this.shouldUseYarn() ? 'yarn' : 'npm'

      try {
        await execa(state.client, ['install'], {
          cwd: path.join(process.cwd(), state.projectName),
        })
        Terminal.logSuccess(
          'The dependencies has has been successfully installed.'
        )
      } catch (error) {
        Terminal.logError(
          'An error has happened while trying to install your dependencies.'
        )
        console.error(error.message)
      }
    } else {
      Terminal.logSuccess('You choose not to install the dependencies.')
    }
  }
}
