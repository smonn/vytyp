import { ViewModel } from '@vytyp/core';
import { BASE_URL } from '../config';
import type { NamedAPIResourceList } from '../types/Pokemon';

export class PokemonListViewModel extends ViewModel {
  limit = 2000;
  offset = 0;
  status: 'idle' | 'loading' | 'error' = 'idle';
  error: Error | null = null;
  results: NamedAPIResourceList | null = null;

  async load() {
    this.status = 'loading';

    try {
      const url = new URL('pokemon', BASE_URL);
      url.searchParams.set('limit', this.limit.toString());
      url.searchParams.set('offset', this.offset.toString());
      const response = await fetch(url);
      this.results = (await response.json()) as NamedAPIResourceList;
      this.status = 'idle';
    } catch (error) {
      this.error = error as Error;
      this.status = 'error';
    }
  }
}
