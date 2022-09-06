#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib'
import { CdkTestGeneralStack } from '../source/general-stack'
import { CdkSFNStack } from '../source/sfn-stack'
import { CdkECSStack } from '../source/ecs-stack'

const app = new cdk.App()

new CdkTestGeneralStack(app, 'CdkGeneralStackTest-Europe', {
  env: { region: 'eu-west-1' }
})

new CdkECSStack(app, 'CdkECSStackTest-Europe', {
  env: { region: 'eu-west-1' }
})

new CdkSFNStack(app, 'CdkSFNStackTest-Europe', {
  env: { region: 'eu-west-1' }
})

new CdkTestGeneralStack(app, 'CdkGeneralStackTest-US', {
  env: { region: 'us-east-1' }
})
