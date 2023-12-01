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
  return JSON.stringify(sortObject(template), null, '  ')
}

/**
 * Create a copy of the object with every nested property sorted alphabetically for easier comparison
 */
export function sortObject (obj: object): object {
  const sortedObj: Record<string, any> = {}
  for (const [key, value] of Object.entries(obj).toSorted(([a], [b]) => (a as string).localeCompare(b as string))) {
    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      const obj = value as any
      sortedObj[key] = sortObject(typeof obj.toJSON === 'function' ? obj.toJSON() : obj)
    } else {
      sortedObj[key] = value
    }
  }
  return sortedObj as object
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
        const dashBody = (resource.Properties as DashboardProperties).DashboardBody as any
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
