#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { CdkTestProjectStack } from '../lib/cdk-test-project-stack';

const app = new cdk.App();
new CdkTestProjectStack(app, 'CdkTestProjectStack');
