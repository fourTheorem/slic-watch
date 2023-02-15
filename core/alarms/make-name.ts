'use strict'

import stringcase from 'case'

export function makeResourceName (service: string, givenName: string, alarm: string) {
  const normalisedName = stringcase.pascal(givenName)
  return `slicWatch${service}${alarm}Alarm${normalisedName}`
}
