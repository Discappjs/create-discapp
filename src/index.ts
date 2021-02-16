import {
  Task,
  Interview,
  CloneProject,
  InstallDependencies,
  PostInstall,
  Congrats,
} from './Tasks'
import { Terminal } from './Terminal'

const tasks: { new (): Task }[] = [
  Interview,
  CloneProject,
  InstallDependencies,
  PostInstall,
  Congrats,
]

export async function executeTaks() {
  let i = 1

  for (const Task of tasks) {
    try {
      const task = new Task()

      Terminal.logStep(i++, tasks.length, task.description)
      await task.execute()
      console.log('\n')
    } catch (error) {
      Terminal.logError(
        'An error has happened while trying to scaffold your project.'
      )
      console.error(error)
      process.exit(1)
    }
  }

  process.exit(0)
}
