/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import {
  EuiButton,
  EuiButtonEmpty,
  EuiFlexGroup,
  EuiModal,
  EuiModalBody,
  EuiModalFooter,
  EuiModalHeader,
  EuiModalHeaderTitle,
  EuiPanel,
  EuiSpacer,
  EuiText,
  useEuiTheme,
} from '@elastic/eui';
import React, { useCallback, useState } from 'react';

import { Stats } from '../../../data_anonymization_editor/stats';
import { ContextEditor } from '../../../data_anonymization_editor/context_editor';
import * as i18n from '../anonymization_settings/translations';
import {
  useAnonymizationListUpdate,
  UseAnonymizationListUpdateProps,
} from '../anonymization_settings/use_anonymization_list_update';
import {
  DEFAULT_ANONYMIZATION_FIELDS,
  DEFAULT_CONVERSATIONS,
  DEFAULT_PROMPTS,
  useSettingsUpdater,
} from '../../../assistant/settings/use_settings_updater/use_settings_updater';
import { useFetchAnonymizationFields } from '../../../assistant/api/anonymization_fields/use_fetch_anonymization_fields';
import { AssistantSettingsBottomBar } from '../../../assistant/settings/assistant_settings_bottom_bar';
import { useAssistantContext } from '../../../assistant_context';
import {
  CANCEL,
  SAVE,
  SETTINGS_UPDATED_TOAST_TITLE,
} from '../../../assistant/settings/translations';

export interface Props {
  modalMode?: boolean;
  onClose?: () => void;
}

const AnonymizationSettingsManagementComponent: React.FC<Props> = ({
  modalMode = false,
  onClose,
}) => {
  const { euiTheme } = useEuiTheme();
  const { toasts } = useAssistantContext();
  const { data: anonymizationFields } = useFetchAnonymizationFields();
  const [hasPendingChanges, setHasPendingChanges] = useState(false);

  const {
    anonymizationFieldsBulkActions,
    setAnonymizationFieldsBulkActions,
    setUpdatedAnonymizationData,
    resetSettings,
    saveSettings,
    updatedAnonymizationData,
  } = useSettingsUpdater(
    DEFAULT_CONVERSATIONS, // Anonymization settings do not require conversations
    DEFAULT_PROMPTS, // Anonymization settings do not require prompts
    false, // Anonymization settings do not require conversations
    false, // Anonymization settings do not require prompts
    anonymizationFields ?? DEFAULT_ANONYMIZATION_FIELDS
  );

  const onCancelClick = useCallback(() => {
    onClose?.();
    resetSettings();
    setHasPendingChanges(false);
  }, [onClose, resetSettings]);

  const handleSave = useCallback(
    async (param?: { callback?: () => void }) => {
      await saveSettings();
      toasts?.addSuccess({
        iconType: 'check',
        title: SETTINGS_UPDATED_TOAST_TITLE,
      });
      setHasPendingChanges(false);
      param?.callback?.();
    },
    [saveSettings, toasts]
  );

  const onSaveButtonClicked = useCallback(() => {
    handleSave();
    onClose?.();
  }, [handleSave, onClose]);

  const handleAnonymizationFieldsBulkActions = useCallback<
    UseAnonymizationListUpdateProps['setAnonymizationFieldsBulkActions']
  >(
    (value) => {
      setHasPendingChanges(true);
      setAnonymizationFieldsBulkActions(value);
    },
    [setAnonymizationFieldsBulkActions]
  );

  const handleUpdatedAnonymizationData = useCallback<
    UseAnonymizationListUpdateProps['setUpdatedAnonymizationData']
  >(
    (value) => {
      setHasPendingChanges(true);
      setUpdatedAnonymizationData(value);
    },
    [setUpdatedAnonymizationData]
  );

  const onListUpdated = useAnonymizationListUpdate({
    anonymizationFields: updatedAnonymizationData,
    anonymizationFieldsBulkActions,
    setAnonymizationFieldsBulkActions: handleAnonymizationFieldsBulkActions,
    setUpdatedAnonymizationData: handleUpdatedAnonymizationData,
  });

  if (modalMode) {
    return (
      <EuiModal onClose={onCancelClick}>
        <EuiModalHeader>
          <EuiModalHeaderTitle>{i18n.SETTINGS_TITLE}</EuiModalHeaderTitle>
        </EuiModalHeader>
        <EuiModalBody>
          <EuiText size="m">{i18n.SETTINGS_DESCRIPTION}</EuiText>

          <EuiSpacer size="m" />

          <EuiFlexGroup alignItems="center" data-test-subj="summary" gutterSize="none">
            <Stats
              isDataAnonymizable={true}
              anonymizationFields={updatedAnonymizationData.data}
              titleSize="m"
              gap={euiTheme.size.s}
            />
          </EuiFlexGroup>

          <EuiSpacer size="m" />

          <ContextEditor
            anonymizationFields={updatedAnonymizationData}
            compressed={false}
            onListUpdated={onListUpdated}
            rawData={null}
          />
        </EuiModalBody>
        <EuiModalFooter>
          <EuiButtonEmpty onClick={onCancelClick}>{CANCEL}</EuiButtonEmpty>
          <EuiButton type="submit" onClick={onSaveButtonClicked} fill disabled={!hasPendingChanges}>
            {SAVE}
          </EuiButton>
        </EuiModalFooter>
      </EuiModal>
    );
  }

  return (
    <>
      <EuiPanel hasShadow={false} hasBorder paddingSize="l">
        <EuiText size="m">{i18n.SETTINGS_DESCRIPTION}</EuiText>

        <EuiSpacer size="m" />

        <EuiFlexGroup alignItems="center" data-test-subj="summary" gutterSize="none">
          <Stats
            isDataAnonymizable={true}
            anonymizationFields={updatedAnonymizationData.data}
            titleSize="m"
            gap={euiTheme.size.s}
          />
        </EuiFlexGroup>

        <EuiSpacer size="m" />

        <ContextEditor
          anonymizationFields={updatedAnonymizationData}
          compressed={false}
          onListUpdated={onListUpdated}
          rawData={null}
        />
      </EuiPanel>
      <AssistantSettingsBottomBar
        hasPendingChanges={hasPendingChanges}
        onCancelClick={onCancelClick}
        onSaveButtonClicked={onSaveButtonClicked}
      />
    </>
  );
};

AnonymizationSettingsManagementComponent.displayName = 'AnonymizationSettingsManagementComponent';

export const AnonymizationSettingsManagement = React.memo(AnonymizationSettingsManagementComponent);
