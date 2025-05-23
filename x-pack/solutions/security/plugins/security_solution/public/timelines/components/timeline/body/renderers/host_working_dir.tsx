/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import React from 'react';

import { DraggableBadge } from '../../../../../common/components/draggables';

import * as i18n from './translations';
import { TokensFlexItem } from './helpers';

interface Props {
  contextId: string;
  eventId: string;
  hostName: string | null | undefined;
  workingDirectory: string | null | undefined;
  scopeId: string;
}

export const HostWorkingDir = React.memo<Props>(
  ({ contextId, eventId, hostName, workingDirectory, scopeId }) => (
    <>
      <TokensFlexItem grow={false} component="span">
        <DraggableBadge
          scopeId={scopeId}
          contextId={contextId}
          eventId={eventId}
          field="host.name"
          value={hostName}
          fieldType="keyword"
          isAggregatable={true}
        />
      </TokensFlexItem>
      {workingDirectory != null && (
        <TokensFlexItem grow={false} component="span">
          {i18n.IN}
        </TokensFlexItem>
      )}
      <TokensFlexItem grow={false} component="span">
        <DraggableBadge
          scopeId={scopeId}
          contextId={contextId}
          eventId={eventId}
          field="process.working_directory"
          value={workingDirectory}
          iconType="folderOpen"
          fieldType="keyword"
          isAggregatable={true}
        />
      </TokensFlexItem>
    </>
  )
);

HostWorkingDir.displayName = 'HostWorkingDir';
