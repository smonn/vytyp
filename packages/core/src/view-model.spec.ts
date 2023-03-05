import { ViewModel } from './view-model';
import { describe, it, vi, expect } from 'vitest';

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

describe('ViewModel', () => {
  describe('can subscribe', () => {
    it('to changes', () => {
      const counter = new CounterViewModel();
      const subscriber = vi.fn();
      counter.subscribe(subscriber);
      counter.increment();
      expect(subscriber).toHaveBeenCalledTimes(1);
      expect(counter.value).toBe(1);
    });

    it('to changes multiple times', () => {
      const counter = new CounterViewModel(3);
      const subscriber = vi.fn();
      counter.subscribe(subscriber);
      counter.increment();
      counter.decrement();
      counter.reset();
      expect(subscriber).toHaveBeenCalledTimes(3);
      expect(counter.value).toBe(3);
    });

    it('to changes multiple times and unsubscribe', () => {
      const counter = new CounterViewModel(2);
      const subscriber = vi.fn();
      const unsubscribe = counter.subscribe(subscriber);
      counter.increment();
      counter.decrement();
      unsubscribe();
      counter.decrement();
      counter.increment();
      expect(subscriber).toHaveBeenCalledTimes(2);
    });
  });

  describe('can notify', () => {
    it('subscribers', () => {
      const counter = new CounterViewModel();
      const subscriber = vi.fn();
      counter.subscribe(subscriber);
      counter.notify();
      expect(subscriber).toHaveBeenCalledTimes(1);
    });

    it('subscribers multiple times', () => {
      const counter = new CounterViewModel();
      const subscriber = vi.fn();
      counter.subscribe(subscriber);
      counter.notify();
      counter.notify();
      counter.notify();
      expect(subscriber).toHaveBeenCalledTimes(3);
    });
  });

  describe('throws an error', () => {
    it('when subscribing with a non-function', () => {
      const counter = new CounterViewModel();
      const subscriber = null as unknown as () => void;
      expect(() => counter.subscribe(subscriber)).toThrow(TypeError);
    });
  });
});
