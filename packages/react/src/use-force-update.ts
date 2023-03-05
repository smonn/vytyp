import { useState, useCallback } from 'react';

export function useForceUpdate() {
  const [, forceUpdate] = useState(0);
  return useCallback(() => forceUpdate((x) => (x + 1) & 0xffff), []);
}
