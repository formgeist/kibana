/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import { useMemo } from 'react';
import { REDUX_ID_FOR_MEMORY_STORAGE } from '../constants';
import { useExpandableFlyoutContext } from '../context';
import { selectPanelsById, useSelector } from '../store/redux';

/**
 * This hook allows you to access the flyout state, read open right, left and preview panels.
 */
export const useExpandableFlyoutState = () => {
  const { urlKey } = useExpandableFlyoutContext();
  // if no urlKey is provided, we are in memory storage mode and use the reserved word 'memory'
  const id = useMemo(() => urlKey || REDUX_ID_FOR_MEMORY_STORAGE, [urlKey]);

  return useSelector(selectPanelsById(id));
};
