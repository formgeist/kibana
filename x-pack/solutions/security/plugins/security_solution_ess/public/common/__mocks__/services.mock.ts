/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import { coreMock } from '@kbn/core/public/mocks';
import { securitySolutionMock } from '@kbn/security-solution-plugin/public/mocks';
import { licensingMock } from '@kbn/licensing-plugin/public/mocks';
import { navigationPluginMock } from '@kbn/navigation-plugin/public/mocks';
import { managementPluginMock } from '@kbn/management-plugin/public/mocks';
import { cloudMock } from '@kbn/cloud-plugin/public/mocks';

import type { Services } from '../services';

export const mockServices: Services = {
  ...coreMock.createStart(),
  securitySolution: securitySolutionMock.createStart(),
  licensing: licensingMock.createStart(),
  navigation: navigationPluginMock.createStartContract(),
  management: managementPluginMock.createStartContract(),
  cloud: cloudMock.createStart(),
};
