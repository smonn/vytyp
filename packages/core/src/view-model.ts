/**
 * A subscriber function.
 */
export type Subscriber = () => void;

/**
 * A simple view model implementation using the observer pattern. By extending
 * this class, any properties that are changed will notify all subscribers.
 */
export abstract class ViewModel {
  private subscribers = new Set<Subscriber>();

  constructor() {
    // Remap `this` by returning a Proxy.
    return new Proxy(this, {
      set(target, property, value) {
        target[property] = value;
        target.notify();
        return true;
      },
    });
  }

  /**
   * Subscribe to changes to the view model.
   * @param subscriber A subscriber function that will be called when the view model is updated.
   * @returns An unsubscribe function that will remove the subscriber from the list of subscribers.
   */
  subscribe = (subscriber: Subscriber) => {
    if (typeof subscriber !== 'function') {
      throw new TypeError('subscriber must be a function');
    }
    this.subscribers.add(subscriber);
    return () => {
      this.subscribers.delete(subscriber);
    };
  };

  /**
   * Notify all subscribers that the view model has changed.
   */
  notify = () => {
    for (const subscriber of this.subscribers) {
      subscriber();
    }
  };

  /**
   * An index signature to allow any property to be added to the view model.
   */
  [key: string | symbol]: unknown;
}
