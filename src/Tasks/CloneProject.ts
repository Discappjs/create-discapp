import degit from 'degit'

import { Task } from './Task'
import { state } from '../state'
import { logError, logSuccess } from '../Terminal'
import { TEMPLATE_REPOSITORY } from '../consts'

export class CloneProject implements Task {
  public description = 'Cloning the project from Github'

  public async execute() {
    const emitter = degit(TEMPLATE_REPOSITORY, {
      cache: false,
      force: true,
    })

    try {
      await emitter.clone(state.projectName)
      logSuccess('Project has been succesfully cloned.')
    } catch (error) {
      logError(
        "It wasn't possible to clone Discapp demo repository. \nThis is most likely not an 'create-discapp' error, please verify your connection."
      )
    }
  }
}
