import { act, renderHook } from '@testing-library/react';
import { useEffect, useRef } from 'react';
import { describe, expect, it } from 'vitest';
import { useForceUpdate } from './use-force-update';

describe('useForceUpdate', () => {
  describe('should force update', () => {
    it('when called', () => {
      const { result } = renderHook(() => {
        const forceUpdate = useForceUpdate();
        const countRef = useRef(0);
        useEffect(() => {
          countRef.current += 1;
        }, []);
        return { forceUpdate, count: countRef.current };
      });

      expect(result.current.count).toBe(0);

      act(() => {
        result.current.forceUpdate();
      });

      expect(result.current.count).toBe(1);
    });
  });
});
