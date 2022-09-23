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

/**
 * Given CloudFormation syntax for an Application Load Balancer Full Name, derive a string value or
 * CloudFormation 'Fn::Sub' variable syntax for the cluster's name
 *
 * @param resource The Application Load Balancer resource object
 * @param logicalId The CloudFormation logical ID for the ALB resource
 * @returns Literal string or Sub variable syntax
 */
function resolveLoadBalancerFullNameForSub (resource, logicalId) {
  return `\${${logicalId}.LoadBalancerFullName}`
}

/**
 * Given CloudFormation syntax for an Application Load Balancer Full Name, derive a string value or
 * CloudFormation 'Fn::Sub' variable syntax for the cluster's name
 *
 * @param } cluster CloudFormation syntax for an Application Load Balancer Full Name
 * @returns Literal string or Sub variable syntax
 */
function resolveTargetGroupFullNameForSub (resource, logicalId) {
  return `\${${logicalId}.TargetGroupFullName}`
}
/*
 * Determine the presentation name for an alarm statistic
 *
 * @param {*} alarmConfig Alarm configuration
 */
function getStatisticName (alarmConfig) {
  return alarmConfig.Statistic || alarmConfig.ExtendedStatistic
}

/**
 * Given a CloudFormation resource for an API Gateway REST API, derive CloudFormation syntax for
 * the API name.
 * The API name can be provided as a `Name` property or in the OpenAPI specification as
 * `Body.info.title`
 *
 * In either case, the name can be a string literal or use a CloudFormation intrinsic function
 * (Sub, Ref or GetAtt)
 *
 * @param restApiResource CloudFormation resource for a REST API
 * @param restApiLogicalId The logical ID for the resouce
 * @returns CloudFormation syntax for the API name
 */
function resolveRestApiNameAsCfn (restApiResource, restApiLogicalId) {
  const apiName = restApiResource.Properties.Name || restApiResource.Properties?.Body?.info?.title
  if (!apiName) {
    throw new Error(`No API name specified for REST API ${restApiLogicalId}. Either Name or Body.info.title should be specified`)
  }
  return apiName
}

/**
 * Given a CloudFormation resource for an API Gateway REST API, derive a string value or
 * CloudFormation 'Fn::Sub' variable syntax for the cluster's name
 *
 * The API name can be provided as a `Name` property or in the OpenAPI specification as
 * `Body.info.title`
 *
 * In either case, the name can be a string literal or use a CloudFormation intrinsic function
 * (Sub, Ref or GetAtt)
 *
 * @param restApiResource CloudFormation resource for a REST API
 * @param restApiLogicalId The logical ID for the resouce
 * @returns Literal string or Sub variable syntax
 */
function resolveRestApiNameForSub (restApiResource, restApiLogicalId) {
  const name = restApiResource.Properties.Name || restApiResource.Properties.Body?.info?.title
  if (!name) {
    throw new Error(`No API name specified for REST API ${restApiLogicalId}. Either Name or Body.info.title should be specified`)
  }

  if (name.GetAtt) {
    return `\${${name.GetAtt[0]}.${name.GetAtt[1]}}`
  } else if (name.Ref) {
    return `\${${name.Ref}}`
  } else if (name['Fn::Sub']) {
    return name['Fn::Sub']
  }
  return name
}

module.exports = {
  filterObject,
  makeResourceName,
  resolveEcsClusterNameAsCfn,
  resolveEcsClusterNameForSub,
  getStatisticName,
  resolveRestApiNameAsCfn,
  resolveRestApiNameForSub,
  resolveLoadBalancerFullNameForSub,
  resolveTargetGroupFullNameForSub
}
