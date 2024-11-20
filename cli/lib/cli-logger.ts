import clc from 'cli-color'

const error = clc.red.bold
const warn = clc.yellow
const info = clc.blue

export const cliLogger = {
  info: (...args: any) => { console.error(info(...args)) },
  warn: (...args: any) => { console.error(warn(...args)) },
  error: (...args: any) => { console.error(error(...args)) }
}
