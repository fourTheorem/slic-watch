import { type Template } from 'cloudform'
import pino from 'pino'

// Serverless Framework provides plugins with a logger to use, so we simulate that with this:
const extras = ['levels', 'silent', 'onChild', 'trace', 'debug', 'info', 'warn', 'error', 'fatal']
const pinoLogger = pino()
export const dummyLogger = Object.fromEntries(
  Object.entries(pinoLogger).filter(([key]) => !extras.includes(key))
)

export const pluginUtils = { log: dummyLogger }

export interface SlsYaml {
  custom?
  functions?
}

function toPascalCase (value: string): string {
  return value
    .split(/[^A-Za-z0-9]+/)
    .filter(segment => segment.length > 0)
    .map(segment => segment[0].toUpperCase() + segment.slice(1))
    .join('')
}

export function getMockLambdaLogicalId (funcName: string): string {
  return `${toPascalCase(funcName)}LambdaFunction`
}

export const slsYaml: SlsYaml = {
  custom: {
    slicWatch: {
      topicArn: 'test-topic',
      enabled: true
    }
  },
  functions: {
    hello: {
    }
  }
}

export function createMockServerless (compiledTemplate: Template, slsConfig = slsYaml) {
  return {
    cli: {
      log: () => { '' }
    },
    providers: { aws: {} },
    getProvider: () => ({
      naming: {
        getLambdaLogicalId: getMockLambdaLogicalId
      }
    }),
    service: {
      provider: {
        name: 'aws',
        compiledCloudFormationTemplate: compiledTemplate
      },
      custom: slsConfig.custom,
      getAllFunctions: () => Object.keys(slsConfig.functions ?? {}),
      getFunction: (funcRef) => slsConfig.functions[funcRef]
    }
  }
}
