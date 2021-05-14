'use strict'

const stringcase = require('case')

/**
 * Filter an object to produce a new object with entries matching the supplied predicate
 *
 * @param {object} obj The object
 * @param {function} pred A function accepting value, key arguments and returning a boolean
 */
function filterObject (obj, predicate) {
  return Object.entries(obj)
    .filter(([key, value]) => predicate(value, key))
    .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {})
}

function makeResourceName (service, givenName, alarm) {
  const normalisedName = stringcase.pascal(givenName)
  return `slicWatch${service}${alarm}Alarm${normalisedName}`
}

module.exports = {
  filterObject,
  makeResourceName
}
