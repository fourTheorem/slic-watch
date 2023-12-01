import { type Template } from 'cloudform'
import pino from 'pino'

// Serverless Framework provides plugins with a logger to use, so we simulate that with this:
const extras = ['levels', 'silent', 'onChild', 'trace', 'debug', 'info', 'warn', 'error', 'fatal']
const pinoLogger = pino()
export const dummyLogger = Object.fromEntries(
  Object.entries(pinoLogger).filter(([key]) => !extras.includes(key as string))
)

export const pluginUtils = { log: dummyLogger }

export interface SlsYaml {
  custom?
  functions?
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

export function createMockServerless (compiledTemplate: Template) {
  return {
    cli: {
      log: () => { '' }
    },
    providers: { aws: {} },
    getProvider: () => ({
      naming: {
        getLambdaLogicalId: (funcName: string) => {
          return funcName[0].toUpperCase() + funcName.slice(1) + 'LambdaFunction'
        }
      }
    }),
    service: {
      provider: {
        name: 'aws',
        compiledCloudFormationTemplate: compiledTemplate
      },
      custom: {
        slicWatch: {
          enabled: true,
          topicArn: 'test-topic'
        }
      },
      getAllFunctions: () => Object.keys(slsYaml.functions),
      getFunction: (funcRef) => slsYaml.functions[funcRef]
    }
  }
}
