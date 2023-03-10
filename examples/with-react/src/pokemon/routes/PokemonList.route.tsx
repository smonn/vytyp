import { PokemonList } from '../components/PokemonList';
import { Outlet } from 'react-router-dom';
import { PokemonListViewModel } from '../view-models/PokemonListViewModel';
import { useViewModel } from '@vytyp/react';
import { useEffect } from 'react';

const viewModel = new PokemonListViewModel();

export function PokemonListRoute() {
  const pokemonListVM = useViewModel(viewModel);

  useEffect(() => {
    pokemonListVM.load();
  }, []);

  return (
    <div style={{ display: 'flex', flexFlow: 'row' }}>
      <div style={{ width: 200, maxHeight: '90vh', overflowY: 'auto' }}>
        {viewModel.status === 'loading' && <div>Loading...</div>}
        {viewModel.status === 'error' && (
          <div>
            <div>Error: {viewModel.error?.message}</div>
            <button onClick={() => viewModel.load()}>Retry</button>
          </div>
        )}
        {viewModel.status === 'idle' && (
          <PokemonList items={viewModel.results?.results ?? []} />
        )}
      </div>
      <div style={{ flex: 1 }}>
        <Outlet />
      </div>
    </div>
  );
}
