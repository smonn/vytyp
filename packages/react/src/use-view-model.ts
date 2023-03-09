import { ViewModel } from '@vytyp/core';
import { useEffect, useState } from 'react';
import { useForceUpdate } from './use-force-update';

/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * React hook to manage a view model instance. Triggers re-renders when the view model changes.
 * @param ViewModelType A class type that extends ViewModel. May be either an instance or a constructor. If a constructor, it will also take the constructor arguments.
 * @param args Optional constructor arguments.
 * @returns A view model instance.
 */
export function useViewModel<T extends ViewModel, Args extends any[]>(
  ViewModelType: T | (new (...args: Args) => T),
  ...args: Args
) {
  const forceUpdate = useForceUpdate();

  const [viewModel] = useState(() =>
    typeof ViewModelType === 'function'
      ? new ViewModelType(...args)
      : ViewModelType
  );

  // both viewModel and forceUpdate are stable
  useEffect(() => {
    if (viewModel instanceof ViewModel) {
      return viewModel.subscribe(forceUpdate);
    }

    return () => {
      // no-op
    };
  }, []);

  return viewModel;
}

/* eslint-enable @typescript-eslint/no-explicit-any */
