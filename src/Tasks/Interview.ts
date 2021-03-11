import Inquirer from 'inquirer'

import { Task } from './Task'
import { state } from '../state'

export class Interview implements Task {
  public description = 'Answer those questions about your project'

  public async execute() {
    if (state.shouldAskProjectName) {
      const { projectName } = await Inquirer.prompt([
        {
          type: 'input',
          name: 'projectName',
          message:
            "What's the name of your project? (letters, numbers only and '-')",
          validate: async (value) => {
            const pass = value.match(/^[a-zA-Z0-9-]{1,}$/i)
            if (pass) {
              return true
            }

            return "Your project name should contain only letters, numbers or '-'"
          },
        },
      ])

      console.log('Skipping')
      state.projectName = projectName
      state.shouldAskProjectName = false
    }
  }
}
