import chalk from 'chalk'

import { state } from '../state'
import { Task } from './Task'

export class Congrats implements Task {
  public description = 'Ready'

  public execute() {
    console.log(
      `✨ Your Discapp project has been created at ${chalk.cyan(
        state.projectName
      )}\n`
    )

    console.log('Get started by running:\n')
    console.log(`    ${chalk.blue(`cd ${state.projectName}`)}`)
    console.log(`    ${state.client} dev`)
  }
}
