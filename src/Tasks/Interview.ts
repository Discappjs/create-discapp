import { Terminal } from '../Terminal'
import { Task } from './Task'
import { state } from '../state'

export class Interview implements Task {
  public description = 'Answer those questions about your project'

  public async execute() {
    let projectName = ''

    do {
      projectName = await Terminal.askQuestion({
        title: "What's the name of your project?",
        description:
          'The name of your project must contain only letters and numbers',
      })
    } while (!projectName.match(/[a-zA-Z0-9-]+/g))

    state.projectName = projectName
    Terminal.logSuccess('The name of your project has been defined.')
  }
}
