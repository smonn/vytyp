import { useViewModel } from '@vytyp/react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { PokemonDetailViewModel } from '../view-models/PokemonDetailViewModel';

const viewModel = new PokemonDetailViewModel()

export function PokemonDetailRoute() {
  const { name } = useParams<{ name: string }>();
  const pokemonVM = useViewModel(viewModel);

  useEffect(() => {
    pokemonVM.name = name;
    pokemonVM.load();
  }, [name])

  if (!pokemonVM.pokemon || pokemonVM.status === 'loading') {
    return <div>Loading...</div>
  }

  return (
    <div>
      <h1>{pokemonVM.pokemon.name}</h1>
      <figure>
        <img src={pokemonVM.pokemon.sprites.front_default} alt={pokemonVM.pokemon.name} />
      </figure>
      <figure>
        <img src={pokemonVM.pokemon.sprites.back_default} alt={pokemonVM.pokemon.name} />
      </figure>
      <ul>
        <li>ID: {pokemonVM.pokemon.id}</li>
        <li>Height: {pokemonVM.pokemon.height}</li>
        <li>Weight: {pokemonVM.pokemon.weight}</li>
        <li>Types: {pokemonVM.pokemon.types.map(type => type.type.name).join(', ')}</li>
      </ul>
    </div>
  );
}
