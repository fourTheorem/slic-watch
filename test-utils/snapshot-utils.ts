import type { Template } from 'cloudform'

import type { DashboardProperties } from 'cloudform-types/types/cloudWatch/dashboard'
import { type ResourceType } from 'slic-watch-core/cf-template'
import { type Test } from 'tap'
/**
 * node-tap snapshots are usually persisted in tcompare format. We replace this with JSON
 * so we can clean them and deal with JSON-within-JSON cases.
 *
 * @param template CloudFormation Template to be used as a snapshot
 * @returns The formatted snapshot
 */
export function formatSnapshot (template: Template): string {
  return JSON.stringify(template, null, '  ')
}

/**
 * Sanitise CloudFormation template snapshots so the dashboard JSON is extracted, allowing
 * snapshot differences to be more readable
 *
 * @param snapshot The CloudFormation template snapshot
 */
export function cleanSnapshot (snapshot: string): string {
  const snapshotTemplate = JSON.parse(snapshot) as Template
  const cleanTemplate = { ...snapshotTemplate }
  cleanTemplate.Resources = Object.fromEntries(Object.entries(snapshotTemplate.Resources as ResourceType).map(
    ([key, value]) => {
      const resource = value
      if (resource.Type === 'AWS::CloudWatch::Dashboard') {
        const dashBody = (resource.Properties as DashboardProperties).DashboardBody
        const subValue = dashBody['Fn::Sub']
        const parsedValue = JSON.parse(subValue)
        return [key, {
          ...(value as object),
          Properties: {
            DashboardBody: {
              'Fn::Sub': parsedValue
            }
          }
        }]
      }
      return [key, value]
    })
  )
  return JSON.stringify(cleanTemplate, null, '  ')
}

export function setUpSnapshotDefaults (t: Test) {
  t.formatSnapshot = formatSnapshot
  t.cleanSnapshot = cleanSnapshot
}
