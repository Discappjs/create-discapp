import chalk from 'chalk'

/**
 * Logs a step messsage
 *
 * @param message The messsage
 */
export function logStep(step: number, total: number, message: string) {
  console.log(`${chalk.bgWhite.black(`${chalk.bold(step)}/${total}`)}`)
  console.log(`${message}\n`)
}

/**
 * Logs a success message
 *
 * @param message The message
 */
export function logSuccess(message: string) {
  console.log(`    ${chalk.green.bold('✓')}  ${message}`)
}

/**
 * Logs an error message
 *
 * @param message The message
 */
export function logError(message: string) {
  console.log(`    ${chalk.red.bold('☓')}  ${message}`)
}
