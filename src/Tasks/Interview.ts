import { state } from '../state'
import { Terminal } from '../Terminal'
import { Task } from './Task'

export class Interview implements Task {
  public description = 'Answer those questions about your project'

  public async execute() {
    let projectName = ''

    do {
      projectName = await Terminal.askQuestion(
        "What's the name of your project?",
        'The name of your project must contain only letters and numbers'
      )
    } while (!projectName.match(/[a-zA-Z0-9-]+/g))

    state.projectName = projectName
    Terminal.logSuccess('The name of your project has been defined.')
  }
}
