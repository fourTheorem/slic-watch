import { readFile, writeFile } from 'node:fs/promises'
import { parse, stringify } from 'yaml'
import { addAlarms, addDashboard } from 'slic-watch-core/index'
import { type SlicWatchConfig, resolveSlicWatchConfig } from 'slic-watch-core/inputs/general-config'
import { setLogger } from 'slic-watch-core/logging'
import { cliLogger } from '../lib/cli-logger'

setLogger(cliLogger)

export default async function transform (inputFile: string, outputFile: string) {
  const outputToJson = outputFile.endsWith('.json')
  try {
    const input = await readFile(inputFile)
    const template = parse(input.toString())
    const slicWatchConfig: SlicWatchConfig = template.Metadata?.slicWatch ?? {}

    const config = resolveSlicWatchConfig(slicWatchConfig)
    if (typeof config.enabled === 'undefined') {
      // SLIC Watch is enabled by default for the CLI
      config.enabled = true
    }

    setLogger(cliLogger)
    addAlarms(config.alarms, config.alarmActionsConfig, template)
    addDashboard(config.dashboard, template)

    // If the input template had a `SlicWatch` transform, remove it
    // since it has now been applied so CloudFormation will not try and apply
    // it again on deployment.
    const transform = template.Transform as string | undefined
    if (typeof transform === 'string' && transform.startsWith('SlicWatch')) {
      delete template.Transform
    } else if (Array.isArray(transform)) {
      template.Transform = (template.Transform as string[]).filter(transform => !transform.startsWith('SlicWatch'))
    }
    const output = outputToJson ? JSON.stringify(template, null, ' ') : stringify(template, { aliasDuplicateObjects: false })
    await writeFile(outputFile, output)
  } catch (err) {
    cliLogger.error(err)
    process.exit(1)
  }
}
