import { type Template } from 'cloudform'
import fs from 'node:fs/promises'
import path from 'node:path'
import tap from 'tap'
import tmp from 'tmp'
import { parse } from 'yaml'

import transform from '../commands/transform'

const resourcesPath = path.resolve(__dirname, 'resources')

tap.test('transformation', (t) => {
  function assertValidOutput (template: Template) {
    const resources = Object.values(template.Resources ?? {})
    const alarms = resources.filter((resource) => resource.Type === 'AWS::CloudWatch::Alarm')
    const dashboards = resources.filter((resource) => resource.Type === 'AWS::CloudWatch::Dashboard')
    t.ok(alarms.length > 0)
    t.equal(dashboards.length, 1)
  }

  for (const inputFile of ['sample-cf-template.json', 'sample-cf-template.yml']) {
    t.test(inputFile, (t) => {
      t.test('CLI should transform input to output JSON', async (t) => {
        const outJsonFile = tmp.tmpNameSync({ postfix: '.json' })
        await transform(path.resolve(resourcesPath, inputFile), outJsonFile)
        const outputJson = (await fs.readFile(outJsonFile)).toString()
        const template = JSON.parse(outputJson) as Template
        assertValidOutput(template)
      })

      t.test('CLI should transform input to output YAML', async (t) => {
        const outYamlFile = tmp.tmpNameSync({ postfix: '.yaml' })
        await transform(path.resolve(resourcesPath, inputFile), outYamlFile)
        const outputYaml = (await fs.readFile(outYamlFile)).toString()
        parse(outputYaml)
        const template = parse(outputYaml)
        assertValidOutput(template)
      })
      t.end()
    })
    t.end()
  }
})
