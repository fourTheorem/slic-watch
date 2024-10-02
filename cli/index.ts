#!/usr/bin/env node

import { program } from 'commander'
import transform from './commands/transform'

program
  .name('slic-watch')
  .description('SLIC Watch CLI for transforming CloudFormation templates, adding alarms and dashboards')
  .addHelpText('after', `

  $ slic-watch <input_template> <output_template>
  `)

program
  .command('transform', { isDefault: true })
  .argument('<input_template>', 'Path to the JSON or YAML template to transform')
  .argument('<output_template>', 'Path for output template')
  .action(transform)

program
  .parse()
