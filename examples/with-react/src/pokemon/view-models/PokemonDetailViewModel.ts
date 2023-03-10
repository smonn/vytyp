import { ViewModel } from '@vytyp/core';
import { BASE_URL } from '../config';
import type { Pokemon } from '../types/Pokemon';

export class PokemonDetailViewModel extends ViewModel {
  pokemon: Pokemon | null = null;
  error: Error | null = null;
  status: 'idle' | 'loading' | 'error' = 'idle';
  cache: Record<string, Pokemon> = {};

  constructor(public name?: string | undefined) {
    super();
  }

  async load() {
    if (!this.name) {
      this.pokemon = null;
      this.status = 'idle';
      this.error = null;
      return;
    }

    if (this.cache[this.name]) {
      this.pokemon = this.cache[this.name]!;
      return;
    }

    this.status = 'loading';

    try {
      const url = new URL(`pokemon/${this.name}`, BASE_URL);
      const response = await fetch(url);
      this.pokemon = (await response.json()) as Pokemon;
      this.cache[this.name] = this.pokemon;
      this.status = 'idle';
    } catch (error) {
      this.error = error as Error;
      this.status = 'error';
    }
  }
}
