# @vytyp/core

Provides the `ViewModel` class to extend. It implements the observer pattern to
subscribe to any class property changes.

```ts
import { ViewModel } from '@vytyp/core';

class GreeterViewModel extends ViewModel {
  name = 'World';

  greet() {
    return `Hello ${this.name}!`;
  }
}

const greeter = new GreeterViewModel();

function subscriber() {
  console.log(greeter.greet());
}

const unsubscribe = greeter.subscribe(subscriber);

// Setting the name triggers the subscriber above
greeter.name = 'vytyp';
```
