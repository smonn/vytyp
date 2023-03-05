# @vytyp/react

Provides the `useViewModel` hook for use with view models. It triggers re-renders when the view model changes. Meant as a reactive state management solution for React and allow separating app logic from your React components.

Also see:

- [@vytyp/core](https://npmjs.org/package/@vytyp/core)

```tsx
import { FormEvent } from 'react';
import { ViewModel } from '@vytyp/core';
import { useViewModel } from '@vytyp/core';

class GreeterViewModel extends ViewModel {
  name = 'World';

  // Use arrow function style here to ensure `this` is bound properly.
  updateNameFromInput = (event: FormEvent<HTMLInputElement>) => {
    this.name = event.currentTarget.value;
  };

  greet() {
    return `Hello ${this.name}!`;
  }
}

function Greeter() {
  const greeter = useViewModel(GreeterViewModel);

  return (
    <>
      <input value={greeter.name} onChange={greeter.updateNameFromInput} />
      <span>{greeter.greet()}</span>
    </>
  );
}
```
