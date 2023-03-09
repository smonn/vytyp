/**
 * @vitest-environment jsdom
 */

import { act, renderHook } from '@testing-library/react';
import { ViewModel } from '@vytyp/core';
import { describe, expect, it } from 'vitest';
import { useViewModel } from './use-view-model';

class CounterViewModel extends ViewModel {
  value: number;
  initialValue: number;

  constructor(initialValue = 0) {
    if (typeof initialValue !== 'number') {
      throw new TypeError('initialValue must be a number');
    }
    super();
    this.value = initialValue;
    this.initialValue = initialValue;
  }

  increment() {
    this.value += 1;
  }

  decrement() {
    this.value -= 1;
  }

  reset() {
    this.value = this.initialValue;
  }
}

describe('useViewModel', () => {
  describe('should provide instance view model class', () => {
    it('when called', () => {
      const { result } = renderHook(() => {
        return useViewModel(CounterViewModel);
      });

      expect(result.current.value).toBe(0);

      act(() => {
        result.current.increment();
        result.current.increment();
      });

      expect(result.current.value).toBe(2);

      act(() => {
        result.current.decrement();
      });

      expect(result.current.value).toBe(1);

      act(() => {
        result.current.reset();
      });

      expect(result.current.value).toBe(0);
    });

    it('when provided with initial value', () => {
      const { result } = renderHook(() => {
        return useViewModel(CounterViewModel, 10);
      });

      expect(result.current.value).toBe(10);

      act(() => {
        result.current.increment();
        result.current.increment();
      });

      expect(result.current.value).toBe(12);

      act(() => {
        result.current.decrement();
      });

      expect(result.current.value).toBe(11);

      act(() => {
        result.current.reset();
      });

      expect(result.current.value).toBe(10);
    });
  });

  describe('should use same instance', () => {
    it('when called', () => {
      const { result, rerender } = renderHook(() => {
        return useViewModel(CounterViewModel);
      });

      const firstInstance = result.current;

      rerender();

      expect(result.current).toBe(firstInstance);
    });

    it('when provided with initial value', () => {
      const { result, rerender } = renderHook(() => {
        return useViewModel(CounterViewModel, 10);
      });

      const firstInstance = result.current;

      rerender();

      expect(result.current).toBe(firstInstance);
    });
  });

  describe('should allow to pass instance', () => {
    it('when called', () => {
      const instance = new CounterViewModel();
      const { result } = renderHook(() => {
        return useViewModel(instance);
      });

      expect(result.current).toBe(instance);
    });
  });

  describe('skips calling subscribe if not a ViewModel class', () => {
    it('when called with non-ViewModel class', () => {
      renderHook(() => useViewModel(123 as unknown as ViewModel));
    });
  });
});
