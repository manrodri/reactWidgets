#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { InfraStack } from '../lib/infra-stack';

const app = new cdk.App();
new InfraStack(app, 'WidgetReactStack', {
  env: { account: '423754860743', region: 'eu-west-1' }
});
