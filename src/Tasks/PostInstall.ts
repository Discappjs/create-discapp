import fs from 'fs'
import path from 'path'
import execa from 'execa'

import { state } from '../state'
import { Task } from './Task'
import { Terminal } from '../Terminal'

export class PostInstall implements Task {
  public description = 'Finishing installation'

  private async cloneEnv() {
    try {
      fs.copyFileSync(
        path.join(process.cwd(), state.projectName, '.env.example'),
        path.join(process.cwd(), state.projectName, '.env')
      )
      Terminal.logSuccess("Cloned '.env.example' to '.env'.")
    } catch (error) {
      Terminal.logError("Can't clone '.env.example' to '.env'.")
      console.error(error)
    }
  }

  private replacePackage() {
    try {
      const packagePath = path.join(
        process.cwd(),
        state.projectName,
        'package.json'
      )
      const fileContent = fs.readFileSync(packagePath, 'utf-8')
      const newFileContent = fileContent.replace(
        '"name": "discapp-demo"',
        `"name": "${state.projectName}"`
      )

      fs.writeFileSync(packagePath, newFileContent)
      Terminal.logSuccess(
        "Replaced 'package.json' with the name of your project."
      )
    } catch (error) {
      Terminal.logError(
        "Wasn't able to replace the name of the project in 'package.json'."
      )
      console.error(error)
    }
  }

  public async execute() {
    await this.cloneEnv()
    this.replacePackage()
  }
}
