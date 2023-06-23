
/**
 * Given CloudFormation syntax for an AppSync GraphQLAPIId, derive a string value or
 * CloudFormation 'Fn::Sub' variable syntax for the GraphQLAPI
 *
 * @param apiId The CloudFormation logical ID for the AppSync GraphQLAPI resource
 * @returns Literal string or Sub variable syntax
 */
export function resolveGraphlQLId (apiId: string) {
  return `\${${apiId}.ApiId}`
}

/**
 * Given CloudFormation syntax for an Application Load Balancer Full Name, derive a string value or
 * CloudFormation 'Fn::Sub' variable syntax for the cluster's name
 *
 * @param resource The Application Load Balancer resource object
 * @param logicalId The CloudFormation logical ID for the ALB resource
 * @returns Literal string or Sub variable syntax
 */
export function resolveLoadBalancerFullNameForSub (logicalId: string): string {
  return `\${${logicalId}.LoadBalancerFullName}`
}

/**
 * Given CloudFormation syntax for an Application Load Balancer Full Name, derive a string value or
 * CloudFormation 'Fn::Sub' variable syntax for the cluster's name
 *
 * @param } cluster CloudFormation syntax for an Application Load Balancer Full Name
 * @returns Literal string or Sub variable syntax
 */
export function resolveTargetGroupFullNameForSub (logicalId: string): string {
  return `\${${logicalId}.TargetGroupFullName}`
}

/**
 * Given CloudFormation syntax for an ECS cluster, derive a string value or
 * CloudFormation 'Fn::Sub' variable syntax for the cluster's name
 *
 * @param } cluster CloudFormation syntax for an ECS cluster
 * @returns Literal string or Sub variable syntax
 */

export function resolveEcsClusterNameForSub (cluster: string | object) {
  if (typeof cluster === 'string') {
    if (cluster.startsWith('arn:')) {
      return cluster.split(':').pop()?.split('/').pop()
    }
    return cluster
  }
  // AWS::ECS::Cluster returns the cluster name for 'Ref'
  // This can be used as a 'Fn::Sub' variable
  const intrinsic: any = cluster
  if ((intrinsic.GetAtt) as object != null && intrinsic.GetAtt[1] === 'Arn') {
    return `\${${intrinsic.GetAtt[0]}}`
  } else if (intrinsic.Ref != null) {
    return `\${${intrinsic.Ref}}`
  } else if (intrinsic['Fn::Sub'] != null) {
    return intrinsic['Fn::Sub']
  }
  return intrinsic
}
