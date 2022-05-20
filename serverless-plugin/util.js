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

/**
 * Given CloudFormation syntax for an ECS cluster, derive CloudFormation syntax for
 * the cluster's name
 *
 * @param  cluster CloudFormation syntax for an ECS cluster
 * @returns CloudFormation syntax for the cluster's name
 */
function resolveEcsClusterNameAsCfn (cluster) {
  if (typeof cluster === 'string') {
    if (cluster.startsWith('arn:')) {
      return cluster.split(':').pop().split('/').pop()
    }
    return cluster
  }
  if (cluster.GetAtt && cluster.GetAtt[1] === 'Arn') {
    // AWS::ECS::Cluster returns the cluster name for 'Ref'
    return { Ref: cluster.GetAtt[0] }
  }
  return cluster // Fallback to name
}

/**
 * Given CloudFormation syntax for an ECS cluster, derive a string value or
 * CloudFormation 'Fn::Sub' variable syntax for the cluster's name
 *
 * @param } cluster CloudFormation syntax for an ECS cluster
 * @returns Literal string or Sub variable syntax
 */
function resolveEcsClusterNameForSub (cluster) {
  if (typeof cluster === 'string') {
    if (cluster.startsWith('arn:')) {
      return cluster.split(':').pop().split('/').pop()
    }
    return cluster
  }
  // AWS::ECS::Cluster returns the cluster name for 'Ref'
  // This can be used as a 'Fn::Sub' variable
  if (cluster.GetAtt && cluster.GetAtt[1] === 'Arn') {
    return '${' + cluster.GetAtt[0] + '}'
  } else if (cluster.Ref) {
    return '${' + cluster.Ref + '}'
  } else if (cluster['Fn::Sub']) {
    return cluster['Fn::Sub']
  }
  return cluster
}

module.exports = {
  filterObject,
  makeResourceName,
  resolveEcsClusterNameAsCfn,
  resolveEcsClusterNameForSub
}
