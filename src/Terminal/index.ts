import chalk from 'chalk'
import { createInterface } from 'readline'

export class Terminal {
  public static readonly rl = createInterface({
    input: process.stdin,
    output: process.stdout,
  })

  /**
   * Logs a step messsage
   *
   * @param message The messsage
   */
  public static logStep(step: number, total: number, message: string) {
    console.log(`${chalk.bgWhite.black(`${chalk.bold(step)}/${total}`)}`)
    console.log(`${message}\n`)
  }

  /**
   * Logs a success message
   *
   * @param message The message
   */
  public static logSuccess(message: string) {
    console.log(`    ${chalk.green.bold('✓')}  ${message}`)
  }

  /**
   * Logs an error message
   *
   * @param message The message
   */
  public static logError(message: string) {
    console.log(`    ${chalk.red.bold('☓')}  ${message}`)
  }

  /**
   * Asks a question
   *
   * @param title The title of the question
   */
  public static async askQuestion(
    title: string,
    description: string = '',
    defaultAnswer?: string
  ): Promise<string> {
    return new Promise((resolve) => {
      this.rl.question(
        `${chalk.green.bold('[?]')} ${title} \n${chalk.gray(
          description
        )}\nAnswer:  `,
        (answer) => {
          if (defaultAnswer && answer === '') {
            resolve(defaultAnswer)
          } else {
            resolve(answer)
          }
        }
      )
    })
  }
}
