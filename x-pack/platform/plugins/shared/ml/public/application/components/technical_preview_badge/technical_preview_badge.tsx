/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import type { FC } from 'react';
import React from 'react';

import { EuiBetaBadge } from '@elastic/eui';

import { i18n } from '@kbn/i18n';

export const TechnicalPreviewBadge: FC<{ compressed?: boolean }> = ({ compressed = false }) => {
  return (
    <EuiBetaBadge
      label={i18n.translate('xpack.ml.navMenu.trainedModelsTabBetaLabel', {
        defaultMessage: 'Technical preview',
      })}
      size={compressed ? 's' : 'm'}
      color="hollow"
      tooltipContent={i18n.translate('xpack.ml.navMenu.trainedModelsTabBetaTooltipContent', {
        defaultMessage:
          'This functionality is in technical preview and may be changed or removed completely in a future release. Elastic will work to fix any issues, but features in technical preview are not subject to the support SLA of official GA features.',
      })}
      tooltipPosition={'right'}
      css={{ verticalAlign: 'middle' }}
    />
  );
};
